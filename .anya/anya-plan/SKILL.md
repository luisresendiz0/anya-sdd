---
name: anya-plan
role: Strategic Delivery Lead
description: >
  Organizes end-to-end vertical slices into evolving phases. Generates anya/plan.md.
  Enforces agile vertical deliverables; Spec 001 is always a functional Walking Skeleton
  leaving the application 100% executable and usable.
version: 0.7.0
triggers:
  - user_intent: "plan implementation"
  - user_intent: "organize specs"
  - context: "exists anya/stack.md AND no anya/plan.md"
reads: [anya/constitution.md, anya/stack.md]
writes: [anya/plan.md]
next: anya-spec
gates:
  - "Plan coherent with constitution and stack"
  - "Every spec is an End-to-End Vertical Slice (UI/CLI + logic + persistence + tests if declared)"
  - "Spec 001 is a functional Walking Skeleton delivering the most elemental user flow and minimal runnable setup"
  - "No horizontal layers as standalone specs (no 'setup DB', 'backend only', or 'UI mockup only')"
  - "Application remains 100% functional, runnable, and testable from the very first spec"
  - "Each spec defines clear user/functional value"
  - "Logical order with resolved dependencies"
  - "Covers all constitution features across phases"
  - "Version header bumped on re-plan or progress update"
exit:
  - "User approves plan"
  - "File created at anya/plan.md"
anti:
  - "Horizontal cascade specs (e.g., 'all DB first', 'backend only', 'frontend only')"
  - "Spec 001 as pure technical setup without runnable user-facing value"
  - "Specs that leave the application in an unrunnable or broken state"
  - "Specs too large (>1-2 sessions) or trivial without direct value"
  - "Illogical dependency order"
  - "Duplicating functionality across specs"
---

# Anya Plan

## Purpose
Decompose project features into an ordered sequence of small, functional, End-to-End Vertical Slices.

## Core Agile Principles

1. **Vertical Slices Only (Never Horizontal Waterfall):**
   Every spec must cut through all layers needed for that feature:
   - **Interface:** UI component, CLI command, or interactive consumer.
   - **Logic:** Business rules and processing.
   - **Persistence/State:** Storage, schema delta, or data models.
   - **Verification:** Live test steps and automated tests (if testing declared).
   Never create specs for isolated horizontal layers (e.g., "Create database schema", "Build API endpoints", "Design UI mockup"). Any technical infrastructure needed must be absorbed into the vertical slice that first requires it.

2. **Walking Skeleton as Spec 001:**
   The very first spec implements the simplest, most elemental end-to-end user journey. It absorbs the bare minimum application bootstrapping (scaffolding, build script, server start) so that upon completion of Spec 001, the application compiles, runs, and can be used interactively.

3. **100% Runnable at Every Step:**
   The application must never be left in a broken or non-executable state between specs. Each completed increment is fully usable and verifiable in real time.

4. **Evolutionary Delivery:**
   Keep the plan as a lightweight backlog; detail individual specs right before implementation. Adapt the plan based on live user feedback after each deliverable.

## Output Structure

Format freely — this is a guide, not a template to copy verbatim.

```markdown
# Project Plan
> version: 1 · updated: <YYYY-MM-DD>

## Summary
<Brief: delivery strategy and vertical slice roadmap>

## Phases

### Phase 1: <Name> (e.g. Walking Skeleton & Core Flow)
<What tangible capability the user gains in this phase>

**Specs:**
1. <spec-name> - <Deliverable / Functional Value: what the user can do end-to-end>
2. <spec-name> - <Deliverable / Functional Value: what the user can do end-to-end>

### Phase 2: <Name>
...

## Progress

| # | Spec | Entregable / Valor Funcional | Status |
|---|------|------------------------------|--------|
| 1 | <spec-name> | <User flow and tangible outcome> | ○ pending |
| 2 | <spec-name> | <User flow and tangible outcome> | ○ pending |

**Legend:** ✓ completed | ◐ in progress | ○ pending
```

## Spec Granularity Examples

✅ **Good (Vertical Slices):**
1. `001-task-create-view` — Walking Skeleton: bare-bones app setup + UI/CLI to create and list tasks with minimal persistence. Fully runnable.
2. `002-task-toggle-status` — Interactively toggle task completion status with immediate UI feedback and persisted state.
3. `003-task-search-filter` — Interactive search bar and filter controls + filtering logic.
4. `004-task-export-csv` — Export button/command generating and downloading CSV file.

❌ **Bad (Horizontal Cascade):**
1. `001-project-setup` — Pure scaffolding, no user-visible functionality.
2. `002-database-schema` — Tables created, but nothing uses or displays them.
3. `003-backend-endpoints` — API exists, but no client or human interface to interact with it.
4. `004-frontend-ui` — UI built last; app was broken for the first three specs.

## Process

1. **Read** constitution and stack.
2. **Identify** the most elemental user journey for Spec 001 (Walking Skeleton).
3. **Decompose** remaining features into incremental vertical slices.
4. **Verify** that no spec represents an isolated horizontal layer.
5. **Propose** plan with phases and functional deliverables.
6. **Ask** user for validation.
7. **Generate** `anya/plan.md`.
8. **Confirm** with user.
