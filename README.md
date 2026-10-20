<img src="anya.png" alt="Anya" width="120" />

# Anya-SDD

**Spec-Driven Development that fits in seven markdown files.**

Anya turns "build me X" into a short, auditable pipeline: constitution → stack →
plan → spec → tasks → code → verification. Each step validates the previous one,
so the agent can't quietly drift from what you actually asked for.

No runtime. No dependencies. No lock-in. Just `.md` files your agent can read and
your team can review.

[Quick start](#try-it-in-2-minutes) · [How it works](#how-it-works) · [Skills](#skills) · [Philosophy](#philosophy)

---

## Why

AI agents are fast, but they drift. Without a written source of truth they invent
requirements, forget constraints, and ship code that "works" but doesn't match the
brief.

Anya fixes that with three habits:

1. **Write the intent once.** Vision, stack, and plan live in files — not in a chat
   that disappears.
2. **Validate every step.** Specs can't contradict the constitution. Tasks can't
   invent files. Verification can't assume tests that don't exist.
3. **Close the loop.** Every implementation ends with a verification pass that
   suggests the next spec.

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
```

The first three steps run **once per project**. The rest repeat for every feature.

## Try it in 2 minutes

### 1. Get the skills

```bash
git clone https://github.com/luisresendiz0/anya-ssd.git /tmp/anya-sdd
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

Each `.anya/anya-<skill>/SKILL.md` already follows the standard layout, so it works
without edits.

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

/anya-stack TypeScript + Express + PostgreSQL. React + Tailwind.

/anya-plan
```

### 4. Build one feature

```bash
/anya-spec next
/anya-task login
/anya-implement login
```

`/anya-implement` runs `/anya-verify` automatically and suggests what to build next.

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
        ├── login.md
        └── login.tasks.md
```

Every artifact starts with `> version: N · updated: YYYY-MM-DD`, so you can tell at
a glance how old it is and whether it was re-generated.

## Skills

| Skill | Role | Purpose |
|-------|------|---------|
| `anya-constitution` | Visionary Product Architect | Vision, scope, rules, exclusions |
| `anya-stack` | Pragmatic Systems Architect | Tech stack + testing strategy |
| `anya-plan` | Strategic Delivery Lead | Specs organized in phases |
| `anya-spec` | Product-Minded Tech Lead | Mini or Full spec |
| `anya-task` | Agile Implementation Strategist | Spec → ordered tasks |
| `anya-implement` | Senior Code Craftsman | Build, task by task |
| `anya-verify` | Quality Assurance Architect | Validate + suggest next |

## Two spec sizes

- **Mini-Spec** — 3 sections. For fixes, small features, one component.
- **Full-Spec** — 9 sections. For architecture changes, integrations, multi-component work.

The skill picks the size from complexity and impact, and tells you which one it chose.

## Tests

Testing is defined once, in `anya/stack.md`, together with the **exact command** to
run. Anya never assumes a framework: a Java API, a Python CLI, or a Go service
records the tools that fit its own ecosystem. If a project declares no testing,
verification marks that level as N/A instead of inventing tests.

## Changing your mind

| What changed | What to do |
|---|---|
| Constitution | Edit it, re-run `/anya-plan`, regenerate affected specs |
| Stack | Edit it, regenerate affected specs |
| Plan | Add or remove specs incrementally |
| Spec | `/anya-spec update <name>` |

## Philosophy

- **Zero dependencies** — only markdown.
- **Portable** — any agent that reads files can run it.
- **Pragmatic** — decisions, not blind automation.
- **Minimal** — seven skills, no ceremony.
- **Token-efficient** — imperative English, no filler.

## What Anya is not

- Not a CLI or code generator — your agent writes the code.
- Not a project tracker — the plan is a plain markdown table.
- Not a framework you have to migrate — delete the folder and nothing breaks.

## Docs

- [QUICKSTART.md](./QUICKSTART.md) — the full workflow, scenario by scenario
- [CHANGELOG.md](./CHANGELOG.md) — version history

## License

MIT — inspired by Spy x Family. Optimized for AI agents.
