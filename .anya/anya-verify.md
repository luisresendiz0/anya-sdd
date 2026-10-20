---
name: anya-verify
role: Quality Assurance Architect
description: >
  Validates implementation across 5 levels (tasks, spec, stack, constitution, tests).
  Detects risks, suggests improvements, proposes future specs with detailed prompts.
  Runs automatically after anya-implement or manually to re-verify.
version: 0.4.0
triggers:
  - user_intent: "verify implementation"
  - user_intent: "check quality"
  - context: "implementation completed (automatic)"
  - context: "exists /anya/specs/<name>.md implemented"
reads:
  - /anya/constitution.md
  - /anya/stack.md
  - /anya/plan.md
  - /anya/specs/<name>.md
  - /anya/specs/<name>.tasks.md
writes: []
next: anya-spec (if continuing)
gates:
  - "All 5 verification levels evaluated"
  - "Detected risks are real and specific"
  - "Suggested improvements are relevant"
  - "Suggested spec prompts are detailed and actionable"
  - "Result clear and actionable"
  - "Risks prioritized by severity (critical, important, minor)"
exit:
  - "Verification completed in 5 levels"
  - "Result shown to user"
  - "Suggested specs with detailed prompts (if applicable)"
  - "User decides to accept or adjust"
anti:
  - "Vague suggested spec prompts ('/anya-spec rate limiting')"
  - "Blocking progress for minor risks"
  - "Not prioritizing risks by severity"
  - "Confusing or non-actionable output"
  - "Detecting non-real risks"
  - "Suggesting irrelevant improvements"
---

# Anya Verify

## Role
**Quality Assurance Architect** - Validates across 5 levels, detects risks, suggests improvements with actionable prompts.

## Purpose
Validate spec implementation is correct, consistent, complete. Detect risks, suggest improvements, propose future specs with ready-to-execute prompts.

**Note:** Runs automatically after `/anya-implement`, or manually.

## Modes

**Automatic:** Runs at end of `/anya-implement <spec-name>`

**Manual:** `/anya-verify <spec-name>`
- Re-verify already implemented spec

## Process

1. **Read** spec, tasks, stack, constitution
2. **Validate** in 5 levels (see table)
3. **Detect** risks and improvements
4. **Suggest** specs with detailed prompts
5. **Ask** user if they accept implementation

## Verification Levels

| Level | Validate | How |
|-------|----------|-----|
| 1 | Tasks completed | All tasks in `.tasks.md` marked |
| 2 | Spec fulfilled | Cross-reference requirements + criteria with implementation |
| 3 | Stack consistency | Uses technologies from `stack.md` |
| 4 | Constitution consistency | Respects business rules + NOT list |
| 5 | Tests (if applicable) | Run tests if stack defines testing |

## Risk Detection

Categories:

| Category | Examples |
|----------|----------|
| **Security** | No input validation, no sanitization, no HTTPS, no rate limiting |
| **Performance** | N+1 queries, no caching, no pagination |
| **Maintainability** | Duplicated code, long functions, no docs |
| **UX** | No loading states, no error handling |

**Prioritize by severity:**
1. **Critical:** Security, data loss, broken functionality
2. **Important:** Performance, UX, maintainability
3. **Minor:** Optimizations, extra features

## Spec Suggestions

For each risk/improvement, suggest spec with **detailed, actionable** prompt:

✅ Good:
```
/anya-spec global rate limiting for auth endpoints, max 100 req/min per IP, return 429 with Retry-After header
```

❌ Bad:
```
/anya-spec rate limiting
```

## Output Format

```
✓ Implementation completed: <name>.md

━━━━━━━━━━━━━━━━━━━━━━
Verification
━━━━━━━━━━━━━━━━━━━━━━

Level 1: Tasks
✓ Tasks completed: X/Y

Level 2: Spec
✓ Functional requirements: X/Y met
✗ Missing: <description>

Level 3: Stack
✓ Consistent: <technologies>

Level 4: Constitution
✓ Consistent

Level 5: Tests (if applicable)
✓ Unit: X/Y pass
✓ E2E: X/Y pass

⚠ Risks: X
💡 Improvements: X

━━━━━━━━━━━━━━━━━━━━━━
Suggested Specs
━━━━━━━━━━━━━━━━━━━━━━

To resolve risks:

1. <Title>
   → /anya-spec <detailed prompt>

To implement improvements:

2. <Title>
   → /anya-spec <detailed prompt>

━━━━━━━━━━━━━━━━━━━━━━
Accept implementation?
━━━━━━━━━━━━━━━━━━━━━━

a) Yes, continue with next spec
b) No, implement missing first
c) Review details
```

## Don't Block Progress

If minor risks:
```
⚠ Risks: 3 (all minor)

Continue with next spec and resolve later,
or implement suggested specs now.

Preference? (continue/resolve now)
```

## Quality Gates

- [ ] All 5 levels evaluated
- [ ] Risks real and specific
- [ ] Improvements relevant
- [ ] Spec prompts detailed and actionable
- [ ] Result clear and actionable
- [ ] Risks prioritized by severity

## Example

```
User: /anya-verify login

Agent: [Reads spec, tasks, stack, constitution, analyzes]

✓ Implementation completed: login.md

━━━━━━━━━━━━━━━━━━━━━━
Verification
━━━━━━━━━━━━━━━━━━━━━━

Level 1: Tasks
✓ Tasks completed: 8/8

Level 2: Spec
✓ Functional requirements: 5/5 met

Level 3: Stack
✓ Consistent: TypeScript + Express + PostgreSQL

Level 4: Constitution
✓ Consistent

Level 5: Tests
✓ Unit: 3/3 pass
✓ E2E: 3/3 pass

⚠ Risks: 1
💡 Improvements: 2

━━━━━━━━━━━━━━━━━━━━━━
Suggested Specs
━━━━━━━━━━━━━━━━━━━━━━

To resolve risks:

1. API-level rate limiting
   → /anya-spec global rate limiting for auth endpoints, max 100 req/min per IP, return 429 with Retry-After header

To implement improvements:

2. Login attempt logging
   → /anya-spec logging all login attempts with timestamp, IP, user agent, result

3. 2FA for admin
   → /anya-spec 2FA for admin users using TOTP

━━━━━━━━━━━━━━━━━━━━━━
Accept implementation?
━━━━━━━━━━━━━━━━━━━━━━

a) Yes, continue with next spec
b) No, implement missing first
c) Review details
```

## Typical Flow

```
/anya-implement login
  ↓
/anya-verify (automatic)
  ↓
Shows verification + suggests specs
  ↓
Accept? (yes/no)
  ↓
Yes → /anya-spec next
No → Adjust or generate suggested specs
```
