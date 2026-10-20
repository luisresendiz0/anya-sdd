# Quick Start Guide

End-to-end workflow using Anya-SDD v0.4.0.

## Setup

```bash
cp -r anya-sdd /your-project/
cd /your-project
```

## Phase 1: Foundation

### 1. Constitution

```bash
/anya-constitution Task manager for freelancers with multiple clients.
Need projects by client, time tracking, monthly reports, PDF invoicing.
No real-time collaboration or payments.
```

**Output:** `/anya/constitution.md`

Agent will:
- Extract info from prompt
- Ask only what's missing
- Flag doubts/contradictions
- Request approval

### 2. Stack

```bash
/anya-stack TypeScript + Express + PostgreSQL backend.
React + Tailwind frontend. Unit + E2E tests.
```

**Output:** `/anya/stack.md`

Agent will:
- Ask project type if unclear
- Ask missing items (ORM, deployment, etc.)
- Validate against constitution
- Request approval

### 3. Plan

```bash
/anya-plan
```

**Output:** `/anya/plan.md`

Agent will:
- Analyze constitution + stack
- Propose phases with specs
- Ensure logical order
- Request approval

**Example output:**
```markdown
Phase 1: Foundations
1. auth-basic - JWT setup
2. login - User login

Phase 2: Core
3. dashboard - Main view
4. client-crud - Client management
5. project-crud - Project management
6. task-crud - Task management
7. timer - Time tracking

Phase 3: Value
8. reports - Monthly reports
9. invoicing - PDF invoicing
```

## Phase 2: Iteration

### 4. Generate Spec

```bash
/anya-spec next
```

**Output:** `/anya/specs/<name>.md`

Agent will:
- Identify next pending spec
- Decide Mini-Spec vs Full-Spec
- Generate spec
- Request approval

**Mini-Spec** (simple): 3 sections (Context, Criteria, NOT include)
**Full-Spec** (complex): 9 sections (full detail)

### 5. Generate Tasks

```bash
/anya-task <spec-name>
```

**Output:** `/anya/specs/<name>.tasks.md`

Agent will:
- Decompose spec into tasks
- Each task: 1 session, specific file, explicit dependencies
- Request approval

**Example output:**
```markdown
## Tasks

- [ ] **Task 1:** Create User model
  - File: `src/models/user.ts`
  - Dependencies: None

- [ ] **Task 2:** Implement hashPassword
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

**Output:** Project code + updated plan

Agent will:
- Execute tasks in order
- Mark tasks complete
- Validate against spec/stack/constitution
- Run automatic verification
- Show progress
- Suggest future specs (if risks/improvements)

**Verification output:**
```
✓ Spec completed: login.md

Verification:
  ✓ Tasks: 8/8
  ✓ Spec: 5/5 requirements met
  ✓ Stack: consistent
  ✓ Constitution: consistent
  ✓ Tests: 6/6 pass

⚠ Risks: 1
💡 Improvements: 2

Suggested Specs:
1. Rate limiting → /anya-spec global rate limiting for auth endpoints...
2. Login logging → /anya-spec logging all login attempts...

Progress:
  ✓ auth-basic.md
  ✓ login.md ← just finished
  ○ register.md (next)

Continue? (yes/no)
```

### 7. Repeat

```bash
/anya-spec next
/anya-task <spec>
/anya-implement <spec>
```

Until plan is complete.

## Common Scenarios

### Generate specific spec

```bash
/anya-spec login
```

### Generate multiple specs

```bash
/anya-spec next 3
```

### Generate spec not in plan

```bash
/anya-spec rate limiting for login, max 5 attempts in 15 min
```

Agent will suggest updating plan.

### Update existing spec

```bash
/anya-spec update login to include Google OAuth
```

### Review broken implementation

```bash
/anya-implement review login
```

Agent will diagnose in cascade:
1. Tasks completed?
2. Spec fulfilled?
3. Stack consistent?
4. Constitution respected?

Then propose surgical fix.

### Re-verify spec

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

### Add new spec mid-project

```bash
/anya-spec <description>
```

Agent will suggest updating plan.

### Change constitution

1. Update `/anya/constitution.md` manually
2. Re-run `/anya-plan` to re-evaluate
3. Re-generate affected specs

### Change stack

1. Update `/anya/stack.md` manually
2. Re-generate affected specs

## Tips

**Be specific in prompts:**
```bash
# ❌ Vague
/anya-constitution task app

# ✅ Specific
/anya-constitution Task manager for freelancers with multiple clients.
Need projects by client, time tracking, monthly reports, PDF invoicing.
No real-time collaboration or payments.
```

**Use context when needed:**
```bash
/anya-task login prioritize security over speed
```

**Trust the pipeline:**
- Each skill validates against previous outputs
- Quality gates prevent bad propagation
- Anti-patterns detected early

**Don't skip foundation:**
- Constitution → Stack → Plan (in order)
- Each depends on the previous
- Skipping causes rework

## Output Files

```
/anya/
├── constitution.md    # Vision, rules, scope
├── stack.md           # Technologies + testing
├── plan.md            # Specs in phases
└── specs/
    ├── auth-basic.md
    ├── auth-basic.tasks.md
    ├── login.md
    ├── login.tasks.md
    └── ...
```

All files are git-trackable and human-readable.

## Next Steps

- Review [README.md](./README.md) for framework overview
- Check [CHANGELOG.md](./CHANGELOG.md) for version history
- Explore individual skill files for detailed instructions
