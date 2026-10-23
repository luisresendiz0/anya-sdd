---
name: anya-plan
role: Strategic Delivery Lead
description: >
  Organizes small deliveries into evolving phases. Generates anya/plan.md.
  Activates when stack exists and user wants
  to plan implementation.
version: 0.6.0
triggers:
  - user_intent: "plan implementation"
  - user_intent: "organize specs"
  - context: "exists anya/stack.md AND no anya/plan.md"
reads: [anya/constitution.md, anya/stack.md]
writes: [anya/plan.md]
next: anya-spec
gates:
  - "Plan coherent with constitution and stack"
  - "Specs in logical order (dependencies resolved)"
  - "Each spec has name + description"
  - "No duplicate specs"
  - "Covers all constitution features"
  - "Phases defined (1-N based on size)"
  - "Explicit scope changes reconciled with constitution and stack"
  - "Version header bumped on re-plan or progress update"
exit:
  - "User approves plan"
  - "File created at anya/plan.md"
anti:
  - "Illogical order (reports before data)"
  - "Specs too large (>3 sessions) or small (trivial)"
  - "Ignoring user prompt without explanation"
  - "Unnecessary phases for small projects"
  - "Duplicating functionality"
---

# Anya Plan

## Purpose
Create ordered list of specs in phases. Guide, not contract: evolves as project changes.

## Planning Rules
Keep future work as short backlog entries; detail specs just before implementation.
Each spec delivers a small, usable increment. Reprioritize after user feedback.
Respect constitution and stack; reconcile explicit user changes with affected
documents rather than rejecting them because an older decision differs.

## Output Structure

Format freely — this is a guide, not a template to copy verbatim.

```markdown
# Project Plan
> version: 1 · updated: <YYYY-MM-DD>

## Summary
<Brief: plan logic and phase organization>

## Phases

### Phase 1: <name>
<What this phase achieves>

**Specs:**
1. <spec-name> - <1-2 line description>
2. <spec-name> - <1-2 line description>

### Phase 2: <name>
...

## Progress

| # | Spec | Status |
|---|------|--------|
| 1 | auth-basic | ○ pending |
| 2 | login | ○ pending |
| 3 | task-crud | ○ pending |

**Legend:** ✓ completed | ◐ in progress | ○ pending
```

## Phase Guidelines

**Small project (1 phase):**
```
Phase 1: Core
1. setup
2. main-crud
3. reports
```

**Medium project (2-3 phases):**
```
Phase 1: Foundations
1. auth-basic
2. login

Phase 2: Core
3. main-feature
4. reports
```

**Large project (4+ phases):**
```
Phase 1: Foundations
Phase 2: Core features
Phase 3: Advanced features
Phase 4: Optimization
```

## Spec Granularity

Each spec should be:
- **1-3 work sessions** to implement
- **Independent** (no future spec dependencies)
- **Testable** (if testing enabled)

✅ Good: `login` (clear, bounded, testable)
❌ Bad: `entire-system` (too large) or `reset-button` (too small)

## Logical Order

✅ Good:
1. auth-basic (foundation)
2. login (first interaction)
3. task-crud (core)
4. reports (consumes task data)

❌ Bad:
1. reports (no data yet)
2. task-crud (no auth)
3. auth-basic (should be first)

## Process

1. **Read** constitution and stack
2. **Consider** user prompt (if provided)
3. **Propose** phases with specs
4. **Ask** user:
   - Order logical?
   - Missing specs?
   - Unnecessary specs?
5. **Adjust** based on feedback
6. **Generate** `anya/plan.md`
7. **Confirm** with user
