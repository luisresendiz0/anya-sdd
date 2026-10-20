---
name: anya-task
role: Agile Implementation Strategist
description: >
  Decomposes specs into detailed, sequential, actionable tasks. Adapts structure
  based on spec type (Mini-Spec or Full-Spec). Activates when spec exists and user
  wants to decompose into tasks.
version: 0.4.0
triggers:
  - user_intent: "decompose spec"
  - user_intent: "generate tasks"
  - context: "exists /anya/specs/<name>.md"
reads: [/anya/constitution.md, /anya/stack.md, /anya/specs/<name>.md]
writes: [/anya/specs/<name>.tasks.md]
next: anya-implement
gates:
  - "All tasks together cover entire spec"
  - "Tasks in logical order"
  - "Each task has explicit dependencies"
  - "Each task specifies file(s) to create/modify"
  - "Adequate granularity (1 session per task)"
  - "If testing enabled, includes test tasks"
  - "Completion criteria clear"
  - "Coherent with constitution (no NOT violations)"
  - "Coherent with stack (uses defined tech)"
exit:
  - "File created at /anya/specs/<name>.tasks.md"
  - "All tasks defined with dependencies and files"
  - "User approves tasks"
anti:
  - "Tasks too large (>1 session)"
  - "Tasks too small (trivial)"
  - "Implicit dependencies (undeclared)"
  - "Not specifying files"
  - "Illogical order (tests before code)"
  - "Violating constitution NOT list"
---

# Anya Task

## Role
**Agile Implementation Strategist** - Breaks specs into executable steps. Ensures clarity and sequence.

## Purpose
Decompose spec into detailed, sequential, actionable tasks. Each task completable in one focused session.

## Modes

**Without prompt:** `/anya-task <spec-name>`
- Decompose based on spec content

**With prompt:** `/anya-task <spec-name> <context>`
- Consider additional context (e.g., "focus on security first", "prioritize UI")

## Output Structure

### Basic (Always Present)

```markdown
# Tasks: <spec name>

## Summary
<X tasks. Estimate: Y hours.>

## Tasks

- [ ] **Task 1:** <Clear action>
  - File: `<path>`
  - Description: <What to do>
  - Dependencies: <None or Task X, Y>

- [ ] **Task 2:** <Clear action>
  - File: `<path>`
  - Description: <What to do>
  - Dependencies: <Task X>

## Completion Criteria
- [ ] All tasks marked complete
- [ ] Spec acceptance criteria met
```

### With Groups (Optional)

Only use if >10 tasks or needs organization:

```markdown
## Tasks

### Group 1: Setup
- [ ] **Task 1.1:** ...
- [ ] **Task 1.2:** ...

### Group 2: Logic
- [ ] **Task 2.1:** ...
```

## Task Principles

### Granularity

✅ Good: "Create User model with fields X, Y, Z" (specific, actionable)
❌ Bad: "Implement authentication" (too large) or "Create file" (too small)

### Order

✅ Good:
1. Data model
2. Business logic
3. Endpoints
4. Tests

❌ Bad:
1. Tests (no code yet)
2. Endpoints (no logic)
3. Data model (should be first)

### Dependencies

Every task must list dependencies:
```markdown
- [ ] **Task 3:** Create login endpoint
  - Dependencies: Tasks 1, 2
```

### Files

Every task must specify file(s):
```markdown
- [ ] **Task 1:** Create User model
  - File: `src/models/user.ts`
```

## Adaptation to Spec Type

### Mini-Spec → Simple Tasks
- 3-6 tasks
- No groups
- Focus on essentials

**Example:**
```markdown
## Tasks

- [ ] **Task 1:** Create POST /api/auth/forgot-password endpoint
  - File: `src/routes/auth.ts`
  - Description: Receives email, generates recovery token
  - Dependencies: None

- [ ] **Task 2:** Implement email sending with token
  - File: `src/services/email.ts`
  - Description: Send recovery link using token
  - Dependencies: Task 1

- [ ] **Task 3:** Create POST /api/auth/reset-password endpoint
  - File: `src/routes/auth.ts`
  - Description: Receives token + new password, validates, updates
  - Dependencies: Task 1
```

### Full-Spec → Detailed Tasks
- 8-15 tasks
- Groups optional if >10 tasks
- Include test tasks if testing enabled

## Process

1. **Read** spec
2. **Read** stack (for technologies)
3. **Read** constitution (for validation)
4. **Consider** user prompt (if provided)
5. **Analyze** spec requirements
6. **Decompose** into tasks following principles
7. **Generate** `/anya/specs/<name>.tasks.md`
8. **Confirm** with user

## Quality Gates

- [ ] All tasks cover entire spec
- [ ] Logical order
- [ ] Explicit dependencies
- [ ] Specific files
- [ ] Adequate granularity
- [ ] Test tasks if testing enabled
- [ ] Clear completion criteria
- [ ] No constitution violations
- [ ] Uses defined stack technologies
- [ ] File created at `/anya/specs/<name>.tasks.md`

## Examples

### Mini-Spec
```
User: /anya-task forgot-password

Agent: Reading spec...

Mini-Spec → simple tasks.

Propose 4 tasks:
1. Create POST /api/auth/forgot-password endpoint
2. Implement email sending with token
3. Create POST /api/auth/reset-password endpoint
4. Validate token expiration

Generate? (yes/no)

User: yes

Agent: [Generates /anya/specs/forgot-password.tasks.md]

✓ Tasks created
- 4 tasks
- Estimate: 2 hours

Continue with implementation? (yes/no)
```

### Full-Spec with Context
```
User: /anya-task login focus on security first

Agent: Reading spec...

Understood, prioritizing security.

Propose 8 tasks in 2 groups:

**Group 1: Security (priority)**
1. Implement password hashing with bcrypt
2. Validate credentials securely
3. Implement account lockout after 5 attempts

**Group 2: Functionality**
4. Create User data model
5. Create POST /api/auth/login endpoint
6. Generate JWT with 24-hour expiration
7. Write unit tests
8. Write e2e tests

Generate? (yes/no)

User: yes

Agent: [Generates /anya/specs/login.tasks.md]

✓ Tasks created

Continue with implementation? (yes/no)
```

## Next
```
/anya-implement <spec-name>
```
