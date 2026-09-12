## Why

Se diseñó un tablero Kanban en Claude Design (exportado como `Tablero Kanban.html`, un bundle de artifact) para el equipo de producto. El proyecto React (Vite) creado en este repo todavía solo tiene la página de bienvenida por defecto; necesitamos reproducir ese diseño como una pantalla real de la app para que el equipo pueda gestionar tareas de sprint.

## What Changes

- Nueva pantalla de tablero Kanban en `src/`, montada como vista principal de la app.
- Header con: título "Tablero Kanban", subtítulo de sprint, toggle de tema claro/oscuro, barra de progreso (% de tareas en "Hecho") y avatares de personas del equipo.
- 4 columnas fijas: Backlog, En curso, Revisión, Hecho, cada una con acento de color y contador de tarjetas.
- Drag-and-drop de tarjetas entre columnas (HTML5 DnD).
- Límite WIP configurable en la columna "En curso": aviso visual cuando se supera.
- Tarjetas con: tag de categoría (color), id (`T-###`), texto, avatar de responsable, fecha límite, puntos, y botón de eliminar.
- Formulario inline para añadir una tarjeta nueva por columna (input + Enter/Escape + botones Añadir/Cancelar).
- Paleta de colores en `oklch()` y tipografías Google Fonts (IBM Plex Mono, Space Grotesk), fieles al diseño original.
- Datos de ejemplo (seed) iguales a los del diseño: mismas personas, tags y tarjetas iniciales por columna.

## Capabilities

### New Capabilities
- `kanban-board`: pantalla de tablero Kanban con columnas, tarjetas, drag-and-drop, límite WIP, alta/baja de tarjetas y tema claro/oscuro.

### Modified Capabilities
(ninguna — proyecto sin specs previas)

## Impact

- Código nuevo bajo `src/` (componente(s) de tablero, estilos, datos seed).
- `src/App.jsx` pasa a renderizar el tablero Kanban en lugar de la plantilla por defecto de Vite.
- Sin nuevas dependencias de terceros previstas (drag-and-drop nativo del navegador); fuentes cargadas vía Google Fonts como en el diseño original.
- Sin impacto en backend/API: los datos viven en estado de componente (in-memory), igual que en el diseño fuente.
