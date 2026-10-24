# Tablero de Tareas: Anya-SDD v0.7.0

> version: 11 · updated: 2026-10-24

## Estado Actual del Proyecto
- **Entregable Actual**: Entregable 6 - Integración Armónica de Sprites e Ilustraciones de Anya y Barra de Navegación Sticky Permanente (`docs/assets/`, `docs/index.html`, `docs/styles.css`) [COMPLETADO]
- **Valor Aportado**: Integración carismática de Anya en puntos clave de la landing page (Workbench de Pipeline con Anya asomándose, Consola de Verificación con Anya inspectora y sello "Verified ✓" en la parte inferior, y Quickstart con Anya waku-waku). Además, corrección, activación 100% funcional y pulido estético de la barra de navegación superior sticky (`position: sticky`), manteniéndose visible como cápsula flotante de cristal esmerilado durante todo el desplazamiento de la página con padding ampliado (`36px` escritorio / `18px` móvil), soporte responsivo y cero desbordamiento horizontal.
- **Siguientes Entregables**: Todos los entregables previstos en la iteración v0.7.0 han sido completados y verificados.

---

## Tareas del Entregable 6: Integración de Sprites y Navegación Sticky [COMPLETADO]

- [x] **Tarea 6.1**: Generación y curación de sprites de Anya en alta resolución
  - Generadas 3 ilustraciones vectoriales estilo chibi anime de alta resolución mediante el agente ilustrador:
    - Sprite 1: Anya "Peeking" (asomándose curiosa por encima de bordes con sus dos manos apoyadas).
    - Sprite 2: Anya "Quality Inspector / Smug" (con uniforme de auditora, sonrisa pícara "heh", pulgar arriba y sello de verificación).
    - Sprite 3: Anya "Waku Waku / Planner" (sentada entusiasmada con ojos brillantes de estrella sosteniendo el plano de especificaciones).
- [x] **Tarea 6.2**: Procesamiento, recorte y optimización alpha transparente (`docs/assets/`)
  - Aislado el fondo blanco con algoritmo de flood fill perimetral para conservar blancos interiores intactos (ojos, cuello, pergamino).
  - Suavizado gaussiano de contornos para eliminar halos y recorte al bounding box exacto.
  - Generadas versiones duales optimizadas: PNG de alta fidelidad y WebP ligero (~100KB cada una) en `docs/assets/`.
- [x] **Tarea 6.3**: Integración sutil y armónica en el layout (`docs/index.html` y `docs/styles.css`)
  - Colocada Anya peeking (`.pipe-peeker`) asomándose directamente sobre el borde superior del panel del Pipeline (`#how`).
  - Reposicionada Anya inspectora (`.verify-inspector-badge`) con el badge flotante "Verified ✓" en la parte inferior derecha de la consola de verificación (`#verification`), despejando la barra de título superior y acompañando el cierre del reporte (`Paused for human live verification approval`).
  - Colocada Anya waku-waku (`.aside-mascot`) sentada sobre la tarjeta de arquitectura de archivos (`#quickstart`).
  - Implementado elemento `<picture>` con fuente WebP y fallback PNG para máxima velocidad de carga.
- [x] **Tarea 6.4**: Corrección y pulido de barra de navegación sticky permanente en scroll (`docs/styles.css`)
  - Identificada causa raíz de la falla de sticky: `overflow-x: hidden` en `html` y `body` generaba un contenedor de desbordamiento local (`overflow-y: auto`), cancelando el anclaje sticky del viewport.
  - Sustituido `overflow-x: hidden` por `overflow-x: clip` en `html` y `body` para preservar `overflow-y: visible`, permitiendo que `position: sticky; top: 0;` en `.site-header` se ancle perfectamente a la ventana durante todo el scroll.
  - Asegurada la fijación total con `left: 0; right: 0; width: 100%;` en `.site-header` y `width: 100%` en `.site-header > .container`.
  - Mejorada la opacidad de `.site-header.is-scrolled .header-inner` a `rgba(255, 255, 255, 0.95)` para garantizar máxima legibilidad de enlaces y logo sobre cualquier elemento de fondo.
  - Ampliado el padding de la cápsula flotante en `.site-header.is-scrolled .header-inner` de `24px` a `36px` en escritorio y de `14px` a `18px` en móvil para otorgar mayor balance y holgura visual respecto a las curvas de los extremos.
- [x] **Tarea 6.5**: Micro-interacciones y accesibilidad
  - Transición fluida a cápsula de cristal flotante con `is-scrolled` activada al superar 16px de scroll.
  - Micro-elevación hover de sprites y soporte a `prefers-reduced-motion`.
  - Soporte de apertura del menú móvil persistente incluso durante el scroll.
- [x] **Tarea 6.6**: Verificación y pruebas automáticas de responsividad y sticky
  - Ejecutada suite completa en Firefox headless:
    - Verificada la posición sticky (`headerTop == 0`) en 7 puntos de scroll (0px, 50px, 200px, 800px, 2000px, 5000px, 8000px).
    - Verificada apertura del menú móvil con scroll activo (`scrollY: 1000px`, `isNavOpen: True`).
    - Cero pixeles de desbordamiento horizontal en todas las resoluciones móviles y de escritorio.
