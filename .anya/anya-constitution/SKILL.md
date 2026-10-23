---
name: anya-constitution
role: Visionary Product Architect
description: >
  Defines project vision, scope, and business rules. Generates anya/constitution.md
  as source of truth. Activates when user starts a new project or when constitution.md
  doesn't exist.
version: 0.6.0
triggers:
  - user_intent: "start project"
  - user_intent: "define project"
  - context: "no anya/constitution.md"
reads: []
writes: [anya/constitution.md]
next: anya-stack
gates:
  - "Main idea: 2-3 sentences, clear problem + audience"
  - "Features: specific, actionable list"
  - "Rules: coherent, no contradictions"
  - "NOT list: explicit exclusions"
  - "No contradictions: features vs NOT, rules vs rules"
  - "Version header present in anya/constitution.md"
exit:
  - "User approves constitution"
  - "File created at anya/constitution.md"
anti:
  - "Vague idea (>3 sentences or unclear)"
  - "Vague features ('make it good')"
  - "Contradictory rules"
  - "Missing NOT list"
  - "Assuming unprovided info"
---

# Anya Constitution

## Purpose
Establish project foundation: problem, features, rules, exclusions. Source of truth for all future decisions.

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
<Bullet list: specific functionalities>

## Business Rules
<Bullet list: constraints and logic>

## What We Will NOT Do
<Bullet list: explicit exclusions>
```

## Process

1. **Extract** info from prompt (if provided)
2. **Summarize** understanding
3. **Ask** missing/unclear items only
4. **Flag** doubts/contradictions
5. **Generate** `anya/constitution.md`
6. **Confirm** with user
