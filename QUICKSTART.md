# Quick Start Guide

End-to-end workflow using Anya-SDD v0.6.0.

## Setup

```bash
# 1. Copy the skills into your project
git clone https://github.com/luisresendiz0/anya-sdd.git /tmp/anya-sdd
cp -r /tmp/anya-sdd/.anya /your-project/
cd /your-project

# 2. Let your agent discover them (recommended)
mkdir -p ~/.config/opencode/skills
cp -r .anya/anya-* ~/.config/opencode/skills/
```

Other harnesses: `.opencode/skills/`, `~/.claude/skills/`, `.agents/skills/`.
Or skip the global install and point your agent at `.anya/` from `AGENTS.md`.

## Phase 1: Foundation

Run these **once per project**.

### 1. Constitution

```bash
/anya-constitution Task manager for freelancers with multiple clients.
Need projects by client, time tracking, monthly reports, PDF invoicing.
No real-time collaboration or payments.
```

**Output:** `anya/constitution.md`

The agent will:
- Extract info from the prompt
- Ask only what's missing
- Flag doubts and contradictions
- Request approval before writing

### 2. Stack

```bash
/anya-stack TypeScript + Express + PostgreSQL backend.
React + Tailwind frontend. Unit + E2E tests.
```

**Output:** `anya/stack.md`

The agent will:
- Ask the project type if it isn't clear
- Ask missing items (ORM, deployment, testing…)
- Derive test tools from **your** ecosystem — never assume one
- Record the **exact command** to run each test suite
- Validate against the constitution

**Example testing block:**

```markdown
## Testing Strategy
- **Unit tests:** yes
  - Tool: <tool for your ecosystem>
  - Command: `<exact command>`
- **E2E tests:** yes
  - Tool: <tool for your ecosystem>
  - Command: `<exact command>`
```

If the project has no tests, say so. Downstream skills will skip that check
instead of inventing one.

### 3. Plan

```bash
/anya-plan
```

**Output:** `anya/plan.md`

The agent will:
- Read the constitution and stack
- Propose phases with specs
- Ensure a logical order (dependencies first)
- Request approval

**Example output:**

```markdown
### Phase 1: Foundations
1. auth-basic - JWT setup
2. login - User login

### Phase 2: Core
3. dashboard - Main view
4. client-crud - Client management
5. project-crud - Project management
6. task-crud - Task management
7. timer - Time tracking

### Phase 3: Value
8. reports - Monthly reports
9. invoicing - PDF invoicing
```

## Phase 2: Iteration

Repeat for **every spec**.

Detail the next usable increment when ready to build it; leave later work as
backlog entries. After trying each delivery, adjust the next step from feedback.

### 4. Generate a spec

```bash
/anya-spec next
```

**Output:** `anya/specs/NNN-name/spec.md`

The agent will:
- Identify the next pending spec
- Decide Mini-Spec (3 sections) or Full-Spec (9 sections)
- Generate it and request approval

Folders are numbered in creation order: `001-auth`, `002-login`, etc. Existing
specs keep their folder when updated. Names in commands can be unique spec names
(`login`) or numbered folders (`002-login`).

### 5. Generate tasks

```bash
/anya-task <spec-name>
```

**Output:** `anya/specs/NNN-name/tasks.md`, beside its `spec.md`.
Required for every spec, including Mini-Specs; use only the tasks the work needs.

Each task gets:
- A clear action
- The file(s) to create or modify
- Explicit dependencies

**Example:**

```markdown
- [ ] **Task 1:** Create User model
  - File: `src/models/user.ts`
  - Dependencies: None

- [ ] **Task 2:** Implement password hashing
  - File: `src/utils/password.ts`
  - Dependencies: Task 1

- [ ] **Task 3:** Create login endpoint
  - File: `src/routes/auth.ts`
  - Dependencies: Tasks 1, 2
```

### 6. Implement

```bash
/anya-implement <spec-name>
```

