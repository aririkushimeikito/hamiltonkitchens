/* ==========================================================================
   Hamilton Kitchens — js/main.js
   Vanilla JavaScript only. No dependencies.

   Contents
   1. Site configuration (phone, form key)
   2. Header scroll state
   3. Mobile navigation
   4. Scroll reveals (IntersectionObserver)
   5. Gallery filters + lightbox
   6. Contact form (Web3Forms-ready)
   ========================================================================== */

(function () {
  "use strict";

  /* 1. Site configuration ------------------------------------------------ */

  /**
   * Showroom hours.
   * Each day is an array of opening periods in 24-hour "HH:MM" format.
   * - Use an empty array [] for a day the showroom is closed.
   * - Multiple periods are supported, e.g. [["09:00","12:00"],["13:00","17:00"]].
   *
   * IMPORTANT: The hours below are NOT yet confirmed by the client.
   * Set `hoursConfirmed` to true once the real hours have been entered;
   * until then the site shows "Call for showroom hours" instead of
   * calculating an Open / Closed status.
   */
  var SITE = {
    phoneDisplay: "(609) 890-0012",
    // Contact form — see README section 12
    web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY"
  };

  /* 2. Header scroll state ------------------------------------------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* 3. Mobile navigation --------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function open() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.querySelector(".nav-toggle__text").textContent = "Close";
      document.body.classList.add("nav-open");
      var first = nav.querySelector("a");
      if (first) first.focus();
    }
    function close(returnFocus) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector(".nav-toggle__text").textContent = "Menu";
      document.body.classList.remove("nav-open");
      if (returnFocus) toggle.focus();
    }
    function isOpen() { return nav.classList.contains("is-open"); }

    toggle.addEventListener("click", function () { isOpen() ? close(true) : open(); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) close(true);
    });

    document.addEventListener("click", function (e) {
      if (!isOpen()) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close(false);
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { if (isOpen()) close(false); });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1024 && isOpen()) close(false);
    });
  }

  /* 4. Scroll reveals ---------------------------------------------------------- */
  function initReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* 5. Gallery filters + lightbox ------------------------------------------------ */
  function initGallery() {
    var gallery = document.querySelector("[data-gallery]");
    if (!gallery) return;

    // Render from js/gallery-data.js
    var base = gallery.getAttribute("data-image-base") || "../images/";
    var photos = window.GALLERY_PHOTOS || [];
    photos.forEach(function (ph) {
      var fig = document.createElement("figure");
      fig.className = "gallery__item" + (ph.wide ? " gallery__item--wide" : "");
      fig.setAttribute("data-category", (ph.categories || []).join(" "));
      var sizes = ph.wide ? "(min-width: 900px) 66vw, 100vw" : "(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw";
      fig.innerHTML =
        '<button type="button" data-full="' + base + ph.src + '.jpg" aria-label="Open larger image">' +
        '<img src="' + base + ph.src + '-800.jpg" srcset="' + base + ph.src + '-800.jpg 800w, ' + base + ph.src + '.jpg 1600w" sizes="' + sizes + '" width="800" height="600" loading="lazy" decoding="async"></button>' +
        '<figcaption></figcaption>';
      fig.querySelector("img").alt = ph.alt || "";
      fig.querySelector("figcaption").textContent = ph.caption || "";
      gallery.appendChild(fig);
    });

    var items = Array.prototype.slice.call(gallery.querySelectorAll(".gallery__item"));
    var filters = document.querySelectorAll("[data-filter]");
    var empty = document.querySelector("[data-gallery-empty]");

    // Filtering
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var value = btn.getAttribute("data-filter");
        filters.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        var shown = 0;
        items.forEach(function (item) {
          var cats = (item.getAttribute("data-category") || "").split(" ");
          var match = value === "all" || cats.indexOf(value) !== -1;
          item.classList.toggle("is-hidden", !match);
          if (match) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    });

    // Lightbox
    var lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    var img = lightbox.querySelector("[data-lightbox-image]");
    var caption = lightbox.querySelector("[data-lightbox-caption]");
    var count = lightbox.querySelector("[data-lightbox-count]");
    var closeBtn = lightbox.querySelector("[data-lightbox-close]");
    var prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    var nextBtn = lightbox.querySelector("[data-lightbox-next]");
    var current = -1;
    var lastFocus = null;

    function visibleItems() {
      return items.filter(function (i) { return !i.classList.contains("is-hidden"); });
    }

    function show(index) {
      var list = visibleItems();
      if (!list.length) return;
      current = (index + list.length) % list.length;
      var item = list[current];
      var trigger = item.querySelector("button");
      img.src = trigger.getAttribute("data-full");
      img.alt = trigger.querySelector("img").alt;
      caption.textContent = item.querySelector("figcaption") ? item.querySelector("figcaption").textContent : "";
      count.textContent = (current + 1) + " / " + list.length;
    }

    function open(index, trigger) {
      lastFocus = trigger || document.activeElement;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("nav-open"); // reuse scroll lock
      show(index);
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("nav-open");
      img.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    }

    items.forEach(function (item) {
      var btn = item.querySelector("button");
      btn.addEventListener("click", function () {
        open(visibleItems().indexOf(item), btn);
      });
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { show(current - 1); });
    nextBtn.addEventListener("click", function () { show(current + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox__stage")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "Tab") {
        // Keep focus inside the dialog
        var focusables = lightbox.querySelectorAll("button");
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Touch swipe
    var startX = 0;
    lightbox.addEventListener("touchstart", function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(dx > 0 ? current - 1 : current + 1);
    }, { passive: true });
  }

  /* 6. Contact form ------------------------------------------------------------ */
  function initForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;

    var status = form.querySelector("[data-form-status]");
    var submit = form.querySelector('button[type="submit"]');
    var keyField = form.querySelector('input[name="access_key"]');
    if (keyField) keyField.value = SITE.web3formsKey;

    function setError(field, message) {
      var err = form.querySelector('[data-error-for="' + field.name + '"]');
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (err) err.textContent = message || "";
    }

    function validate() {
      var ok = true;
      var group = form.querySelector("[data-checkbox-group]");
      if (group) {
        var any = group.querySelector("input:checked");
        var gerr = form.querySelector('[data-error-for="interest"]');
        if (gerr) gerr.textContent = any ? "" : "Choose at least one.";
        if (!any) ok = false;
      }
      form.querySelectorAll("[required]").forEach(function (field) {
        var value = field.value.trim();
        var msg = "";
        if (!value) msg = "This field is required.";
        else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) msg = "Enter a valid email address.";
        else if (field.type === "tel" && value.replace(/\D/g, "").length < 7) msg = "Enter a valid phone number.";
        setError(field, msg);
        if (msg) ok = false;
      });
      return ok;
    }

    form.querySelectorAll("[required]").forEach(function (field) {
      field.addEventListener("blur", function () { if (field.value.trim()) setError(field, ""); });
    });

    function showStatus(type, message) {
      status.hidden = false;
      status.setAttribute("data-type", type);
      status.textContent = message;
      status.focus();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.hidden = true;

      // Honeypot — bots fill it, humans never see it
      var honey = form.querySelector('input[name="botcheck"]');
      if (honey && honey.checked) return;

      if (!validate()) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (SITE.web3formsKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
        showStatus("error", "The contact form isn't connected yet. Please call " + SITE.phoneDisplay + " instead.");
        return;
      }

      submit.setAttribute("aria-busy", "true");
      var original = submit.textContent;
      submit.textContent = "Sending…";

      var data = new FormData(form);
      fetch("https://api.web3forms.com/submit", { method: "POST", body: data })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          if (json.success) {
            form.reset();
            showStatus("success", "Thanks for reaching out! Someone from Hamilton Kitchens will be in touch within one business day. If you'd like to talk sooner, call us at " + SITE.phoneDisplay + ".");
          } else {
            showStatus("error", "Something went wrong sending your message. Please call " + SITE.phoneDisplay + ".");
          }
        })
        .catch(function () {
          showStatus("error", "We couldn't reach the mail service. Please call " + SITE.phoneDisplay + ".");
        })
        .finally(function () {
          submit.removeAttribute("aria-busy");
          submit.textContent = original;
        });
    });
  }

  /* Init ----------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initNav();
    initReveals();
    initGallery();
    initForm();
  });
})();
