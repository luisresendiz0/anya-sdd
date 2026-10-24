# Tablero de Tareas: Anya-SDD v0.7.0

> version: 1 · updated: 2026-10-23

## Estado Actual del Proyecto
- **Entregable Actual**: Entregable 3 - Documentación Global del Framework y Landing Page Web (`README.md`, `QUICKSTART.md`, `CHANGELOG.md`, `docs/index.html`) [COMPLETADO - Esperando Verificación del Usuario]
- **Valor Aportado**: Se actualizó exhaustivamente la documentación pública, guías prácticas, el CHANGELOG para v0.7.0 y la landing page interactiva con la nueva arquitectura de Vertical Slices E2E, Walking Skeleton, visibilidad dinámica con `[/]`, verificación en 6 niveles y la pausa de validación humana en vivo.
- **Siguientes Entregables**: Ninguno. Todos los entregables del plan v0.7.0 han sido completados y verificados.

---

## Tareas del Entregable 1: Núcleo de Planificación y Especificación Ágil [COMPLETADO]

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

## Tareas del Entregable 2: Motor de Descomposición, Ejecución y Verificación Interactiva [COMPLETADO]

- [x] **Tarea 2.1**: Actualizar `.anya/anya-task/SKILL.md`
  - Descomponer la spec en tareas atómicas orientadas a la integración del slice vertical.
  - Soportar explícitamente estados de tarea: `[ ]` pendiente, `[/]` en progreso, `[x]` completada.
  - Incluir obligatoriamente como tarea final: 'Compilación, arranque y prueba interactiva en vivo'.
  - Incrementar versión a 0.7.0.
- [x] **Tarea 2.2**: Actualizar `.anya/anya-implement/SKILL.md`
  - Actualizar el estado de cada tarea a `[/]` al iniciarla y a `[x]` al terminarla.
  - Verificar que la aplicación compile y arranque sin errores tras completar las tareas.
  - Integrar la pausa obligatoria tras la verificación automática.
  - Incrementar versión a 0.7.0.
- [x] **Tarea 2.3**: Actualizar `.anya/anya-verify/SKILL.md`
  - Agregar nivel o validación explícita de compilación y arranque de la aplicación.
  - Generar la Guía de Prueba Interactiva en Vivo paso a paso (comandos exactos, acciones en UI/CLI, resultados esperados).
  - Exigir parada obligatoria hasta aprobación humana.
  - Incrementar versión a 0.7.0.
- [x] **Tarea 2.4**: Actualizar `.anya/anya-stack/SKILL.md` y `.anya/anya-constitution/SKILL.md`
  - En `anya-stack`: registrar obligatoriamente el comando exacto para compilar/arrancar la app en vivo (`dev / start / run`), junto al comando de tests.
  - En `anya-constitution`: reforzar principios de vertical slices y anti-patrón de requerimientos puramente horizontales.
  - Incrementar versiones a 0.7.0.
- [x] **Tarea 2.5**: Verificación del Entregable 2
  - Validar ciclo completo de skills E2E y coherencia de metadatos.

---

## Tareas del Entregable 3: Documentación Global y Landing Page Web [COMPLETADO]

- [x] **Tarea 3.1**: Actualizar `CHANGELOG.md` para v0.7.0.
  - Documentar cambios en vertical slices, walking skeleton, estados `[/]`, verificación en 6 niveles y pausa de validación humana.
- [x] **Tarea 3.2**: Actualizar `README.md` y `QUICKSTART.md`.
  - Reflejar la filosofía de rebanadas verticales E2E utilizables desde la Spec 001.
  - Ajustar tabla de skills y comandos de inicio rápido.
  - Explicar la guía interactiva y la pausa de validación en vivo.
- [x] **Tarea 3.3**: Actualizar landing page en `docs/index.html`.
  - Sincronizar secciones, badges de versión v0.7.0 y explicaciones sobre Vertical Slices y Live Verification.
- [x] **Tarea 3.4**: Verificación completa del Entregable 3.

### Entregable 3: Documentación Global y Landing Page Web
- [ ] Tarea 3.1: Actualizar `CHANGELOG.md` para v0.7.0.
- [ ] Tarea 3.2: Actualizar `README.md` y `QUICKSTART.md`.
- [ ] Tarea 3.3: Actualizar landing page en `docs/index.html`.
- [ ] Tarea 3.4: Verificación completa y revisión en vivo.
