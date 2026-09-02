/* ==========================================================================
   The Monospace Web - cell probe and media padding
   Source: https://github.com/owickstrom/the-monospace-web  src/index.js
   By Oskar Wickstrom. Licensed under the MIT License:
   https://github.com/owickstrom/the-monospace-web/blob/main/LICENSE.md

   Vendored 2026-09-02 and edited. Kept: gridCellDimensions (the probe that
   measures one real character cell in the page's own font) and
   adjustMediaPadding (which pads every image and video down to a whole number
   of lines, so media never knocks the following text off the rhythm).

   Removed: checkOffsets and the .debug-toggle wiring, which required a debug
   checkbox in the markup and threw when it was absent. Removed too the bare
   `for (media of medias)` implied global, which is a strict-mode error.

   Exposed as window.gridCellDimensions so wiki.js can reuse the probe.
   ========================================================================== */

(function () {
  "use strict";

  function gridCellDimensions() {
    var element = document.createElement("div");
    element.style.position = "fixed";
    element.style.visibility = "hidden";
    element.style.height = "var(--line-height)";
    element.style.width = "1ch";
    document.body.appendChild(element);
    var rect = element.getBoundingClientRect();
    document.body.removeChild(element);
    return { width: rect.width, height: rect.height };
  }

  function adjustMediaPadding() {
    var cell = gridCellDimensions();

    function setHeightFromRatio(media, ratio) {
      var rect = media.getBoundingClientRect();
      var realHeight = rect.width / ratio;
      var diff = cell.height - (realHeight % cell.height);
      media.style.setProperty("padding-bottom", diff + "px");
    }

    function setFallbackHeight(media) {
      var rect = media.getBoundingClientRect();
      var height = Math.round(rect.width / 2 / cell.height) * cell.height;
      media.style.setProperty("height", height + "px");
    }

    function onMediaLoaded(media) {
      var width = 0;
      var height = 0;
      if (media.tagName === "IMG") {
        width = media.naturalWidth;
        height = media.naturalHeight;
      } else if (media.tagName === "VIDEO") {
        width = media.videoWidth;
        height = media.videoHeight;
      }
      if (width > 0 && height > 0) {
        setHeightFromRatio(media, width / height);
      } else {
        setFallbackHeight(media);
      }
    }

    // A media element inside a cell with a declared aspect-ratio is already on
    // the grid by construction; padding it again would double the correction.
    var medias = document.querySelectorAll("img:not(.gridfree), video:not(.gridfree)");
    Array.prototype.forEach.call(medias, function (media) {
      if (media.tagName === "IMG") {
        if (media.complete) {
          onMediaLoaded(media);
        } else {
          media.addEventListener("load", function () { onMediaLoaded(media); });
          media.addEventListener("error", function () { setFallbackHeight(media); });
        }
      } else if (media.tagName === "VIDEO") {
        if (media.readyState >= 2) {
          onMediaLoaded(media);
        } else {
          media.addEventListener("loadeddata", function () { onMediaLoaded(media); });
          media.addEventListener("error", function () { setFallbackHeight(media); });
        }
      }
    });
  }

  window.gridCellDimensions = gridCellDimensions;
  window.adjustMediaPadding = adjustMediaPadding;

  window.addEventListener("load", adjustMediaPadding);
  window.addEventListener("resize", adjustMediaPadding);
})();
