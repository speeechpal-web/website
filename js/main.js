(() => {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

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

  const scenes = {
    group: {
      label: "Group hangout",
      title: "Join the Circle",
      next: "Step in without a script",
      hint: "Use one observation, then listen for a thread you can follow.",
      color: "#dce8cf",
    },
    date: {
      label: "First date",
      title: "Break the Silence",
      next: "Keep the first pause warm",
      hint: "Ask one real follow-up, then offer a small piece of you.",
      color: "#f3c8c2",
    },
    smalltalk: {
      label: "Small talk",
      title: "Keep It Going",
      next: "Turn a first line into a talk",
      hint: "Anchor to the setting, ask once, and follow the word they used.",
      color: "#f6e3b0",
    },
    conflict: {
      label: "Tough conversation",
      title: "Handle conflict",
      next: "Slow down before you answer",
      hint: "Name what matters without raising the temperature.",
      color: "#f7d7c4",
    },
  };

  const chips = document.querySelectorAll(".scene-chip");
  const card = document.getElementById("scene-card");
  const label = document.getElementById("scene-label");
  const title = document.getElementById("scene-title");
  const next = document.getElementById("scene-next");
  const hint = document.getElementById("scene-hint");

  const showScene = (key) => {
    const scene = scenes[key];
    if (!scene || !card) return;
    label.textContent = scene.label;
    title.textContent = scene.title;
    next.textContent = scene.next;
    hint.textContent = scene.hint;
    card.style.background = scene.color;
    chips.forEach((chip) => {
      const on = chip.dataset.scene === key;
      chip.classList.toggle("is-active", on);
      chip.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => showScene(chip.dataset.scene));
  });

  const howSteps = document.querySelectorAll(".how-step");
  const sessionPanels = document.querySelectorAll(".session-panel");

  const showHowStep = (index) => {
    howSteps.forEach((step) => {
      const on = Number(step.dataset.step) === index;
      step.classList.toggle("is-active", on);
      step.setAttribute("aria-pressed", on ? "true" : "false");
    });
    sessionPanels.forEach((panel) => {
      const on = Number(panel.dataset.step) === index;
      panel.classList.toggle("is-active", on);
      panel.hidden = !on;
    });
  };

  howSteps.forEach((step) => {
    step.addEventListener("click", () => showHowStep(Number(step.dataset.step)));
  });

  document.querySelectorAll(".session-next").forEach((btn) => {
    btn.addEventListener("click", () => showHowStep(Number(btn.dataset.next)));
  });

  document.querySelectorAll(".session-panel").forEach((panel) => {
    const options = panel.querySelectorAll(".session-option");
    if (!options.length) return;
    const multi = panel.dataset.step === "2";
    options.forEach((option) => {
      option.addEventListener("click", () => {
        if (multi) {
          option.classList.toggle("is-on");
          return;
        }
        options.forEach((item) => item.classList.remove("is-on"));
        option.classList.add("is-on");
      });
    });
  });

})();