- [x] **Tarea 6.7**: Pausa obligatoria de verificación interactiva en vivo por el usuario.
  - Verificada y aprobada en vivo por el usuario la interacción, navegación sticky flotante con nuevo padding y la disposición armónica de ilustraciones de Anya.

---

## Tareas del Entregable 5: Glassmorphism, Fondos Difuminados y Menú Sticky Animado [COMPLETADO]

- [x] **Tarea 5.1**: Animación de menú de navegación sticky flotante
  - Diseñada e implementada la transición animada del menú en `docs/styles.css` y `docs/script.js`: transparente y espacioso en la parte superior (`scrollY <= 16`), animándose fluidamente al hacer scroll hacia una cápsula/isla de cristal esmerilado flotante (`backdrop-filter: blur(24px) saturate(190%)`, fondo `rgba(255, 255, 255, 0.85)`, bordes translúcidos rosa suave y sombras multi-capa con reflejo interior).
  - Optimizado el scroll listener con `requestAnimationFrame` y soporte total para `prefers-reduced-motion`.
- [x] **Tarea 5.2**: Fondos difuminados y orbes ambientales multicapa
  - Creados e integrados halos de luz difuminados suaves (`radial-gradient` con blur de 75px-85px) en secciones clave: Hero (halo rosa/ámbar/durazno), `#why` (`.ambient-glow--why`), `#how` (`.ambient-glow--how`), `#skills` (`.ambient-glow--skills`), `#verification` (`.ambient-glow--verify`) y tarjeta CTA (halo primario + secundario `.cta-glow--secondary`).
  - Todos los orbes ambientales contenidos en secciones con `overflow: hidden; pointer-events: none;` para garantizar exactamente 0 desbordamiento lateral.
- [x] **Tarea 5.3**: Acabados de glassmorphism en componentes clave
  - Aplicadas superficies de vidrio frosted con reflejos delicados en: tarjetas de "Why Anya" (`.card`), panel interactivo del Pipeline Workbench (`.pipe-step`, `.pipe-panel`), tarjetas de especificaciones (`.spec-card`, `.spec-card--featured`), barra de métricas bento (`.stats`, `.stat-card`), consola simulada en modo dark glass (`.terminal`), lista de niveles de verificación (`.levels li`), tabla de cambios (`.table-wrap`) y tarjetas de filosofía (`.philo`).
  - Diseñados bordes nítidos de alta definición con bisel interior (`inset 0 1px 1px rgba(255, 255, 255, 0.95)`).
- [x] **Tarea 5.4**: Verificación y pruebas automáticas de responsividad y renderizado
  - Verificado en suite automatizada headless Firefox (`scratch/verify_entregable5.py`):
    - 0 desplazamiento lateral en 8 resoluciones móviles (320px a 1024px).
    - Enmarcado centrado exacto y márgenes simétricos (diferencia 0px) en escritorio (1280px, 1440px, 1600px, 1920px).
    - Transición de cápsula sticky activada correctamente en scroll.
    - Presencia y contención de todos los halos de luz difuminados y superficies glassmorphic.
- [x] **Tarea 5.5**: Aprobación de verificación interactiva en vivo por el usuario.

---

## Tareas del Entregable 4: Corrección de Escritorio y Rediseño Premium de Software [COMPLETADO]

- [x] **Tarea 4.1**: Corrección de márgenes y centrado en escritorio
  - Separado `<div class="container">` de los elementos grid (`.hero-grid` y `.verify-grid`) en el HTML para evitar colisiones de `max-width: 100%`.
  - Establecidas reglas universales y robustas en `.container`: `max-width: 1180px; margin-left: auto; margin-right: auto; padding-inline: 32px;`.
  - Verificado en resoluciones de 1280px, 1440px, 1600px y 1920px que el contenido permanezca perfectamente enmarcado y centrado con márgenes simétricos.
- [x] **Tarea 4.2**: Rediseño visual premium de software (Hero, Fondo y Tipografía)
  - Incorporado fondo tecnológico con patrón de matriz de puntos (`radial-gradient` de 28px) y resplandor ambiental multicapa.
  - Diseñada barra de métricas unificada estilo bento bar (`.stats`) con divisores de 1px, tipografía destacada y subtítulos descriptivos.
  - Elevada la jerarquía tipográfica del titular (`h1`) con gradiente multi-stop de alta gama y micro-badge de versión con pulso en vivo.
- [x] **Tarea 4.3**: Modernización de componentes y experiencia de desarrollador
  - Perfeccionada la consola simulada: semáforos macOS con resplandor realista, píldora de sesión interactiva y botón de copiado con micro-animación (`✓ Copied!`).
  - Pulidas las tarjetas bento de "Why Anya", "How it works" (workbench de pipeline) y comparador de especificaciones (Flexible vs Complete Slice).
  - Refinado el Quickstart oscuro con tabs segmentados y badges de lenguaje/archivo.
- [x] **Tarea 4.4**: Verificación y pruebas automáticas de responsividad y márgenes
  - Verificación exitosa en escritorio (1280px, 1440px, 1600px y 1920px) con márgenes laterales simétricos.
  - Verificación exitosa en móviles (320px a 768px) con 0 desplazamiento horizontal (`scrollWidth <= clientWidth`).
- [x] **Tarea 4.5**: Aprobación de verificación interactiva en vivo por el usuario.

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
