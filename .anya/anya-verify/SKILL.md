---
name: anya-verify
role: Quality Assurance Architect
description: >
  Validates vertical slice deliverables across 6 levels including build/runtime health.
  Generates a step-by-step Interactive Live Testing Guide for the user and enforces
  a mandatory stop for human live verification before allowing progress.
version: 0.7.0
triggers:
  - user_intent: "verify implementation"
  - user_intent: "check quality"
  - context: "implementation completed (automatic)"
  - context: "exists anya/specs/NNN-name/spec.md implemented"
reads:
  - anya/constitution.md
  - anya/stack.md
  - anya/plan.md
  - anya/specs/NNN-name/spec.md
  - anya/specs/NNN-name/tasks.md
writes: []
next: anya-spec (only after user live approval)
gates:
  - "All applicable verification levels evaluated (including build and runtime health)"
  - "Each level and item reported as it is checked"
  - "Build and runtime command executed from anya/stack.md without error"
  - "Test commands come from anya/stack.md, never assumed"
  - "Interactive Live Testing Guide generated with exact user actions"
  - "Mandatory Pause enforced: halts completely for user live validation"
  - "Risks and improvements clearly identified"
exit:
  - "Verification completed across all applicable levels"
  - "Interactive Live Testing Guide presented to user"
  - "System halts awaiting human verification response"
anti:
  - "Automatically continuing to next spec without user live verification pause"
  - "Missing step-by-step interactive testing guide"
  - "Assuming the app works without running build/startup commands"
  - "Assuming test frameworks not declared in anya/stack.md"
  - "Vague test suggestions"
  - "Blocking progress on non-critical minor risks"
---

# Anya Verify

## Purpose
Validate vertical slice delivery across 6 levels, confirm build/runtime execution, provide the user with an exact step-by-step **Interactive Live Testing Guide**, and enforce a mandatory verification pause.

**Note:** Runs automatically at the end of `/anya-implement`, or manually via `/anya-verify <spec-name>`.

Resolve the spec by unique name or numbered folder (`001-name`); ask if ambiguous.

## Verification Levels

| Level | Validation | How |
|-------|------------|-----|
| **1. Tasks** | All tasks completed | Every task in `tasks.md` marked `[x]` |
| **2. Spec** | Vertical slice criteria met | Cross-reference functional requirements and acceptance criteria |
| **3. Stack** | Technology compliance | Uses technologies defined in `anya/stack.md` |
| **4. Constitution** | Business rules & boundaries | Respects rules and exclusions from `anya/constitution.md` |
| **5. Build & Runtime** | App compiles and starts | Executes build and run commands from `anya/stack.md` to confirm zero startup errors |
| **6. Tests** | Automated test suite | Executes exact test command from `anya/stack.md`. If none declared: reported as N/A |

## Interactive Live Testing Guide

Anya-Verify builds a concrete, interactive walkthrough derived from the spec's `Live Verification Steps`:
1. **Execution command:** The exact terminal command to start the application/server.
2. **Access point:** URL, localhost port, or CLI command.
3. **Step-by-step user actions:** What to click, input, or trigger.
4. **Expected observable behavior:** What should visually appear or be returned.

## Process

1. **Read** spec, tasks, stack, and constitution.
2. **Validate** in 6 levels, reporting each level and item as it is evaluated.
3. **Confirm** build and runtime health.
4. **Identify** any risks or suggested evolutive specs.
5. **Generate** the **Guía de Prueba Interactiva en Vivo**.
6. **Halt Execution (Mandatory Pause):** Stop and ask the user to test live.

## Output Structure

Format freely — this is a guide, not a template to copy verbatim.

```
✓ Implementación completada: NNN-name/spec.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Verificación de Entregable (6 Niveles)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nivel 1: Tareas
✓ Tareas completadas: X/X en tasks.md

Nivel 2: Spec (Rebanada Vertical)
✓ Criterios de aceptación: X/X cumplidos
✓ Flujo de usuario E2E verificado

Nivel 3: Stack
✓ Tecnologías consistentes con anya/stack.md

Nivel 4: Constitución
✓ Reglas de negocio respetadas
✓ Lista de exclusiones respetada

Nivel 5: Compilación y Arranque (Runtime)
✓ Compilación: limpia sin errores
✓ Arranque: aplicación inicia correctamente con `<run command>`

Nivel 6: Pruebas Automatizadas
✓ Tests: X/X aprobados (o N/A si stack.md no declara testing)

⚠ Riesgos detectados: X
💡 Mejoras sugeridas: X

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Guía de Prueba Interactiva en Vivo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Para probar este entregable en vivo en tu máquina:

1. Levanta la aplicación:
   $ <comando de arranque de stack.md>

2. Abre / Ejecuta:
   <URL ej. http://localhost:3000 o comando CLI>

3. Realiza la prueba:
   - Paso 1: <acción concreta en interfaz o terminal>
   - Paso 2: <dato de prueba a ingresar o botón a presionar>

4. Resultado esperado:
   - <comportamiento visible / feedback interactivo>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Pausa de Verificación Humana
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Por favor prueba la aplicación en vivo con los pasos anteriores.
¿La funcionalidad responde como esperabas?

a) Sí, verificada en vivo -> Continuar con la siguiente spec (/anya-spec next)
b) No, se detectaron fallos -> Ajustar entregable actual
c) Revisar detalles técnicos o diagnósticos
```

## Mandatory Pause Enforcement

The agent must NEVER proceed to generate or implement the next spec without the user's explicit live verification and approval.
