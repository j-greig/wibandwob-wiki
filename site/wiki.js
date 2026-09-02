// wiki.js
// Three small jobs, none of which the CSS can do:
//   1  the staleness line in the status bar
//   2  the search form's no-op submit, moved out of an inline handler
//   3  starting the motion cell, and only when motion is welcome
// Everything else on the page is CSS. The plate step rule, the ticker and the
// card reveals are all native and run with this file absent.

(function () {
  "use strict";

  // --- 1  staleness ---------------------------------------------------------
  // The page states the date the record was set down; this says how long ago
  // that was from the reader's own clock, rather than letting a stale date
  // pass as current.
  var el = document.getElementById("staleness");
  if (el) {
    var setDown = new Date("2026-09-02T00:00:00");
    var days = Math.floor((new Date() - setDown) / 86400000);
    var when = days <= 0 ? "today" : days === 1 ? "1 day ago" : days + " days ago";
    el.textContent = "as of 2026-09-02, " + when;
  }

  // --- 2  search ------------------------------------------------------------
  var form = document.getElementById("searchform");
  if (form) {
    form.addEventListener("submit", function (e) { e.preventDefault(); });
  }

  // --- 3  the motion cell ---------------------------------------------------
  // The video carries no autoplay attribute, so its resting state is the
  // poster frame. It is only ever started here, and only when the reader has
  // not asked for reduced motion. A reader who changes the preference mid-
  // visit is honoured too.
  var motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)");

  function applyMotion() {
    var videos = document.querySelectorAll(".motion video");
    Array.prototype.forEach.call(videos, function (v) {
      if (motionOK.matches) {
        var p = v.play();
        if (p && p.catch) { p.catch(function () {}); }
      } else {
        v.pause();
      }
    });
  }

  applyMotion();
  if (motionOK.addEventListener) {
    motionOK.addEventListener("change", applyMotion);
  }
})();
