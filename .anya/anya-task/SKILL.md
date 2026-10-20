---
name: anya-task
role: Agile Implementation Strategist
description: >
  Decomposes specs into detailed, sequential, actionable tasks. Adapts structure
  based on spec type (Mini-Spec or Full-Spec). Activates when spec exists and user
  wants to decompose into tasks.
version: 0.5.0
triggers:
  - user_intent: "decompose spec"
  - user_intent: "generate tasks"
  - context: "exists anya/specs/<name>.md"
reads: [anya/constitution.md, anya/stack.md, anya/specs/<name>.md]
writes: [anya/specs/<name>.tasks.md]
next: anya-implement
gates:
  - "All tasks together cover entire spec"
  - "Tasks in logical order"
  - "Each task has explicit dependencies"
  - "Each task specifies file(s) to create/modify"
  - "Adequate granularity (1 session per task)"
  - "If anya/stack.md declares testing, includes test tasks"
  - "Completion criteria clear"
  - "Coherent with constitution (no NOT violations)"
  - "Coherent with stack (uses defined tech)"
  - "Version header present in anya/specs/<name>.tasks.md"
exit:
  - "File created at anya/specs/<name>.tasks.md"
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

Format freely — this is a guide, not a template to copy verbatim.

### Basic (Always Present)

```markdown
# Tasks: <spec name>
> version: 1 · updated: <YYYY-MM-DD>

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
7. **Generate** `anya/specs/<name>.tasks.md`
8. **Confirm** with user
