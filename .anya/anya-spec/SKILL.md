---
name: anya-spec
role: Product-Minded Tech Lead
description: >
  Generates self-contained, end-to-end vertical slice specifications. Adapts between
  Complete Vertical Slice Specs (for medium/large features) and Flexible Lightweight Specs
  (for fixes, evolutives, and small changes). Enforces live verification steps and runnable deliverables.
version: 0.7.0
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
  - "Represents an End-to-End Vertical Slice (or targeted atomic fix/evolutive)"
  - "Spec defines tangible User / Functional Value"
  - "Specifies live interactive verification steps (how to test in real time)"
  - "Identifies E2E layers involved (Interface/UI/CLI, Logic, Data/State)"
  - "Acceptance criteria clear and testable"
  - "Explicit exclusions (What it does NOT include)"
  - "If anya/stack.md declares testing, includes required test cases"
  - "Respects constitution NOT list"
  - "Version header present in anya/specs/NNN-name/spec.md"
exit:
  - "Spec generated at anya/specs/NNN-name/spec.md"
  - "All required sections complete"
  - "User approves spec"
anti:
  - "Horizontal specs (e.g., 'database only', 'backend only', 'unintegrated UI')"
  - "Specs without live verification instructions"
  - "Specs that leave the application in an unrunnable state"
  - "Over-engineered full specs for a small fix or minor evolutive change"
  - "Vague acceptance criteria ('must work reliably')"
  - "Missing NOT include section"
  - "Violating constitution NOT list"
---

# Anya Spec

## Purpose
Define the precise functional contract and acceptance criteria for an End-to-End Vertical Slice or targeted evolutionary increment.

## Modes

**Next spec from plan:** `/anya-spec next`
- Pick next pending vertical slice from plan.
- Generate specification adhering to vertical slice standards.

**Specific spec:** `/anya-spec <name>`
- Generate spec by name (must exist in plan).

**New spec / Evolutionary change:** `/anya-spec <description>`
- Clarify missing scope, criteria, or exclusions only if needed.
- Generate spec, then propose updating the plan.

**Fix or Minor Evolutive:** `/anya-spec fix <description>` or `/anya-spec update <name>`
- Select the flexible lightweight spec format to resolve the issue with minimal ceremony.
- Preserve unchanged parts; bump version header.

## Storage

Specs live in `anya/specs/NNN-name/spec.md` with tasks in `tasks.md` beside them.
New folders use the highest existing prefix + 1 (padded to at least 3 digits: `001`, `002`, ...). Never renumber existing folders.

## Spec Types: Proportional Design

Adapt the spec size based on the nature of the deliverable:

| Type | When to Use | Structure |
|------|-------------|-----------|
| **Complete Vertical Slice Spec** | New features, medium/large projects, Walking Skeleton | Full E2E layers, interface contract, data changes, live test steps |
| **Flexible Lightweight Spec** | Fixes, minor evolutives, quick tweaks, local refinements | Context, targeted change, live verification, exclusions |

Both templates below are guides — format freely to fit project needs without losing critical gates.

---

### 1. Complete Vertical Slice Spec (Medium/Large Projects)

Use for new functional slices and feature increments that span the stack.

````markdown
# Spec NNN: <Spec Name>
> version: 1 · updated: <YYYY-MM-DD>

## 1. Context & User Value
<Why this exists, the specific user problem it solves, and what the user can do once implemented.>

## 2. End-to-End Scope (Vertical Layers)
- **Interface / UI / CLI:** <What interactive elements or commands are added/modified>
- **Logic & Rules:** <Business logic, validations, state transitions>
- **Persistence & State:** <Data model additions, schema delta, in-memory or DB changes>

## 3. Acceptance Criteria
- [ ] <Condition 1: Given X, When Y, Then Z>
- [ ] <Condition 2: Valid input behavior>
- [ ] <Condition 3: Error handling behavior>

## 4. Live Verification Steps
<Exact interactive steps the user or agent will perform to verify the running application:>
1. Start the app: `<command from stack.md>`
2. Navigate or invoke: `<URL or CLI invocation>`
3. Perform action: `<click / enter input>`
4. Expected visual/terminal result: `<what should appear>`

## 5. Required Tests
<Only if anya/stack.md declares testing. Uses commands defined in stack.md.>
- Unit tests: `<critical test cases>`
- Integration / E2E: `<flow verification>`

## 6. What It Does NOT Include
- <Explicit exclusion 1: e.g. pagination deferred to spec 004>
- <Explicit exclusion 2: e.g. advanced styling>
````

---

### 2. Flexible Lightweight Spec (Fixes & Minor Evolutives)

Use for targeted bug fixes, evolutionary refinements, or minor enhancements.

```markdown
# Spec NNN: <Fix or Tweak Name>
> version: 1 · updated: <YYYY-MM-DD>

## 1. Context & Objective
<Problem statement, root cause or enhancement motivation.>

## 2. Targeted Changes & Expected Behavior
- <Exact change required in UI, logic, or state>
- <Expected behavior after fix>

## 3. Acceptance Criteria & Live Verification
- [ ] <Fix verification condition 1>
- [ ] <Fix verification condition 2>
**How to verify live:**
- Run: `<command>`
- Action: `<reproduce scenario and confirm fix>`

## 4. What It Does NOT Include
- <Out-of-scope aspects or related refactors not included in this patch>
```

---

## Constitution & Slicing Validation

Before generating, verify:
1. **Vertical slice integrity:** Does this slice touch whatever layers are necessary to be immediately interactive and testable? If it only touches a database or an uncalled internal service, reject and convert to a vertical slice.
2. **Constitution compliance:** Does it violate any rule or item in the constitution's "What We Will NOT Do" list? Flag any contradiction immediately.
