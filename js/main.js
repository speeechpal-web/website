(() => {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  const compareHashes = {
    "#vs-gleam": "/compare-social#vs-gleam",
    "#vs-orai": "/compare-articulation#vs-orai",
    "#vs-speeko": "/compare-articulation#vs-speeko",
    "#vs-yoodli": "/compare-articulation#vs-yoodli",
    "#vs-wellspoken": "/compare-articulation#vs-wellspoken",
    "#vs-elsa": "/compare-articulation#vs-elsa",
  };
  const onCompareIndex =
    /\/competitors(?:\.html)?\/?$/.test(window.location.pathname);
  if (onCompareIndex && compareHashes[window.location.hash]) {
    window.location.replace(compareHashes[window.location.hash]);
    return;
  }

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const compareNav = document.querySelector(".nav-compare");
  const compareBtn = document.querySelector(".nav-compare-btn");
  if (compareNav && compareBtn) {
    const setCompareOpen = (open) => {
      compareNav.classList.toggle("is-open", open);
      compareBtn.setAttribute("aria-expanded", open ? "true" : "false");
    };
    compareBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      setCompareOpen(!compareNav.classList.contains("is-open"));
    });
    compareNav.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", () => setCompareOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setCompareOpen(false);
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

})();
