---
name: anya-task
role: Agile Implementation Strategist
description: >
  Decomposes vertical slice specs into atomic, ordered, actionable tasks.
  Tracks real-time execution states ([ ], [/], [x]) and mandates an explicit
  final task for live compilation, startup, and interactive verification.
version: 0.7.0
triggers:
  - user_intent: "decompose spec"
  - user_intent: "generate tasks"
  - context: "exists anya/specs/NNN-name/spec.md"
reads: [anya/constitution.md, anya/stack.md, anya/specs/NNN-name/spec.md]
writes: [anya/specs/NNN-name/tasks.md]
next: anya-implement
gates:
  - "All tasks together integrate the entire vertical slice"
  - "Tasks ordered logically from foundations to interactive interface"
  - "Task progress statuses supported: [ ] pending, [/] in progress, [x] completed"
  - "Final task is explicitly: Compilación, arranque y prueba interactiva en vivo"
  - "Each task specifies file(s) to create/modify and dependencies"
  - "Granularity is atomic (one focused session per task)"
  - "If anya/stack.md declares testing, includes test tasks"
  - "Coherent with constitution and stack"
  - "Version header present in anya/specs/NNN-name/tasks.md"
exit:
  - "File created at anya/specs/NNN-name/tasks.md"
  - "All tasks defined with dependencies, files, and final live test task"
  - "Tasks reviewed; execution authorized"
anti:
  - "Missing final live verification task"
  - "Tasks not specifying concrete file paths"
  - "Horizontal decomposition that leaves the slice non-runnable"
  - "Tasks too large (>1 session) or trivial without substance"
  - "Implicit or circular dependencies"
  - "Batch-marking tasks without real-time state tracking"
---

# Anya Task

## Purpose
Decompose a vertical slice specification into ordered, atomic implementation tasks, tracking live states (`[ ]`, `[/]`, `[x]`) and ending with an interactive verification task.

Resolve the spec by unique name or numbered folder (`001-name`); ask if ambiguous.

## Modes

**Standard:** `/anya-task <spec-name>`
- Decompose based on spec requirements and vertical slice scope.

**With context:** `/anya-task <spec-name> <context>`
- Consider additional context (e.g., "prioritize TDD", "start from CLI entry point").

## Output Structure

Format freely — this is a guide, not a template to copy verbatim.

```markdown
# Tasks: <spec name>
> version: 1 · updated: <YYYY-MM-DD>

## Summary
<X tasks. Vertical slice deliverable: brief explanation of user value.>

## Tasks

- [ ] **Task 1:** <Clear atomic action>
  - File: `<path>`
  - Description: <What to do>
  - Dependencies: <None or Task X>

- [ ] **Task 2:** <Clear atomic action>
  - File: `<path>`
  - Description: <What to do>
  - Dependencies: <Task 1>

...

- [ ] **Task N (Final):** Compilación, arranque y prueba interactiva en vivo
  - File: `<entry point / test files>`
  - Description: Verificar que la aplicación compila sin errores, arranca con el comando definido en stack.md, pasa las pruebas (si aplican) y responde a los pasos de verificación en vivo del spec.
  - Dependencies: <All previous tasks>

## Completion Criteria
- [ ] All tasks marked complete [x]
- [ ] Application compiles and runs cleanly
- [ ] Live interactive test steps executed successfully
- [ ] Spec acceptance criteria met
```

## Task Principles

### 1. Real-Time Status Tracking
Tasks communicate progress dynamically during implementation:
- `[ ]` **Pending:** Not yet started.
- `[/]` **In Progress:** Actively being worked on right now.
- `[x]` **Completed:** Verified and implemented. Never batch-mark at the end.

### 2. Vertical Slice Order
Within a slice, order tasks to build the feature progressively towards interactive execution:
1. **Data / State Delta:** Minimum schema or state store needed for this slice.
2. **Logic & Rules:** Business functions and validations.
3. **Interface / Entry Point:** UI components, endpoints, or CLI commands.
4. **Automated Tests:** Unit/integration tests (may precede code if doing TDD).
5. **Final Live Verification Task:** Compilation, runtime startup, and manual interactive trial.

### 3. Mandatory Final Live Test Task
Every `tasks.md` MUST end with an explicit task dedicated to compiling, running, and verifying the application interactively in real time.

## Adaptation to Spec Type

- **Complete Vertical Slice Spec:** Detailed tasks covering persistence, logic, interface, tests, and live verification.
- **Flexible Lightweight Spec (Fixes/Tweaks):** Minimal atomic tasks (e.g. 2-3 tasks: target code change, test assertion, and final live verification).

## Process

1. **Read** spec, stack, and constitution.
2. **Identify** all layers involved in the vertical slice.
3. **Decompose** into atomic tasks specifying files and dependencies.
4. **Append** the mandatory final task for compilation and live interactive verification.
5. **Generate** `anya/specs/NNN-name/tasks.md`.
6. **Confirm** with user.
