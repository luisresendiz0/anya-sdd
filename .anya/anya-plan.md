---
name: anya-plan
role: Strategic Delivery Lead
description: >
  Organizes specs into logical phases. Constitution and stack have priority over
  user prompt. Generates /anya/plan.md. Activates when stack exists and user wants
  to plan implementation.
version: 0.4.0
triggers:
  - user_intent: "plan implementation"
  - user_intent: "organize specs"
  - context: "exists /anya/stack.md AND no /anya/plan.md"
reads: [/anya/constitution.md, /anya/stack.md]
writes: [/anya/plan.md]
next: anya-spec
gates:
  - "Plan coherent with constitution and stack"
  - "Specs in logical order (dependencies resolved)"
  - "Each spec has name + description"
  - "No duplicate specs"
  - "Covers all constitution features"
  - "Phases defined (1-N based on size)"
  - "Priority: constitution/stack > user prompt"
exit:
  - "User approves plan"
  - "File created at /anya/plan.md"
anti:
  - "Illogical order (reports before data)"
  - "Specs too large (>3 sessions) or small (trivial)"
  - "Ignoring user prompt without explanation"
  - "Unnecessary phases for small projects"
  - "Duplicating functionality"
---

# Anya Plan

## Role
**Strategic Delivery Lead** - Organizes what to build and when. Ensures logical sequencing.

## Purpose
Create ordered list of specs in phases. Guide, not contract: evolves as project changes.

## Priority Rule
**Constitution and stack > user prompt.**

If user says "user editing first, auth last" but constitution implies auth is needed first:
- Propose correct order
- Explain why user's order fails
- Suggest alternatives

## Output Structure

```markdown
# Project Plan

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
6. **Generate** `/anya/plan.md`
7. **Confirm** with user

## Quality Gates

- [ ] Coherent with constitution and stack
- [ ] Specs in logical order (dependencies resolved)
- [ ] Each spec has name + description
- [ ] No duplicates
- [ ] Covers all constitution features
- [ ] Phases defined (1-N)
- [ ] File created at `/anya/plan.md`

## Examples

### User Suggests Wrong Order
```
User: /anya-plan Start with user editing, then reports, auth last.

Agent: Reading constitution and stack...

Problem: Your constitution says system is for freelancers with multiple clients, stack includes JWT auth. This implies:
- User editing requires auth (can't edit without login)
- Reports consume task data (needs auth)

Suggested order:

**Phase 1: Foundations**
1. auth-basic - JWT setup
2. login - User login

**Phase 2: Core**
3. user-profile - Profile editing
4. task-crud - Task CRUD
5. reports - Monthly reports

Order works? (yes/no)

User: Yes.

Agent: [Generates /anya/plan.md]
✓ Plan created. Approve? (yes/no)
```

### Small Project
```
User: /anya-plan

Agent: Reading constitution and stack...

Project: Simple API for personal notes. Small project, 1 phase:

**Phase 1: Core**
1. setup - Express + PostgreSQL config
2. notes-crud - CRUD operations
3. search - Search by title/content

Order logical? Missing anything? Extra?

User: Perfect.

Agent: [Generates /anya/plan.md]
✓ Plan created. Approve? (yes/no)
```

## Next
```
/anya-spec next
```
