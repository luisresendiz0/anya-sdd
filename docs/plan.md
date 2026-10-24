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

### Entregable 4: Corrección de Desplazamiento Móvil en Hero & Terminal y Rediseño Moderno de la Landing Page (`docs/index.html`, `docs/styles.css`, `docs/script.js`)
- **Valor funcional**: Corrige el bug crítico de desplazamiento horizontal en celulares (desbordamiento en la consola y texto de landing), asegurando 0 scroll horizontal en dispositivos móviles (desde 320px) e introduce una estética moderna, limpia y tecnológica (estilo Linear/Vercel con identidad Anya) con mejor tipografía, micro-interacciones y botones de copia rápida.
- **Componentes**: `docs/index.html`, `docs/styles.css`, `docs/script.js`.

### Entregable 5: Efectos Glassmorphism Avanzados, Fondos Difuminados Ambientales y Animación de Menú Sticky Flotante (`docs/index.html`, `docs/styles.css`, `docs/script.js`)
- **Valor funcional**: Eleva la atmósfera visual del producto incorporando halos y orbes de luz ambiental difuminados multicapa (inspirados en la sección CTA), superficies de vidrio esmerilado de alta fidelidad (`backdrop-filter: blur`, bordes cristalinos reflectantes) en tarjetas, paneles de pipeline y consola, junto a una animación fluida que contrae el menú superior en una isla de cristal flotante al desplazarse por la página.
- **Componentes**: `docs/index.html`, `docs/styles.css`, `docs/script.js`.

### Entregable 6: Integración Armónica de Sprites e Ilustraciones de Anya en la Landing Page (`docs/assets/`, `docs/index.html`, `docs/styles.css`)
- **Valor funcional**: Integra de forma orgánica y carismática a Anya (mascota del proyecto) en puntos estratégicos de la landing page (Workbench de Pipeline, Consola de Verificación, Quickstart y tarjetas clave), permitiendo que conviva armónicamente con el diseño minimalista de software profesional sin saturar la atención del usuario, con micro-interacciones sutiles en hover y optimización para rendimiento y dispositivos móviles.
- **Componentes**: `docs/assets/` (sprites PNG transparentes), `docs/index.html`, `docs/styles.css`.
