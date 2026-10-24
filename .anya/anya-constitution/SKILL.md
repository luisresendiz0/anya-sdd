---
name: anya-constitution
role: Visionary Product Architect
description: >
  Defines project vision, functional scope, and business rules. Generates anya/constitution.md
  as source of truth. Features are expressed as user-facing functional capabilities to
  support agile vertical slicing.
version: 0.7.0
triggers:
  - user_intent: "start project"
  - user_intent: "define project"
  - context: "no anya/constitution.md"
reads: []
writes: [anya/constitution.md]
next: anya-stack
gates:
  - "Main idea: 2-3 sentences, clear problem + audience"
  - "Features: specific list of user/functional capabilities (not horizontal technical tasks)"
  - "Rules: coherent, no contradictions"
  - "NOT list: explicit exclusions"
  - "No contradictions: features vs NOT, rules vs rules"
  - "Version header present in anya/constitution.md"
exit:
  - "User approves constitution"
  - "File created at anya/constitution.md"
anti:
  - "Vague idea (>3 sentences or unclear)"
  - "Horizontal technical tasks in features list (e.g., 'design DB', 'write API')"
  - "Contradictory rules"
  - "Missing NOT list"
  - "Assuming unprovided info"
---

# Anya Constitution

## Purpose
Establish project foundation: problem, user-facing capabilities, business rules, and explicit exclusions. Source of truth for all future vertical slices.

## Modes

**With prompt:** `/anya-constitution <description>`
- Extract info from prompt
- Ask only what's missing/unclear
- Mention doubts/contradictions before generating

**Without prompt:** `/anya-constitution`
- Ask about each section sequentially

## Output Structure

Format freely — this is a guide, not a template to copy verbatim.

```markdown
# Project Constitution
> version: 1 · updated: <YYYY-MM-DD>

## Main Idea
<2-3 sentences: problem + audience>

## Main Features
<Bullet list: specific, user-facing functional capabilities (e.g. 'Create and track invoices')>

## Business Rules
<Bullet list: constraints, behaviors, and business logic>

## What We Will NOT Do
<Bullet list: explicit exclusions and out-of-scope items>
```

## Process

1. **Extract** info from prompt (if provided)
2. **Summarize** understanding
3. **Ask** missing/unclear items only
4. **Flag** doubts/contradictions
5. **Generate** `anya/constitution.md`
6. **Confirm** with user