The agent will:
- Execute tasks **one at a time**
- Mark each task `[x]` immediately and show partial progress (`3/8`)
- Validate against spec, stack, and constitution
- Run the test commands declared in `stack.md` (if any)
- Run `/anya-verify` automatically
- Show progress and suggest future specs

**Example verification output:**

```
Spec completed: 002-login/spec.md

Verification
  Level 1  Tasks          8/8
  Level 2  Spec           5/5 requirements met
  Level 3  Stack          consistent
  Level 4  Constitution   consistent
  Level 5  Tests          6/6 pass

Risks: 1    Improvements: 2

Suggested Specs
1. Rate limiting      → /anya-spec global rate limiting for auth endpoints...
2. Login logging      → /anya-spec logging all login attempts...

Progress
  001-auth/       done
  002-login/      just finished
  003-register/   next
```

If `stack.md` declares no testing, Level 5 is reported as `N/A`.

### 7. Repeat

```bash
/anya-spec next
/anya-task <spec>
/anya-implement <spec>
```

Until the plan is complete.

## Common Scenarios

### Generate a specific spec

```bash
/anya-spec login
```

### Generate several specs

```bash
/anya-spec next 3
```

### Add a spec that isn't in the plan

```bash
/anya-spec rate limiting for login, max 5 attempts in 15 min
```

The agent asks what's missing to define it (scope, criteria, exclusions), generates
the spec, and proposes updating the plan.

### Update an existing spec

```bash
/anya-spec update login to include Google OAuth
```

### Review a broken implementation

```bash
/anya-implement review login
```

The agent diagnoses in cascade:

1. Are all tasks completed?
2. Does the implementation meet the spec?
3. Is it consistent with the stack?
4. Does it respect the constitution?

Then it proposes a surgical fix — not a rewrite.

### Re-verify a spec

```bash
/anya-verify login
```

### Add context to tasks

```bash
/anya-task login focus on security first
```

### Skip tests temporarily

```bash
/anya-implement login skip tests for now
```

## Change Management

### Add a spec mid-project

```bash
/anya-spec <description>
```

The agent defines it with you and proposes a plan update.

### Change the constitution

1. Update `anya/constitution.md` manually
2. Re-run `/anya-plan` to re-evaluate
3. Re-generate affected specs

### Change the stack

1. Update `anya/stack.md` manually
2. Re-generate affected specs

Every artifact carries `> version: N · updated: YYYY-MM-DD`. Bump the version when
you regenerate or expand it.

## Tips

**Be specific in prompts:**

```bash
# Vague
/anya-constitution task app

# Specific
/anya-constitution Task manager for freelancers with multiple clients.
Need projects by client, time tracking, monthly reports, PDF invoicing.
No real-time collaboration or payments.
```

**Use context when needed:**

```bash
/anya-task login prioritize security over speed
```

**Trust the pipeline:**
- Each skill validates against the previous outputs
- Gates catch contradictions early
- Anti-patterns are listed in each skill's frontmatter

**Don't skip the foundation:**
- Constitution → Stack → Plan, in order
- Skipping causes rework later

## Output Files

```
anya/
├── constitution.md    # Vision, rules, scope
├── stack.md           # Technologies + testing + commands
├── plan.md            # Specs in phases
└── specs/
    ├── 001-auth/
    │   ├── spec.md
    │   └── tasks.md
    ├── 002-login/
    │   ├── spec.md
    │   └── tasks.md
    └── ...
```

All files are git-trackable and human-readable.

For existing flat specs, move each `<name>.md` / `<name>.tasks.md` pair into a
numbered folder as `spec.md` / `tasks.md`. Use the current plan order for the
initial migration; preserve existing numbered folders, append unused numbers,
and update affected links and references. Keep content and task checkboxes;
resolve conflicts before moving files and never overwrite a destination.

## Next Steps

- [README.md](./README.md) — framework overview
- [CHANGELOG.md](./CHANGELOG.md) — version history
- Explore `.anya/<skill>/SKILL.md` for the full instructions
