// search.js
// The index is one small JSON file, fetched once on the first keystroke and
// then held in memory. Substring match over title, kicker and first line; a
// title hit outranks the rest. Rows go into the box above the status line.

(function () {
  "use strict";

  var input = document.getElementById("q");
  var box = document.getElementById("results");
  if (!input || !box) { return; }

  var root = document.documentElement.getAttribute("data-root") || "";
  var index = null;
  var pending = false;

  function load(then) {
    if (index) { then(); return; }
    if (pending) { return; }
    pending = true;
    fetch(root + "search-index.json")
      .then(function (r) { return r.json(); })
      .then(function (rows) { index = rows; pending = false; then(); })
      .catch(function () { pending = false; });
  }

  function row(hit) {
    var a = document.createElement("a");
    a.href = root + hit.path;
    a.appendChild(document.createTextNode(hit.title + "  "));
    var k = document.createElement("span");
    k.className = "kick";
    k.textContent = hit.kicker;
    a.appendChild(k);
    return a;
  }

  function run() {
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) { box.classList.remove("open"); return; }
    load(function () {
      var hits = index.filter(function (r) {
        return (r.title + " " + r.kicker + " " + r.line).toLowerCase().indexOf(q) > -1;
      });
      hits.sort(function (a, b) {
        return (a.title.toLowerCase().indexOf(q) > -1 ? 0 : 1)
             - (b.title.toLowerCase().indexOf(q) > -1 ? 0 : 1);
      });
      box.textContent = "";
      if (!hits.length) {
        var none = document.createElement("div");
        none.className = "none";
        none.textContent = "nothing under that name";
        box.appendChild(none);
      }
      hits.slice(0, 12).forEach(function (h) { box.appendChild(row(h)); });
      box.classList.add("open");
    });
  }

  input.addEventListener("keyup", run);
})();
