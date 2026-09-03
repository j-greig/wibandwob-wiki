// search.js
// Two ways of finding a page, and the box above the status line looks the same
// either way. If the site was published with a word index the field searches
// the whole text of every page through it; if it was not, the field falls back
// to the small JSON list of titles and kickers and matches substrings.
// Rows are keyboard-walkable: up and down move, Enter opens, Escape closes.

(function () {
  "use strict";

  var input = document.getElementById("q");
  var box = document.getElementById("results");
  if (!input || !box) { return; }

  var root = document.documentElement.getAttribute("data-root") || "";
  var MAX = 12;

  var index = null;        // the JSON fallback list, once fetched
  var jsonPending = false;
  var pf = null;           // the word index, once loaded
  var pfState = "unknown"; // unknown | loading | ready | absent
  var cursor = -1;
  var token = 0;

  // ------------------------------------------------------------- the word index

  function withPagefind(then) {
    if (pfState === "ready") { then(pf); return; }
    if (pfState === "absent") { then(null); return; }
    if (pfState === "loading") { return; }
    pfState = "loading";
    var url = root + "pagefind/pagefind.js";
    fetch(url, { method: "HEAD" }).then(function (r) {
      if (!r.ok) { throw new Error("no index"); }
      return import(/* webpackIgnore: true */ url);
    }).then(function (mod) {
      pf = mod;
      return mod.options ? mod.options({ baseUrl: root || "/" }) : null;
    }).then(function () {
      pfState = "ready";
      then(pf);
    }).catch(function () {
      pfState = "absent";
      pf = null;
      then(null);
    });
  }

  // -------------------------------------------------------------- the fallback

  function withJson(then) {
    if (index) { then(index); return; }
    if (jsonPending) { return; }
    jsonPending = true;
    fetch(root + "search-index.json")
      .then(function (r) { return r.json(); })
      .then(function (rows) { index = rows; jsonPending = false; then(rows); })
      .catch(function () { jsonPending = false; then([]); });
  }

  // ------------------------------------------------------------------ the rows

  function row(hit) {
    var a = document.createElement("a");
    a.href = hit.url;
    a.setAttribute("role", "option");
    var t = document.createElement("span");
    t.className = "hit-title";
    t.textContent = hit.title;
    a.appendChild(t);
    if (hit.kicker) {
      var k = document.createElement("span");
      k.className = "kick";
      k.textContent = hit.kicker;
      a.appendChild(k);
    }
    if (hit.kind) {
      var n = document.createElement("span");
      n.className = "hit-kind";
      n.textContent = hit.kind;
      a.appendChild(n);
    }
    if (hit.excerpt) {
      var e = document.createElement("span");
      e.className = "hit-excerpt";
      e.innerHTML = hit.excerpt; // pagefind escapes it and adds only <mark>
      a.appendChild(e);
    }
    return a;
  }

  function paint(hits) {
    box.textContent = "";
    cursor = -1;
    if (!hits.length) {
      var none = document.createElement("div");
      none.className = "none";
      none.textContent = "nothing under that name";
      box.appendChild(none);
    }
    hits.slice(0, MAX).forEach(function (h) { box.appendChild(row(h)); });
    box.classList.add("open");
    input.setAttribute("aria-expanded", "true");
  }

  function close() {
    box.classList.remove("open");
    box.textContent = "";
    cursor = -1;
    input.setAttribute("aria-expanded", "false");
  }

  function move(step) {
    var rows = box.querySelectorAll("a");
    if (!rows.length) { return; }
    if (cursor > -1 && rows[cursor]) { rows[cursor].classList.remove("on"); }
    cursor += step;
    if (cursor < 0) { cursor = rows.length - 1; }
    if (cursor >= rows.length) { cursor = 0; }
    rows[cursor].classList.add("on");
    rows[cursor].scrollIntoView({ block: "nearest" });
  }

  // ------------------------------------------------------------------ the runs

  function fromPagefind(api, q, mine) {
    api.search(q).then(function (res) {
      return Promise.all(res.results.slice(0, MAX).map(function (r) {
        return r.data();
      }));
    }).then(function (rows) {
      if (mine !== token) { return; }
      paint(rows.map(function (d) {
        var meta = d.meta || {};
        return {
          url: d.url,
          title: meta.title || d.url,
          kicker: meta.kicker || "",
          kind: meta.kind || "",
          excerpt: d.excerpt || ""
        };
      }));
    }).catch(function () {
      if (mine === token) { fromJson(q, mine); }
    });
  }

  function fromJson(q, mine) {
    withJson(function (rows) {
      if (mine !== token) { return; }
      var needle = q.toLowerCase();
      var hits = rows.filter(function (r) {
        return (r.title + " " + r.kicker + " " + r.line)
          .toLowerCase().indexOf(needle) > -1;
      });
      hits.sort(function (a, b) {
        return (a.title.toLowerCase().indexOf(needle) > -1 ? 0 : 1)
             - (b.title.toLowerCase().indexOf(needle) > -1 ? 0 : 1);
      });
      paint(hits.map(function (h) {
        return { url: root + h.path, title: h.title, kicker: h.kicker,
                 kind: "", excerpt: "" };
      }));
    });
  }

  function run() {
    var q = input.value.trim();
    if (q.length < 2) { close(); return; }
    var mine = ++token;
    withPagefind(function (api) {
      if (mine !== token) { return; }
      if (api) { fromPagefind(api, q, mine); } else { fromJson(q, mine); }
    });
  }

  input.setAttribute("aria-expanded", "false");
  input.addEventListener("input", run);

  input.addEventListener("keydown", function (ev) {
    if (ev.key === "ArrowDown") { ev.preventDefault(); move(1); }
    else if (ev.key === "ArrowUp") { ev.preventDefault(); move(-1); }
    else if (ev.key === "Escape") { close(); input.blur(); }
    else if (ev.key === "Enter") {
      var rows = box.querySelectorAll("a");
      if (cursor > -1 && rows[cursor]) {
        ev.preventDefault();
        window.location.href = rows[cursor].href;
      }
    }
  });

  var form = document.getElementById("searchform");
  if (form) { form.addEventListener("submit", function (e) { e.preventDefault(); }); }

  document.addEventListener("click", function (ev) {
    if (!box.contains(ev.target) && ev.target !== input) { close(); }
  });
})();
