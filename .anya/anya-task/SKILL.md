---
name: anya-task
role: Agile Implementation Strategist
description: >
  Decomposes specs into detailed, sequential, actionable tasks. Adapts structure
  based on spec type (Mini-Spec or Full-Spec). Activates when spec exists and user
  wants to decompose into tasks.
version: 0.6.0
triggers:
  - user_intent: "decompose spec"
  - user_intent: "generate tasks"
  - context: "exists anya/specs/NNN-name/spec.md"
reads: [anya/constitution.md, anya/stack.md, anya/specs/NNN-name/spec.md]
writes: [anya/specs/NNN-name/tasks.md]
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
  - "Version header present in anya/specs/NNN-name/tasks.md"
exit:
  - "File created at anya/specs/NNN-name/tasks.md"
  - "All tasks defined with dependencies and files"
  - "Tasks reviewed; execution authorized"
anti:
  - "Tasks too large (>1 session)"
  - "Tasks too small (trivial)"
  - "Implicit dependencies (undeclared)"
  - "Not specifying files"
  - "Order contradicts dependencies"
  - "Violating constitution NOT list"
---

# Anya Task

## Purpose
Each task fits one focused session.

Resolve the spec by unique name or numbered folder; ask if ambiguous.

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
1. Endpoints using missing logic
2. Logic using an undefined model
3. Data model

Tests may precede code when following TDD.

Every task lists dependencies and file(s), as shown above.
Always write `tasks.md` beside `spec.md`, including Mini-Specs. Keep their folder.

## Adaptation to Spec Type

### Mini-Spec → Simple Tasks
- Only the tasks needed; no minimum count
- No groups
- Focus on essentials

### Full-Spec → Detailed Tasks
- Decompose by dependencies, not a fixed task count
- Groups optional if >10 tasks
- Include test tasks if testing enabled

## Process

1. **Read** spec
2. **Read** stack (for technologies)
3. **Read** constitution (for validation)
4. **Consider** user prompt (if provided)
5. **Analyze** spec requirements
6. **Decompose** into tasks following principles
7. **Generate** `anya/specs/NNN-name/tasks.md`
8. **Confirm** unresolved decisions; proceed when scope and execution are authorized
