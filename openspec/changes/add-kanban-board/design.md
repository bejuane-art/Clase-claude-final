## Context

El diseño fuente (`Tablero Kanban.html`) es un export de Claude Design: un bundle de artifact que empaqueta una plantilla propietaria (`x-dc`, `sc-for`, `sc-if`, clase `DCLogic`) más fuentes en base64. No es código reutilizable directamente; se decodificó su `__bundler/template` para extraer estructura, estilos inline y lógica de estado, que sirven de referencia fiel para la reimplementación en React. Ver `proposal.md` para el motivo del cambio y `specs/kanban-board/spec.md` para el comportamiento requerido.

## Goals / Non-Goals

**Goals:**
- Reproducir fielmente look & feel del diseño: paleta `oklch()`, tipografías (IBM Plex Mono, Space Grotesk), radios, espaciados y microinteracciones (hover, drag).
- Implementar el comportamiento como estado de React "vanilla" (sin backend, sin persistencia).
- Mantener el código dentro de `src/`, sin dependencias nuevas de terceros.

**Non-Goals:**
- Persistencia de datos (localStorage, API, base de datos) — el estado vive solo en memoria del componente, igual que el diseño original.
- Reordenar tarjetas dentro de la misma columna (el diseño original solo soporta mover entre columnas).
- Edición de tarjetas existentes (solo alta y baja).
- Responsive/mobile más allá de scroll horizontal de columnas (el diseño original no lo contempla).

## Decisions

- **Un solo componente de pantalla**: `src/kanban/KanbanBoard.jsx`, con subcomponentes locales (`Column`, `Card`, `AddCardForm`) en el mismo árbol de carpeta `src/kanban/`, en vez de una librería de drag-and-drop (`react-beautiful-dnd`, `dnd-kit`, etc.). Razón: el diseño original usa drag-and-drop nativo de HTML5 (`draggable`, `onDragStart/onDragOver/onDrop`); replicar esa misma API evita una dependencia nueva y basta para el alcance (mover entre columnas, sin reordenar dentro de una columna).
- **Estado en un solo `useState` con la forma `{ columns, dragId, overColId }`**, calculando derivados (total, % progreso, límite WIP superado) en el render, igual que `renderVals()` en el diseño original. Alternativa descartada: `useReducer` — se prefiere `useState` simple porque las transiciones son pocas y planas (mover tarjeta, añadir, borrar, drag over/leave).
- **Datos seed embebidos** en un módulo `src/kanban/seedData.js` (personas, tags, columnas y tarjetas iniciales), copiados 1:1 del diseño para mantener fidelidad y trazabilidad frente al `.html` fuente.
- **Estilos**: CSS Modules (`KanbanBoard.module.css`) en vez de estilos inline (como en el `.dc.html` original) o CSS-in-JS. Razón: el proyecto Vite ya soporta CSS Modules sin configuración adicional y evita repetir cientos de `style={{...}}` en JSX; los valores de color/tipografía se llevan a variables CSS (`:root` / clase `.dark`) para reproducir el theming claro/oscuro del original sin duplicar reglas.
- **Tema claro/oscuro por clase en el contenedor raíz** (`.kanban.dark`) en vez de `prefers-color-scheme`, porque el diseño original expone un toggle manual independiente del tema del sistema.
- **Fuentes**: cargar IBM Plex Mono y Space Grotesk vía `<link>` a Google Fonts en `index.html` (igual mecanismo `@font-face` que usaba el original, pero a través del CDN de Google Fonts en vez de los `woff2` embebidos en base64 del bundle).
- **Colores**: se preservan literalmente los valores `oklch(...)` del diseño original (acentos de columna, tags, avatares) para no perder fidelidad cromática.

## Risks / Trade-offs

- [Drag-and-drop nativo de HTML5 tiene soporte táctil limitado] → Fuera de alcance (Non-Goal de mobile); aceptable porque el diseño original tampoco lo soportaba.
- [Duplicar valores de color entre variables CSS y JS (para estilos calculados dinámicamente, p. ej. color del tag) puede desincronizarse] → Centralizar todos los colores de dominio (tags, personas, columnas) en `seedData.js` como única fuente de verdad; las variables CSS solo cubren los tokens de tema (fondo, texto, superficies).
- [Google Fonts añade una dependencia de red externa] → Aceptado porque ya era el mecanismo de origen del diseño (`fonts.googleapis.com` / `fonts.gstatic.com` en el `<helmet>` del bundle).
