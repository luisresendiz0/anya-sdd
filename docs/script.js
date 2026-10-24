/* ============================================================
   Anya-SDD landing — interactions
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ----------------------------------------------------------
     Header: animated sticky on scroll
     ---------------------------------------------------------- */
  const header = $("#site-header");
  let ticking = false;
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  };
  updateHeader();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ----------------------------------------------------------
     Mobile navigation
     ---------------------------------------------------------- */
  const navToggle = $("#nav-toggle");
  const nav = $("#nav-menu");

  const closeNav = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  $$(".nav a").forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      closeNav();
      navToggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(e.target) || navToggle.contains(e.target)) return;
    closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) closeNav();
  });

  /* ----------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------- */
  const revealEls = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ----------------------------------------------------------
     Active nav link
     ---------------------------------------------------------- */
  const navLinks = $$(".nav-link");
  const sections = navLinks
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ----------------------------------------------------------
     Animated counters
     ---------------------------------------------------------- */
  const counters = $$("[data-count]");
  const animateCount = (el) => {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    if (reduceMotion || target === 0) {
      el.textContent = `${target}${suffix}`;
      return;
    }
    const duration = 1100;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window && !reduceMotion) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterObserver.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* ----------------------------------------------------------
     Hero: typing command + staggered output
     ---------------------------------------------------------- */
  const typingEl = $("[data-typing]");
  const cursorEl = $("[data-cursor]");
  const revealLines = $$("[data-reveal]");

  const revealOutput = () => {
    revealLines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add("is-visible");
        if (i === revealLines.length - 1 && cursorEl) cursorEl.style.display = "none";
      }, i * 220);
    });
  };

  if (typingEl) {
    const text = typingEl.dataset.typing || "";
    if (reduceMotion) {
      typingEl.textContent = text;
      if (cursorEl) cursorEl.style.display = "none";
      revealLines.forEach((line) => line.classList.add("is-visible"));
    } else {
      typingEl.textContent = "";
      let index = 0;
      const typeNext = () => {
        typingEl.textContent = text.slice(0, index);
        index += 1;
        if (index <= text.length) {
          setTimeout(typeNext, 55 + Math.random() * 45);
        } else {
          setTimeout(revealOutput, 380);
        }
      };
      setTimeout(typeNext, 650);
    }
  }

  /* ----------------------------------------------------------
     Pipeline tabs
     ---------------------------------------------------------- */
  const PIPELINE = [
    {
      skill: "anya-constitution",
      role: "Visionary Product Architect",
      loop: "runs once per project",
      desc: "Extract the vision, scope, rules, and exclusions from a single prompt. Ask only what’s missing, flag doubts and contradictions, and request approval before writing.",
      output: "anya/constitution.md",
    },
    {
      skill: "anya-stack",
      role: "Pragmatic Systems Architect",
      loop: "runs once per project",
      desc: "Choose the tech stack and record the testing strategy — including the exact command for each suite, derived from your ecosystem. No framework is hardcoded.",
      output: "anya/stack.md",
    },
    {
      skill: "anya-plan",
      role: "Strategic Delivery Lead",
      loop: "runs once per project",
      desc: "Organize End-to-End Vertical Slices into phases, starting with a functional Walking Skeleton in Spec 001. No horizontal cascade layers.",
      output: "anya/plan.md",
    },
    {
      skill: "anya-spec",
      role: "Product-Minded Tech Lead",
      loop: "repeats per feature",
      desc: "Generates vertical slice specs. Adapts between Complete Vertical Slice Specs (6 sections) and Flexible Lightweight Specs (4 sections) for fast fixes.",
      output: "anya/specs/NNN-name/spec.md",
    },
    {
      skill: "anya-task",
      role: "Agile Implementation Strategist",
      loop: "repeats per feature",
      desc: "Turn the spec into ordered tasks integrating the vertical slice. Real-time state tracking ([ ], [/], [x]) and mandatory final live test task.",
      output: "anya/specs/NNN-name/tasks.md",
    },
    {
      skill: "anya-implement",
      role: "Senior Code Craftsman",
      loop: "repeats per feature",
      desc: "Execute tasks one at a time with real-time [/] tracking, verify compilation and runtime startup cleanly, and pause for live verification.",
      output: "working code + updated tasks",
    },
    {
      skill: "anya-verify",
      role: "Quality Assurance Architect",
      loop: "repeats per feature",
      desc: "Validate across 6 levels (tasks, spec, stack, constitution, runtime health, tests), generate the Interactive Live Testing Guide, and halt.",
      output: "verification report + live test guide",
    },
  ];

  const pipeSteps = $$(".pipe-step");
  const pipeTitle = $("#pipe-title");
  const pipeRole = $("#pipe-role");
  const pipeLoop = $("#pipe-loop");
  const pipeDesc = $("#pipe-desc");
  const pipeOutput = $("#pipe-output");
  const pipePanel = $("#pipe-panel");

  const selectStep = (index) => {
    const data = PIPELINE[index];
    if (!data) return;
    pipeSteps.forEach((btn, i) => {
      const selected = i === index;
      btn.setAttribute("aria-selected", String(selected));
      btn.tabIndex = selected ? 0 : -1;
    });
    pipeRole.textContent = data.role;
    pipeLoop.textContent = data.loop;
    pipeTitle.textContent = `/${data.skill}`;
    pipeDesc.textContent = data.desc;
    pipeOutput.textContent = data.output;
    pipePanel.setAttribute("aria-labelledby", `pipe-tab-${index}`);
  };

  pipeSteps.forEach((btn, index) => {
    btn.addEventListener("click", () => selectStep(index));
    btn.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % pipeSteps.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + pipeSteps.length) % pipeSteps.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = pipeSteps.length - 1;
      if (next === null) return;
      e.preventDefault();
      selectStep(next);
      pipeSteps[next].focus();
    });
  });

  /* ----------------------------------------------------------
     Harness tabs
     ---------------------------------------------------------- */
  const tabs = $$(".tab");
  const panels = $$(".tab-panel");

  const activateTab = (tab) => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
    });
    panels.forEach((panel) => {
      panel.hidden = panel.id !== tab.getAttribute("aria-controls");
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      activateTab(tabs[next]);
      tabs[next].focus();
    });
  });

  /* ----------------------------------------------------------
     Copy buttons
     ---------------------------------------------------------- */
  const copyText = async (text) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      /* fall through to the legacy path */
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    return true;
  };

  $$("[data-copy], [data-copy-text]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      let text = btn.dataset.copyText;
      if (!text && btn.dataset.copy) {
        const source = $(btn.dataset.copy);
        if (source) text = source.textContent.replace(/^\n+|\n+$/g, "");
      }
      if (!text) return;

      try {
        await copyText(text);
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<span class="copy-check">✓</span><span>Copied!</span>`;
        btn.classList.add("is-copied");
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove("is-copied");
        }, 1600);
      } catch (err) {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<span>Failed</span>`;
        setTimeout(() => { btn.innerHTML = originalHTML; }, 1600);
      }
    });
  });

  /* ----------------------------------------------------------
     Footer year
     ---------------------------------------------------------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
