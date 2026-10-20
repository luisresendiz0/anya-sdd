<img src="anya.png" alt="Anya" width="150" />

# Anya-SDD Framework

**Spec-Driven Development** — minimal, role-based, token-optimized.

## Philosophy

- **Zero dependencies** — only `.md` files
- **Portable** — works from any device with an AI agent
- **Pragmatic** — conscious decisions, not blind automation
- **Minimalist** — no bureaucracy, only essentials
- **Token-efficient** — English, imperative, condensed

## Skills

| Skill | Role | Purpose |
|-------|------|---------|
| `anya-constitution` | Visionary Product Architect | Define vision, scope, rules |
| `anya-stack` | Pragmatic Systems Architect | Define tech + testing |
| `anya-plan` | Strategic Delivery Lead | Organize specs in phases |
| `anya-spec` | Product-Minded Tech Lead | Generate Mini/Full specs |
| `anya-task` | Agile Implementation Strategist | Decompose into tasks |
| `anya-implement` | Senior Code Craftsman | Build with quality |
| `anya-verify` | Quality Assurance Architect | Validate + suggest |

## Installation

```bash
cp -r anya-sdd /your-project/
```

## Quick Start

```bash
# Foundation (once per project)
/anya-constitution <project description>
/anya-stack <technologies>
/anya-plan

# Iteration (repeat per spec)
/anya-spec next
/anya-task <spec>
/anya-implement <spec>
```

See [QUICKSTART.md](./QUICKSTART.md) for full workflow.

## Frontmatter Structure (v0.4.0)

```yaml
---
name: anya-<skill>
role: <Technical Role>
description: >
  <Precise description for triggering.>
version: 0.4.0
triggers:
  - user_intent: "<pattern>"
  - context: "<condition>"
reads: [<dependencies>]
writes: [<outputs>]
next: <next-skill>
gates: [<validation rules>]
exit: [<completion conditions>]
anti: [<what NOT to do>]
---
```

## Pipeline

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

## Output Structure

```
your-project/
└── anya/
    ├── constitution.md
    ├── stack.md
    ├── plan.md
    └── specs/
        ├── <spec>.md
        └── <spec>.tasks.md
```

## Key Features

- **Role-based** — each skill has specialized persona
- **Auto-triggers** — activates by intent or context
- **Quality gates** — strict validation per skill
- **Anti-patterns** — detects common mistakes
- **Mini/Full specs** — adapts to complexity
- **Cascade diagnosis** — identifies exact problem level
- **Auto-verification** — runs after implementation

## Change Management

| Layer | Change Frequency | Impact |
|-------|------------------|--------|
| Constitution | Rarely | Re-eval plan + affected specs |
| Stack | Rarely | Re-eval plan + affected specs |
| Plan | When adding specs | Incremental update |
| Specs | Per new feature | Independent |
| Tasks | Per spec | Derived from spec |

## Testing

Defined in `/anya-stack`. Applies to **entire project** once set.

## Documentation

- [QUICKSTART.md](./QUICKSTART.md) — Workflow guide
- [CHANGELOG.md](./CHANGELOG.md) — Version history
- [OPTIMIZATION-PROPOSAL.md](./OPTIMIZATION-PROPOSAL.md) — v0.3.0 design
- [EXECUTIVE-SUMMARY.md](./EXECUTIVE-SUMMARY.md) — v0.3.0 summary

## License

MIT

## Credits

Inspired by Spy x Family. Optimized for AI agents.
