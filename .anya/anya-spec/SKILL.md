---
name: anya-spec
role: Product-Minded Tech Lead
description: >
  Generates specific, self-contained specs. Decides Mini-Spec (3 sections) vs
  Full-Spec (9 sections) based on complexity. Activates when plan exists and user
  wants to generate next spec or specific spec.
version: 0.6.0
triggers:
  - user_intent: "generate next spec"
  - user_intent: "generate specific spec"
  - user_intent: "update existing spec"
  - context: "exists anya/plan.md"
reads: [anya/constitution.md, anya/stack.md, anya/plan.md]
writes: [anya/specs/NNN-name/spec.md]
next: anya-task
gates:
  - "Coherent with constitution and stack"
  - "Self-contained (understandable alone)"
  - "3 essential sections present (Context, Criteria, NOT include)"
  - "Conditional sections only if applicable"
  - "Acceptance criteria clear and verifiable"
  - "If anya/stack.md declares testing, includes required tests (Full-Spec)"
  - "Spec type (Mini/Full) matches complexity"
  - "Respects constitution NOT list"
  - "New specs outside the plan are defined by asking, not assumed"
  - "Version header present in anya/specs/NNN-name/spec.md"
exit:
  - "Spec generated at anya/specs/NNN-name/spec.md"
  - "All required sections complete"
  - "User approves spec"
anti:
  - "Full-Spec for simple tasks"
  - "Mini-Spec for complex features"
  - "Vague acceptance criteria ('must work well')"
  - "Missing NOT include section"
  - "Violating constitution NOT list"
  - "Depends on unimplemented specs"
  - "Generating a new spec without asking what is missing"
---

# Anya Spec

## Purpose
Implementation source of truth.

## Modes

**Next spec:** `/anya-spec next`
- Identify next pending spec from plan
- Generate it

**Multiple specs:** `/anya-spec next 3`
- Generate next 3 pending specs only when explicitly requested

**Specific spec:** `/anya-spec login`
- Generate spec by name (must be in plan)

**New spec:** `/anya-spec rate limiting for login, max 5 attempts in 15 min`
- Ask only what is missing to define it (scope, criteria, exclusions)
- Generate spec, then suggest updating the plan

**Update spec:** `/anya-spec update login to include Google OAuth`
- Re-generate in the same folder, preserving unchanged parts
- Show diff summary

## Storage

Use `anya/specs/NNN-name/spec.md`; tasks share its folder. Reuse matching folders.
New folders take the highest existing prefix + 1, padded to at least three digits
(start `001`). Never renumber. Resolve by unique name or folder; ask if ambiguous.

## Spec Type Decision

Default to Mini-Spec for the next usable increment; expand only for complexity:

| Factor | Mini-Spec | Full-Spec |
|--------|-----------|-----------|
| Complexity | Simple (1-2 changes) | Complex (multiple changes, architecture) |
| Impact | Local (no other parts) | Global (multiple components) |
| Description | "Fix bug in..." | "Implement feature for..." |

Both structures below are guides — format freely, not templates to copy verbatim.

## Mini-Spec Structure (3 sections)

```markdown
# <Spec name>
> version: 1 · updated: <YYYY-MM-DD>

## Context
<Why this exists, what problem it solves>

## Acceptance Criteria
- [ ] <Exact condition 1>
- [ ] <Exact condition 2>
- [ ] <Exact condition 3>

## What It Does NOT Include
- <Explicit exclusion 1>
- <Explicit exclusion 2>
```

**Use for:** Simple tasks, bug fixes, micro-features, basic UI components

## Full-Spec Structure (9 sections)

````markdown
# <Spec name>
> version: 1 · updated: <YYYY-MM-DD>

## Context
<Why this exists, what problem it solves>

## Functional Requirements
- <What it must do 1>
- <What it must do 2>

## Non-Functional Requirements
- <Performance/security/behavior 1>
- <Performance/security/behavior 2>

## API / Interface
```
<Endpoint or component definition>
```

## Data Model
<Interface or schema in the project's language, if applicable>

## Required Tests
<Only if anya/stack.md declares testing. Use the commands recorded there.>
```
Unit tests:
- <test case 1>

E2E tests:
- <test case 2>
```

## Acceptance Criteria
- [ ] <Condition 1>
- [ ] <Condition 2>

## Dependencies
- <Other spec or component 1>
- <Other spec or component 2>

## What It Does NOT Include
- <Exclusion 1>
- <Exclusion 2>
````

**Use for:** Complex features, architecture changes, external integrations, large refactorings

## Process

### For Plan Specs (Modes 1-3)
1. **Read** plan
2. **Identify** pending specs
3. **Confirm** only unresolved scope; reuse existing authorization
4. **Generate** spec

### For New Spec (Mode 4)
1. **Ask** what is needed to define it: scope, acceptance criteria, exclusions — only what the prompt doesn't answer
2. **Generate** spec
3. **Suggest**: "Not in plan. Update plan? (yes/no)"
4. **Update** plan if accepted

### For Update Spec (Mode 5)
1. **Read** existing spec
2. **Identify** changes
3. **Re-generate** preserving unchanged parts; bump version header
4. **Show** diff summary

## Constitution Validation

Before generating, check against constitution:
```
Constitution: "No Slack integration"
Proposed: "Slack integration for notifications"
→ Flag conflict; reconcile an explicit scope change before implementation
```
