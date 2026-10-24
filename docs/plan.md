# Plan de Implementación: Anya-SDD v0.7.0 (Agile Vertical Slices)

> version: 1 · updated: 2026-10-23

## Objetivo General
Transformar Anya-SDD en un framework de desarrollo guiado por especificaciones (Spec-Driven Development) estrictamente ágil, donde cada spec genere entregables mínimos de valor vertical (Vertical Slices End-to-End: UI/CLI + lógica + persistencia + pruebas), asegurando que la aplicación sea 100% funcional y ejecutable desde el primer entregable ("Walking Skeleton"), con soporte para seguimiento en tiempo real (`[ ]`, `[/]`, `[x]`), guía interactiva de prueba y pausa obligatoria de verificación humana.

## Principios Rectores
1. **Vertical Slices E2E (No Cascada)**: Prohibidas las specs puramente horizontales (ej. solo BD, solo backend). Cada entrega es un incremento utilizable.
2. **Walking Skeleton (Spec 001)**: El primer entregable resuelve el flujo de usuario más elemental y absorbe el setup mínimo para compilar y correr.
3. **Flexibilidad Proporcional**: Specs completas para proyectos medianos/grandes y specs ligeras/adaptables para fixes, evolutivos y cambios puntuales.
4. **Pausa de Verificación en Vivo**: Guía interactiva paso a paso para el usuario y detención obligatoria antes del siguiente incremento.
5. **Visibilidad Continua**: Tareas en progreso (`[/]`), completadas (`[x]`) y pendientes (`[ ]`).

---

## Entregables de Valor (Vertical Slices del Proyecto)

### Entregable 1: Núcleo de Planificación y Especificación Ágil (`anya-plan` y `anya-spec`)
- **Valor funcional**: Permite planificar proyectos como sucesiones de entregables verticales utilizables desde el día 1 y generar especificaciones con anatomía de rebanada vertical completa o ágil para fixes.
- **Componentes**: `.anya/anya-plan/SKILL.md`, `.anya/anya-spec/SKILL.md`.

### Entregable 2: Motor de Descomposición, Ejecución y Verificación Interactiva (`anya-task`, `anya-implement`, `anya-verify`, `anya-stack`, `anya-constitution`)
- **Valor funcional**: Ejecuta el ciclo de desarrollo con estados en vivo `[/]`, valida compilación y arranque, y provee al usuario una guía de prueba interactiva con pausa obligatoria antes de continuar.
- **Componentes**: `.anya/anya-task/SKILL.md`, `.anya/anya-implement/SKILL.md`, `.anya/anya-verify/SKILL.md`, `.anya/anya-stack/SKILL.md`, `.anya/anya-constitution/SKILL.md`.

### Entregable 3: Documentación Global del Framework y Landing Page Web (`README.md`, `QUICKSTART.md`, `CHANGELOG.md`, `docs/index.html`)
- **Valor funcional**: Actualiza la cara pública y educativa del framework (v0.7.0), tutoriales, ejemplos y la web de GitHub Pages con la metodología de vertical slices.
- **Componentes**: `CHANGELOG.md`, `README.md`, `QUICKSTART.md`, `docs/index.html`.
