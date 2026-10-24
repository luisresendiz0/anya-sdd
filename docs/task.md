# Tablero de Tareas: Anya-SDD v0.7.0

> version: 1 · updated: 2026-10-23

## Estado Actual del Proyecto
- **Entregable Actual**: Entregable 1 - Núcleo de Planificación y Especificación Ágil (`anya-plan` y `anya-spec`) [COMPLETADO - Esperando Verificación del Usuario]
- **Valor Aportado**: Definición formal y gates en `anya-plan` y `anya-spec` para obligar rebanadas verticales E2E, Walking Skeleton en Spec 001, erradicación de specs horizontales en cascada, y soporte dual para specs completas (proyectos medianos/grandes) y ligeras/flexibles (fixes y evolutivos rápidos).
- **Siguiente Entregable**: Entregable 2 - Motor de Descomposición, Ejecución y Verificación Interactiva (`anya-task`, `anya-implement`, `anya-verify`, `anya-stack`, `anya-constitution`).

---

## Tareas del Entregable 1: Núcleo de Planificación y Especificación Ágil

- [x] **Tarea 1.1**: Actualizar `.anya/anya-plan/SKILL.md`
  - Reemplazar ejemplos y reglas horizontales por directrices estrictas de Vertical Slices E2E.
  - Definir la Spec 001 como "Walking Skeleton" funcional que absorbe el setup inicial.
  - Agregar anti-patrones explícitos contra fases/specs horizontales y entregas no ejecutables.
  - Actualizar la estructura de `anya/plan.md` con columna de "Entregable / Valor Funcional".
  - Incrementar versión a 0.7.0.
- [x] **Tarea 1.2**: Actualizar `.anya/anya-spec/SKILL.md`
  - Rediseñar la plantilla de Spec Completa para proyectos medianos/grandes con anatomía de Vertical Slice (Contexto y Valor de Usuario, Alcance E2E [UI/CLI, Lógica, Datos/Estado], Criterios de Aceptación & Verificación en Vivo, Exclusiones).
  - Incorporar la plantilla adaptable/flexible para fixes, evolutivos y cambios pequeños.
  - Establecer puertas de validación (gates) que impidan generar specs horizontales o no verificables en vivo.
  - Incrementar versión a 0.7.0.
- [x] **Tarea 1.3**: Verificación del Entregable 1
  - Comprobar coherencia entre plan y spec.
  - Validar sintaxis, triggers y metadatos de las skills.

---

## Tareas de Entregables Futuros

### Entregable 2: Motor de Descomposición, Ejecución y Verificación Interactiva
- [ ] Tarea 2.1: Actualizar `.anya/anya-task/SKILL.md` (descomposición en tareas del slice, estados `[/]`, tarea final de prueba en vivo).
- [ ] Tarea 2.2: Actualizar `.anya/anya-implement/SKILL.md` (seguimiento con `[/]`, validación de ejecución, pausa obligatoria).
- [ ] Tarea 2.3: Actualizar `.anya/anya-verify/SKILL.md` (validación de compilación/arranque, Guía de Prueba Interactiva en Vivo paso a paso).
- [ ] Tarea 2.4: Actualizar `.anya/anya-stack/SKILL.md` y `.anya/anya-constitution/SKILL.md` (comandos de ejecución y pruebas, principios verticales).
- [ ] Tarea 2.5: Verificación del Entregable 2.

### Entregable 3: Documentación Global y Landing Page Web
- [ ] Tarea 3.1: Actualizar `CHANGELOG.md` para v0.7.0.
- [ ] Tarea 3.2: Actualizar `README.md` y `QUICKSTART.md`.
- [ ] Tarea 3.3: Actualizar landing page en `docs/index.html`.
- [ ] Tarea 3.4: Verificación completa y revisión en vivo.
