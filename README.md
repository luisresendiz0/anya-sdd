<img src="anya.png" alt="Anya" width="120" />

# Anya-SDD

**Spec-Driven Development that fits in seven markdown files.**

Anya turns "build me X" into an auditable, agile pipeline: constitution → stack →
plan → spec → tasks → code → verification. Every deliverable is an **End-to-End
Vertical Slice** (UI/CLI + logic + state + tests): no broken intermediate states,
no horizontal waterfall layers, and 100% runnable from day one starting with a
functional Walking Skeleton.

No runtime. No dependencies. No lock-in. Just `.md` files your agent can read and
your team can review.

[Live site](https://luisresendiz0.github.io/anya-sdd/) · [Quick start](#try-it-in-2-minutes) · [How it works](#how-it-works) · [Skills](#skills) · [Philosophy](#philosophy)

---

## Why

AI agents are fast, but they drift. Without a written source of truth they invent
requirements, forget constraints, construct disconnected horizontal layers that
never run together, and ship code that "works" only on paper.

Anya fixes that with four core habits:

1. **Write the intent once.** Vision, stack, and plan live in files — not in a chat
   that disappears.
2. **Vertical Slices only.** Every spec delivers working user value end-to-end.
   Spec 001 is a functional Walking Skeleton; the app is 100% executable and usable
   from the start.
3. **Real-time visibility.** Tasks communicate progress dynamically (`[ ]` pending,
   `[/]` in progress, `[x]` completed).
4. **Interactive live verification with mandatory pause.** Implementations compile,
   start cleanly, run 6-level verification, generate an Interactive Live Testing Guide,
   and **halt completely** for human verification before proceeding.

## How it works

```
/anya-constitution → /anya-stack → /anya-plan
                                      ↓
                               /anya-spec ←─────┐
                                      ↓          │
                                 /anya-task      │
                                      ↓          │
                               /anya-implement   │
                                      ↓          │
                                /anya-verify ────┘
                         (halts for user live test)
```

The first three steps run **once per project**. The rest repeat for every deliverable.

## Try it in 2 minutes

### 1. Get the skills

```bash
git clone https://github.com/luisresendiz0/anya-sdd.git /tmp/anya-sdd
cp -r /tmp/anya-sdd/.anya /your-project/
cd /your-project
```

### 2. Make your agent aware

**Agent skills (recommended — auto-discovery):**

```bash
mkdir -p ~/.config/opencode/skills
cp -r .anya/anya-* ~/.config/opencode/skills/

# Other harnesses:
# cp -r .anya/anya-* .opencode/skills/
# cp -r .anya/anya-* ~/.claude/skills/
```

Each `.anya/anya-<skill>/SKILL.md` follows standard layout for instant auto-discovery.

**Project mode (no global install):** add this to your `AGENTS.md` or equivalent:

```markdown
This project uses Anya-SDD. Before writing code, read
`.anya/anya-<skill>/SKILL.md` and follow it. Artifacts live in `anya/`.
```

### 3. Run the foundation

```bash
/anya-constitution Task manager for freelancers with multiple clients.
Need projects by client, time tracking, monthly reports, PDF invoicing.
No real-time collaboration or payments.

/anya-stack TypeScript + Express + PostgreSQL backend. React frontend.

/anya-plan
```

### 4. Build one feature

```bash
/anya-spec next
/anya-task 001-task-create-view
/anya-implement 001-task-create-view
```

`/anya-implement` runs `/anya-verify` automatically, confirms build/runtime health,
generates a step-by-step Interactive Live Testing Guide, and pauses for your approval.

> `/anya-…` is the name of each skill. If your agent doesn't support slash commands,
> ask it to load the matching skill by name — the result is the same.

## What lands in your project

```
your-project/
├── .anya/                      # the 7 skills (copy once)
│   ├── anya-constitution/SKILL.md
│   ├── anya-stack/SKILL.md
│   ├── anya-plan/SKILL.md
│   ├── anya-spec/SKILL.md
│   ├── anya-task/SKILL.md
│   ├── anya-implement/SKILL.md
│   └── anya-verify/SKILL.md
└── anya/                       # your project's source of truth
    ├── constitution.md
    ├── stack.md
    ├── plan.md
    └── specs/
        ├── 001-task-create-view/
        │   ├── spec.md
        │   └── tasks.md
        ├── 002-task-toggle-status/
        │   ├── spec.md
        │   └── tasks.md
        └── 003-task-search-filter/
            ├── spec.md
            └── tasks.md
```

Each spec gets a numbered folder (`001`, `002`, …), containing `spec.md` and
mandatory `tasks.md`. Every artifact starts with `> version: N · updated: YYYY-MM-DD`.

## Skills

| Skill | Role | Purpose |
|-------|------|---------|
| `anya-constitution` | Visionary Product Architect | Problem, user capabilities, rules, exclusions |
| `anya-stack` | Pragmatic Systems Architect | Tech stack, run/dev commands, testing strategy |
| `anya-plan` | Strategic Delivery Lead | End-to-end vertical slices & Walking Skeleton |
| `anya-spec` | Product-Minded Tech Lead | Complete Vertical Slice or Flexible Spec |
| `anya-task` | Agile Implementation Strategist | Atomic tasks, real-time `[/]`, live test task |
| `anya-implement` | Senior Code Craftsman | Build, task by task, runtime health validation |
| `anya-verify` | Quality Assurance Architect | 6 levels, Live Testing Guide & mandatory pause |

## Proportional Spec Sizing

- **Complete Vertical Slice Spec** — 6 sections. For medium/large features, new user flows, and Walking Skeletons. Defines User Value, E2E Layers (UI/Logic/Data), Acceptance Criteria, Live Verification Steps, Tests, and Exclusions.
- **Flexible Lightweight Spec** — 4 sections. For quick bug fixes, evolutionary refinements, and minor tweaks.

## Tests & Execution Commands

`anya/stack.md` defines both the **exact startup command** (`Run / Dev`) to launch
the application for live testing and the **exact test commands**. Anya never assumes
frameworks: a Go API, a Python CLI, or a Node app records the tools matching its
own ecosystem.

## Changing your mind

| What changed | What to do |
|---|---|
| Constitution | Edit it, re-run `/anya-plan`, regenerate affected specs |
| Stack | Edit it, regenerate affected specs |
| Plan | Add or remove vertical slices incrementally |
| Spec | `/anya-spec update <name>` or `/anya-spec fix <issue>` |

## Philosophy

- **Vertical Slices** — user value and working code from increment 1.
- **Zero dependencies** — only markdown.
- **Portable** — any agent that reads files can run it.
- **Pragmatic** — decisions and human verification, not blind automation.
- **Minimal** — seven skills, no ceremony.
- **Token-efficient** — imperative English, no filler.

## What Anya is not

- Not a CLI or code generator — your agent writes the code.
- Not a project tracker — the plan is a plain markdown table.
- Not a framework you have to migrate — delete the folder and nothing breaks.

## Docs

- [QUICKSTART.md](./QUICKSTART.md) — the full workflow, scenario by scenario
- [CHANGELOG.md](./CHANGELOG.md) — version history
- [`docs/`](./docs/) — landing page source, published to GitHub Pages

## Landing page

The landing page in [`docs/`](./docs/) is deployed by
[`.github/workflows/pages.yml`](./.github/workflows/pages.yml) on every push to
`main` that touches `docs/`.

One-time setup: open **Settings → Pages** and set **Source** to **GitHub Actions**.
Once the workflow finishes, the site is served at
`https://luisresendiz0.github.io/anya-sdd/`.

## License

MIT — inspired by Spy x Family. Optimized for AI agents.
