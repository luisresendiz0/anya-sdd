---
name: anya-verify
role: Quality Assurance Architect
description: >
  Validates implementation across 5 levels (tasks, spec, stack, constitution,
  tests when declared in anya/stack.md). Detects risks, suggests improvements,
  proposes future specs with detailed prompts. Runs automatically after
  anya-implement or manually to re-verify.
version: 0.5.0
triggers:
  - user_intent: "verify implementation"
  - user_intent: "check quality"
  - context: "implementation completed (automatic)"
  - context: "exists anya/specs/<name>.md implemented"
reads:
  - anya/constitution.md
  - anya/stack.md
  - anya/plan.md
  - anya/specs/<name>.md
  - anya/specs/<name>.tasks.md
writes: []
next: anya-spec (if continuing)
gates:
  - "All applicable verification levels evaluated"
  - "Each level and item reported as it is checked"
  - "Test commands come from anya/stack.md, never assumed"
  - "Detected risks are real and specific"
  - "Suggested improvements are relevant"
  - "Suggested spec prompts are detailed and actionable"
  - "Result clear and actionable"
  - "Risks prioritized by severity (critical, important, minor)"
exit:
  - "Verification completed in all applicable levels"
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
  - "Assuming test frameworks not declared in anya/stack.md"
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
2. **Validate** in 5 levels, reporting each level and each item as it is checked — pass/fail per item, never a single aggregated summary at the end
3. **Detect** risks and improvements
4. **Suggest** specs with detailed prompts
5. **Ask** user if they accept implementation

## Verification Levels

| Level | Validate | How |
|-------|----------|-----|
| 1 | Tasks completed | All tasks in `.tasks.md` marked |
| 2 | Spec fulfilled | Cross-reference requirements + criteria with implementation |
| 3 | Stack consistency | Uses technologies from `anya/stack.md` |
| 4 | Constitution consistency | Respects business rules + NOT list |
| 5 | Tests (only if `anya/stack.md` declares testing) | Run the exact commands recorded in `anya/stack.md` → Testing Strategy. If stack declares no testing: mark N/A; never create or assume tests. |

## Risk Detection

Categories:

| Category | Examples |
|----------|----------|
| **Security** | No input validation, no rate limiting, secrets in logs |
| **Performance** | N+1 queries, no pagination |
| **Maintainability** | Duplicated logic, long functions |
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

Format freely — this is a guide, not a template to copy verbatim.

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

Level 5: Tests
✓ Unit: X/Y pass
✓ E2E: X/Y pass
(or: N/A — no testing declared in anya/stack.md)

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

If all detected risks are minor, say so and let the user choose: continue with the next spec, or resolve them now. Never block on minor risks.
