---
name: anya-spec
role: Product-Minded Tech Lead
description: >
  Generates specific, self-contained specs. Decides Mini-Spec (3 sections) vs
  Full-Spec (9 sections) based on complexity. Activates when plan exists and user
  wants to generate next spec or specific spec.
version: 0.4.0
triggers:
  - user_intent: "generate next spec"
  - user_intent: "generate specific spec"
  - user_intent: "update existing spec"
  - context: "exists /anya/plan.md"
reads: [/anya/constitution.md, /anya/stack.md, /anya/plan.md]
writes: [/anya/specs/<name>.md]
next: anya-task
gates:
  - "Coherent with constitution and stack"
  - "Self-contained (understandable alone)"
  - "3 essential sections present (Context, Criteria, NOT include)"
  - "Conditional sections only if applicable"
  - "Acceptance criteria clear and verifiable"
  - "If testing enabled, includes required tests (Full-Spec)"
  - "Spec type (Mini/Full) matches complexity"
  - "Respects constitution NOT list"
exit:
  - "Spec generated at /anya/specs/<name>.md"
  - "All required sections complete"
  - "User approves spec"
anti:
  - "Full-Spec for simple tasks"
  - "Mini-Spec for complex features"
  - "Vague acceptance criteria ('must work well')"
  - "Missing NOT include section"
  - "Violating constitution NOT list"
  - "Depends on unimplemented specs"
---

# Anya Spec

## Role
**Product-Minded Tech Lead** - Translates requirements into actionable specs. Balances detail with simplicity.

## Purpose
Generate specific, self-contained specs. Source of truth for implementation.

## Modes

**Next spec:** `/anya-spec next`
- Identify next pending spec from plan
- Generate it

**Multiple specs:** `/anya-spec next 3`
- Generate next 3 pending specs

**Specific spec:** `/anya-spec login`
- Generate spec by name (must be in plan)

**New spec:** `/anya-spec rate limiting for login, max 5 attempts in 15 min`
- Generate spec not in plan
- Suggest updating plan

**Update spec:** `/anya-spec update login to include Google OAuth`
- Re-generate preserving unchanged parts
- Show diff summary

## Spec Type Decision

Auto-decide based on:

| Factor | Mini-Spec | Full-Spec |
|--------|-----------|-----------|
| Complexity | Simple (1-2 changes) | Complex (multiple changes, architecture) |
| Impact | Local (no other parts) | Global (multiple components) |
| Description | "Fix bug in..." | "Implement feature for..." |

If unsure, ask:
```
Mini-Spec (simple) or Full-Spec (complex)?
```

## Mini-Spec Structure (3 sections)

```markdown
# <Spec name>

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

```markdown
# <Spec name>

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
```typescript
<Interface or schema if applicable>
```

## Required Tests
<Only if stack defines testing>
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
```

**Use for:** Complex features, architecture changes, external integrations, large refactorings

## Process

### For Plan Specs (Modes 1-3)
1. **Read** plan
2. **Identify** pending specs
3. **Ask** confirmation: "Generate spec for [name]? (yes/no)"
4. **Generate** spec

### For New Spec (Mode 4)
1. **Generate** spec with description
2. **Suggest**: "Not in plan. Update plan? (yes/no)"
3. **Update** plan if accepted

### For Update Spec (Mode 5)
1. **Read** existing spec
2. **Identify** changes
3. **Re-generate** preserving unchanged parts
4. **Show** diff summary

## Quality Gates

- [ ] Coherent with constitution and stack
- [ ] Self-contained
- [ ] 3 essential sections present
- [ ] Conditional sections only if applicable
- [ ] Acceptance criteria clear and verifiable
- [ ] Tests included if stack defines testing (Full-Spec)
- [ ] Spec type matches complexity
- [ ] File created at `/anya/specs/<name>.md`

## Constitution Validation

Before generating, check against constitution:
```
Constitution: "No Slack integration"
Proposed: "Slack integration for notifications"
→ REJECT: Violates constitution
```

## Examples

### Mini-Spec (Simple)
```
User: /anya-spec next

Agent: Reading plan...

Next pending: forgot-password (Phase 2)
Simple feature → Mini-Spec

Generate forgot-password spec? (yes/no)

User: yes

Agent: [Generates /anya/specs/forgot-password.md]

✓ Spec created: forgot-password.md (Mini-Spec)
- Basic email recovery flow
- One-time token, 1-hour expiration
- 3 sections

Continue with next? (yes/no)
```

### Full-Spec (Complex)
```
User: /anya-spec 2FA for admin users

Agent: Complex feature (security + multiple flows) → Full-Spec

[Generates /anya/specs/2fa-admin.md]

✓ Spec created: 2fa-admin.md (Full-Spec)
- TOTP-based 2FA
- 9 sections (API, data model, tests)
- Google Authenticator compatible

Not in plan. Update plan? (yes/no)

User: yes

Agent: [Updates /anya/plan.md]
✓ Plan updated
```

### Update Spec
```
User: /anya-spec update login to include Google OAuth

Agent: Reading existing spec...

Re-generating with Google OAuth...

✓ Spec updated: login.md

Changes:
+ Login with Google OAuth
+ Account linking with existing email
+ E2E tests for OAuth flow

Continue? (yes/no)
```

## Next
```
/anya-task <spec-name>
```
