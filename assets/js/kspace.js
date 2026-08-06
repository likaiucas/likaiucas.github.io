/* =============================================================================
 * KSPACE · site behaviour
 * Vanilla JS, no dependencies. Theme + language state live on <html> as data
 * attributes; CSS does the rest. Everything here is progressive enhancement.
 * ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var LANG_KEY = "kspace-lang";
  var THEME_KEY = "kspace-theme";

  function store(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  /* ---------------------------------------------------------------- language */
  function setLang(lang) {
    var next = lang === "zh" ? "zh" : "en";
    root.setAttribute("data-lang", next);
    root.setAttribute("lang", next === "zh" ? "zh-CN" : "en");
    store(LANG_KEY, next);
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-set") === next));
    });
  }

  function initLang() {
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang-set"));
      });
    });
    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(root.getAttribute("data-lang") === "zh" ? "en" : "zh");
      });
    });
    setLang(root.getAttribute("data-lang") || "en");
  }

  /* ------------------------------------------------------------------- theme */
  function setTheme(theme) {
    var next = theme === "light" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    store(THEME_KEY, next);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#f7f9fc" : "#070b14");
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", next === "light" ? "Switch to dark theme" : "Switch to light theme");
    });
  }

  function initTheme() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light");
      });
    });
    setTheme(root.getAttribute("data-theme") || "dark");
  }

  /* --------------------------------------------------------------- nav chrome */
  function initNav() {
    var nav = document.querySelector(".k-nav");
    var menu = document.getElementById("k-nav-menu");
    var burger = document.querySelector("[data-nav-toggle]");

    if (nav) {
      var onScroll = function () {
        nav.classList.toggle("is-stuck", window.scrollY > 12);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (burger && menu) {
      burger.addEventListener("click", function () {
        var open = menu.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", String(open));
      });
      menu.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          menu.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  /* ------------------------------------------------------------ back to top */
  function initToTop() {
    var btn = document.querySelector("[data-totop]");
    if (!btn) return;
    var onScroll = function () {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------------------------------------- accordion */
  function initChapters() {
    document.querySelectorAll("[data-chapters-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var scopeSel = btn.getAttribute("data-scope");
        var scope = scopeSel ? document.querySelector(scopeSel) : document;
        if (!scope) return;
        var open = btn.getAttribute("data-chapters-toggle") === "open";
        scope.querySelectorAll("details.k-chapter").forEach(function (d) {
          d.open = open;
        });
      });
    });

    // Deep link: /publications/#ch1-obm opens and scrolls to that chapter.
    var openFromHash = function () {
      var id = window.location.hash.replace("#", "");
      if (!id) return;
      var target = document.getElementById(id);
      if (!target) return;
      var details = target.closest ? target.closest("details.k-chapter") : null;
      if (target.tagName === "DETAILS") details = target;
      if (details) details.open = true;
      window.setTimeout(function () {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
  }

  /* ------------------------------------------------------------ copy bibtex */
  function showToast(message) {
    var toast = document.querySelector("[data-toast]");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 1800);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  function initCopy() {
    var zh = function () { return root.getAttribute("data-lang") === "zh"; };
    document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var src = document.getElementById(btn.getAttribute("data-copy-target"));
        if (!src) return;
        var done = (zh() && btn.getAttribute("data-copy-done-zh")) || btn.getAttribute("data-copy-done") || "Copied";
        var fail = (zh() && btn.getAttribute("data-copy-fail-zh")) || btn.getAttribute("data-copy-fail") || "Copy failed";
        copyText(src.textContent.trim()).then(
          function () { showToast(done); },
          function () { showToast(fail); }
        );
      });
    });
  }

  /* ------------------------------------------------------------------ reveal */
  function initReveal() {
    var items = document.querySelectorAll(".k-reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------- count metrics */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var run = function (el) {
      var raw = el.getAttribute("data-count");
      var target = parseFloat(raw);
      if (isNaN(target)) return;
      var suffix = el.getAttribute("data-count-suffix") || "";
      if (reduced) { el.textContent = raw + suffix; return; }

      var start = performance.now();
      var dur = 900;
      var step = function (now) {
        var p = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      nums.forEach(run);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------------- news more */
  function initNewsMore() {
    var btn = document.querySelector("[data-news-more]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      document.querySelectorAll(".k-news__item.is-hidden").forEach(function (el) {
        el.classList.remove("is-hidden");
      });
      btn.remove();
    });
  }

  /* --------------------------------------------------------------------- toc */
  function initToc() {
    var links = document.querySelectorAll(".k-toc__link");
    if (!links.length || !("IntersectionObserver" in window)) return;

    var map = {};
    var targets = [];
    links.forEach(function (link) {
      var id = (link.getAttribute("href") || "").replace(/^.*#/, "");
      var el = id && document.getElementById(id);
      if (!el) return;
      map[id] = link;
      targets.push(el);
    });
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove("is-active"); });
        var link = map[entry.target.id];
        if (link) link.classList.add("is-active");
      });
    }, { rootMargin: "-25% 0px -65% 0px" });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------------------- boot */
  function boot() {
    root.classList.remove("no-js");
    initLang();
    initTheme();
    initNav();
    initToTop();
    initChapters();
    initCopy();
    initReveal();
    initCounters();
    initNewsMore();
    initToc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
