(function ($) {
  "use strict";

  /* --------------------------------
   * Helpers
   * -------------------------------- */
  function updateHeaderBg() {
    var scroll = window.scrollY || $(window).scrollTop();
    var box = $(".header-text").outerHeight() || 0;
    var headerH = $("header").outerHeight() || 80;

    // Theme-like threshold: after hero or ~50px, whichever is greater
    var threshold = Math.max(50, box - headerH);

    if (scroll >= threshold) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  }

  function mobileNav() {
    var width = $(window).width();
    // Submenu open/close on mobile only
    $(".submenu")
      .off("click._mobSub")
      .on("click._mobSub", function () {
        if (width < 767) {
          $(".submenu ul").removeClass("active");
          $(this).find("ul").toggleClass("active");
        }
      });
  }

  /* --------------------------------
   * Tabs (jQuery UI)
   * -------------------------------- */
  $(function () {
    if ($("#tabs").length && $.fn.tabs) {
      $("#tabs").tabs();
    }
  });

  /* --------------------------------
   * Header background on scroll
   * (single source of truth)
   * -------------------------------- */
  $(window).on("load scroll", updateHeaderBg);
  updateHeaderBg();

  /* --------------------------------
   * Schedule filter
   * -------------------------------- */
  $(".schedule-filter li").on("click", function () {
    var tsfilter = $(this).data("tsfilter");
    $(".schedule-filter li").removeClass("active");
    $(this).addClass("active");

    if (tsfilter === "all") {
      $(".schedule-table").removeClass("filtering");
      $(".ts-item").removeClass("show");
    } else {
      $(".schedule-table").addClass("filtering");
      $(".ts-item").each(function () {
        var $it = $(this);
        $it.toggleClass("show", $it.data("tsmeta") === tsfilter);
      });
    }
  });

  /* --------------------------------
   * Scroll animation init
   * -------------------------------- */
  if (typeof scrollReveal !== "undefined") {
    window.sr = new scrollReveal();
  }

  /* --------------------------------
   * Burger / Mobile menu toggle
   * (matches original theme behavior)
   * -------------------------------- */
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function (e) {
      e.preventDefault();
      $(this).toggleClass("active");
      // Slide just the UL.nav; header remains 80px tall (theme default)
      $(".header-area .nav").slideToggle(200, function () {
        // After open/close, re-evaluate header bg state
        updateHeaderBg();
      });
    });
  }

  /* --------------------------------
   * Smooth scroll + active link highlight
   * -------------------------------- */
  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $("a").removeClass("active");
      $(this).addClass("active");

      var target = $(this.hash);
      if (!target.length) return;

      $("html, body")
        .stop()
        .animate(
          { scrollTop: target.offset().top + 1 },
          500,
          "swing",
          function () {
            window.location.hash = target.selector;
            $(document).on("scroll", onScroll);
          }
        );
    });
  });

  function onScroll() {
    var scrollPos = $(document).scrollTop();
    $(".nav a[href^='#']").each(function () {
      var currLink = $(this);
      var href = currLink.attr("href");
      if (!href || href === "#") return;

      var refElement = $(href);
      if (!refElement.length) return;

      var top = refElement.position().top;
      var bottom = top + refElement.outerHeight();

      if (top <= scrollPos && bottom > scrollPos) {
        $(".nav a").removeClass("active");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  /* --------------------------------
   * Preloader
   * -------------------------------- */
  $(window).on("load", function () {
    $("#js-preloader").addClass("loaded");
  });

  /* --------------------------------
   * Resize handlers
   * -------------------------------- */
  $(window).on("resize", function () {
    mobileNav();
  });
  mobileNav();
})(window.jQuery);
