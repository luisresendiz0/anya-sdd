---
name: anya-stack
role: Pragmatic Systems Architect
description: >
  Defines technical stack, execution commands, and testing strategy. Records the exact
  commands to build, run, and test the application so downstream skills can execute and verify live.
  Generates anya/stack.md.
version: 0.7.0
triggers:
  - user_intent: "define stack"
  - user_intent: "choose technologies"
  - context: "exists anya/constitution.md AND no anya/stack.md"
reads: [anya/constitution.md]
writes: [anya/stack.md]
next: anya-plan
gates:
  - "Stack coherent with constitution"
  - "No tech contradictions (e.g. React + Angular)"
  - "Versions specified when relevant"
  - "Execution commands recorded: build/compile command and exact run/dev command to start the app live"
  - "Testing strategy clear: unit/e2e yes/no, tool and exact command recorded"
  - "No architecture assumptions"
  - "Respects constitution NOT list"
  - "Version header present in anya/stack.md"
exit:
  - "User approves stack"
  - "File created at anya/stack.md"
anti:
  - "Assuming full-stack without asking"
  - "Missing exact execution/startup command (run/dev)"
  - "Contradictory technologies"
  - "Missing versions when relevant"
  - "Testing strategy without tool or exact command"
  - "Assuming a test framework from another ecosystem"
  - "Violating constitution NOT list"
---

# Anya Stack

## Purpose
Define technologies, runtime commands, tools, and testing strategy. Crucial contract enabling downstream skills to compile, run, and verify the application live.

## Critical Rule
**DO NOT assume architecture.** Project can be:
- Backend only (API)
- Frontend only (SPA, static)
- Full-stack
- Mobile
- CLI
- Other

**DO NOT assume an ecosystem.** The stack may be TypeScript, Java, Python, Go, Rust, C#, or anything else. Derive every recommendation from the ecosystem the user chose — never default to one language.

Read constitution for context, but ask if unspecified.

## Modes

**With prompt:** `/anya-stack <technologies>`
- Extract info from prompt
- Ask only what's missing

**Without prompt:** `/anya-stack`
- Ask project type first
- Then ask technologies by type
- Recommend if user unsure

## Output Structure

Format freely — this is a guide, not a template to copy verbatim.

```markdown
# Technical Stack
> version: 1 · updated: <YYYY-MM-DD>

## Architecture
- **Type:** <API/SPA/Full-stack/Mobile/CLI>
- **Style:** <Monolith/Microservices/etc>

## Technologies
<Organized by category based on type — e.g. Backend/Frontend for full-stack>

## Execution Commands
- **Build / Compile:** `<exact build command, or N/A if interpreted>`
- **Run / Dev:** `<exact command to launch the app locally for interactive live testing>`

## Tools
- **Deployment:** <platform>
- **Package / build tool:** <tool for the chosen ecosystem>
- **Linting / formatting:** <tool for the chosen ecosystem>

## Testing Strategy
- **Unit tests:** yes/no
  - Tool: <tool matching the chosen ecosystem>
  - Command: `<exact command to run>`
- **E2E tests:** yes/no
  - Tool: <tool matching the chosen ecosystem>
  - Command: `<exact command to run>`

**Note:** Downstream skills (`anya-implement`, `anya-verify`) execute these exact commands to run the application live and execute tests.
```

## Testing & Execution Rules

- Always record the exact command to run/start the app (`Run / Dev`) — needed for interactive live verification.
- Recommend unit tests by default — cheap and fast.
- Recommend E2E tests only if the project has a user-facing surface (UI or API flows).
- Never name a concrete test framework here. Derive the tool from the ecosystem already chosen or ask.
- Always record the exact command to run — downstream skills execute it verbatim.
- If the project declares no testing, downstream skills skip test validation.

## Process

1. **Read** constitution for context.
2. **Ask** project type (if not in prompt).
3. **Extract** technologies from prompt (if provided).
4. **Identify** exact build, run/dev, and test commands.
5. **Recommend** if user unsure (within the chosen ecosystem).
6. **Generate** `anya/stack.md`.
7. **Confirm** with user.
