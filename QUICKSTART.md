# Quick Start Guide

End-to-end workflow using Anya-SDD v0.7.0.

## Setup

```bash
# 1. Copy the skills into your project
git clone https://github.com/luisresendiz0/anya-sdd.git /tmp/anya-sdd
cp -r /tmp/anya-sdd/.anya /your-project/
cd /your-project

# 2. Let your agent discover them (recommended)
mkdir -p ~/.config/opencode/skills
cp -r .anya/anya-* ~/.config/opencode/skills/
```

Other harnesses: `.opencode/skills/`, `~/.claude/skills/`, `.agents/skills/`.
Or skip the global install and point your agent at `.anya/` from `AGENTS.md`.

## Phase 1: Foundation

Run these **once per project**.

### 1. Constitution

```bash
/anya-constitution Task manager for freelancers with multiple clients.
Need projects by client, time tracking, monthly reports, PDF invoicing.
No real-time collaboration or payments.
```

**Output:** `anya/constitution.md`

The agent will:
- Extract user capabilities from the prompt
- Ask only what's missing
- Ensure no horizontal technical tasks are placed in features
- Request approval before writing

### 2. Stack

```bash
/anya-stack TypeScript + Express + PostgreSQL backend.
React + Tailwind frontend. Unit + E2E tests.
```

**Output:** `anya/stack.md`

The agent will:
- Ask the project type if it isn't clear
- Record the **exact execution commands** to build and run the app locally
- Derive test tools from **your** ecosystem — never assume one
- Record the **exact command** to run each test suite
- Validate against the constitution

**Example block:**

```markdown
## Execution Commands
- **Build / Compile:** `npm run build`
- **Run / Dev:** `npm run dev`

## Testing Strategy
- **Unit tests:** yes
  - Tool: Vitest
  - Command: `npm run test:unit`
- **E2E tests:** yes
  - Tool: Playwright
  - Command: `npm run test:e2e`
```

### 3. Plan

```bash
/anya-plan
```

**Output:** `anya/plan.md`

The agent will:
- Read constitution and stack
- Establish **Spec 001 as a functional Walking Skeleton** (simplest end-to-end flow + minimal runnable setup)
- Structure remaining deliverables as **End-to-End Vertical Slices** (no horizontal layers)
- Request approval

**Example output:**

```markdown
### Phase 1: Walking Skeleton & Core Flow
1. task-create-view - Setup app + UI/CLI and persistence to create & view tasks
2. task-toggle-status - Interactively toggle completion status with instant UI feedback

### Phase 2: Search & Delivery
3. task-search-filter - Interactive search bar and status filtering
4. task-export-csv - CSV export button and download generation
```

## Phase 2: Iteration

Repeat for **every spec**.

Every increment cuts vertically through UI/CLI, logic, and state. The app stays 100% functional and runnable at every step.

### 4. Generate a spec

```bash
/anya-spec next
```

**Output:** `anya/specs/NNN-name/spec.md`

The agent will:
- Pick the next pending vertical slice from `anya/plan.md`
- Choose between **Complete Vertical Slice Spec** (6 sections) or **Flexible Lightweight Spec** (for quick fixes/tweaks)
- Include concrete **Live Verification Steps**
- Generate spec and request approval

### 5. Generate tasks

```bash
/anya-task 001-task-create-view
```

**Output:** `anya/specs/NNN-name/tasks.md`, beside its `spec.md`.

Each task gets:
- A clear action with explicit dependencies and target files
- Support for live progress states (`[ ]` pending, `[/]` in progress, `[x]` completed)
- A **mandatory final task** dedicated to live compilation, startup, and interactive verification

**Example:**

```markdown
- [ ] **Task 1:** Create SQLite database schema and task repository
  - File: `src/db/tasks.ts`
  - Dependencies: None

- [ ] **Task 2:** Implement task list and form UI components
  - File: `src/components/TaskView.tsx`
  - Dependencies: Task 1

- [ ] **Task 3 (Final):** Compilación, arranque y prueba interactiva en vivo
  - File: `src/main.tsx`
  - Description: Verify compilation, launch dev server, and execute live verification steps.
  - Dependencies: Task 1, Task 2
```

### 6. Implement

```bash
/anya-implement 001-task-create-view
```

The agent will:
- Execute tasks **one at a time**
- Mark each task `[/]` when starting and `[x]` immediately when completed
- Verify clean compilation and runtime health using the run command from `stack.md`
- Run `/anya-verify` automatically across 6 levels
- Present the **Interactive Live Testing Guide**
- **HALT COMPLETELY** with a mandatory pause for you to try the app live

**Example output:**

```
✓ Implementación completada: 001-task-create-view/spec.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verificación de Entregable (6 Niveles)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nivel 1: Tareas           ✓ 3/3 en tasks.md
Nivel 2: Spec (Slice)     ✓ Rebanada vertical completa y funcional
Nivel 3: Stack            ✓ Tecnologías conformes
Nivel 4: Constitución     ✓ Reglas y exclusiones respetadas
Nivel 5: Runtime          ✓ Compila y arranca con `npm run dev`
Nivel 6: Tests            ✓ 4/4 pasaron

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Guía de Prueba Interactiva en Vivo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Levanta la aplicación:
   $ npm run dev

2. Abre en tu navegador:
   http://localhost:3000

3. Realiza la prueba:
   - Paso 1: Ingresa "Comprar café" en el campo de texto y haz clic en "Agregar".
   - Paso 2: Confirma que la tarea aparezca en la lista con estado pendiente.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pausa de Verificación Humana
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Por favor prueba la aplicación en vivo con los pasos anteriores.
¿La funcionalidad responde como esperabas?

a) Sí, verificada en vivo -> Continuar con la siguiente spec (/anya-spec next)
b) No, se detectaron fallos -> Ajustar entregable actual
c) Revisar detalles técnicos
```

### 7. Repeat

```bash
/anya-spec next
/anya-task <spec>
/anya-implement <spec>
```

Until all vertical slices are shipped.

## Common Scenarios

### Generate a specific spec
```bash
/anya-spec task-search-filter
```

### Quick bug fix or small evolutive
```bash
/anya-spec fix button alignment on mobile view
```
Uses the **Flexible Lightweight Spec** (4 sections) for quick resolution.

### Review a broken implementation
```bash
/anya-implement review 001-task-create-view
```
Diagnoses in cascade (tasks → spec criteria → stack → constitution) and proposes a surgical fix.

### Re-verify a spec
```bash
/anya-verify 001-task-create-view
```

## Output Files

```
anya/
├── constitution.md    # Vision, user capabilities, rules
├── stack.md           # Technologies, run/dev commands, testing strategy
├── plan.md            # Vertical slices with user value
└── specs/
    ├── 001-task-create-view/
    │   ├── spec.md
    │   └── tasks.md
    ├── 002-task-toggle-status/
    │   ├── spec.md
    │   └── tasks.md
    └── ...
```

## Next Steps

- [README.md](./README.md) — framework overview
- [CHANGELOG.md](./CHANGELOG.md) — version history
- Explore `.anya/<skill>/SKILL.md` for the full instructions
