## 1. Fuentes y base del proyecto

- [x] 1.1 Añadir los `<link>` de Google Fonts para IBM Plex Mono y Space Grotesk en `index.html` y verificar visualmente que se aplican (Network tab / DevTools muestra las fuentes cargadas)
- [x] 1.2 Crear la carpeta `src/kanban/` para el nuevo módulo

## 2. Datos seed

- [x] 2.1 Crear `src/kanban/seedData.js` con `PEOPLE`, `TAGS`, `COLUMNS` y las tarjetas iniciales por columna, copiados del diseño original, y verificar que el módulo exporta los 4 arrays/objetos sin errores de import
- [x] 2.2 Verificar que cada columna del seed tiene al menos una tarjeta y que las 5 categorías de tag y las 4 personas están representadas (Requirement: Datos iniciales del tablero)

## 3. Componentes de UI

- [x] 3.1 Crear `src/kanban/KanbanBoard.jsx` con el layout de header (título, subtítulo, toggle de tema, barra de progreso, avatares) y verificar que renderiza sin errores en `npm run dev`
- [x] 3.2 Crear `src/kanban/Column.jsx` para una columna (título, acento, contador, aviso de límite WIP, lista de tarjetas, botón "+ Añadir tarea") y verificar que se renderizan las 4 columnas con sus tarjetas seed
- [x] 3.3 Crear `src/kanban/Card.jsx` para una tarjeta (tag, id, texto, avatar responsable, fecha, puntos, botón eliminar) y verificar que muestra los 6 datos requeridos (Requirement: Tarjeta de tarea)
- [x] 3.4 Crear `src/kanban/AddCardForm.jsx` (input + botones Añadir/Cancelar) y verificar que aparece al pulsar "+ Añadir tarea" y desaparece al cancelar

## 4. Estado e interacciones

- [x] 4.1 Implementar el estado del tablero en `KanbanBoard.jsx` (columnas con tarjetas, id de tarjeta arrastrada, columna sobre la que se arrastra) y verificar en React DevTools que el estado inicial coincide con el seed
- [x] 4.2 Implementar drag-and-drop (`draggable`, `onDragStart`, `onDragOver`, `onDragLeave`, `onDrop`) para mover una tarjeta entre columnas y verificar manualmente arrastrando una tarjeta de "Backlog" a "En curso" (Requirement: Mover tarjetas entre columnas)
- [x] 4.3 Implementar resaltado visual de la columna destino durante el arrastre y verificar que solo la columna bajo el cursor se resalta
- [x] 4.4 Implementar alta de tarjeta (Enter/botón Añadir crea, Escape/Cancelar descarta, texto vacío no crea nada) y verificar los 3 escenarios manualmente (Requirement: Añadir tarjeta a una columna)
- [x] 4.5 Implementar eliminación de tarjeta y verificar que desaparece de su columna y del total (Requirement: Eliminar tarjeta)
- [x] 4.6 Implementar el límite WIP configurable para "En curso" con aviso visual cuando se supera, y verificar añadiendo tarjetas hasta superar el límite por defecto (Requirement: Límite de trabajo en curso)
- [x] 4.7 Implementar el cálculo de progreso (% de tarjetas en "Hecho" sobre el total) y el conteo total de tareas, y verificar el valor mostrado tras mover/añadir/eliminar tarjetas (Requirement: Progreso del sprint)
- [x] 4.8 Implementar el toggle de tema claro/oscuro y verificar que cambia los colores de fondo, texto y tarjetas de toda la pantalla (Requirement: Alternar tema claro/oscuro)

## 5. Estilos

- [x] 5.1 Crear `src/kanban/KanbanBoard.module.css` con variables de tema (claro/oscuro), tipografías, radios y espaciados fieles al diseño original, y verificar visualmente contra `Tablero Kanban.html` en ambos temas
- [x] 5.2 Aplicar los colores `oklch()` de columnas, tags y avatares de personas desde `seedData.js`, y verificar que coinciden con los del diseño original

## 6. Integración

- [x] 6.1 Montar `KanbanBoard` como vista principal en `src/App.jsx`, eliminando la plantilla por defecto de Vite, y verificar que `npm run dev` sirve el tablero en `/`
- [ ] 6.2 Revisión manual end-to-end: cargar la app, mover tarjetas entre las 4 columnas, añadir y borrar tarjetas, superar el límite WIP, alternar tema, y confirmar que el comportamiento coincide con todos los requirements de `specs/kanban-board/spec.md`

## 7. Pruebas unitarias

- [x] 7.1 Instalar y configurar Vitest + React Testing Library (`jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`) y añadir el script `npm test`, y verificar que `npm test` ejecuta (aunque sea 0 tests) sin errores de configuración
- [x] 7.2 Pruebas de `seedData.js`: cada columna seed tiene al menos una tarjeta, y las 5 categorías de tag y las 4 personas están representadas (Requirement: Datos iniciales del tablero), y verificar que `npm test` las reporta en verde
- [x] 7.3 Pruebas de columnas y tarjetas: se renderizan las 4 columnas en orden con su contador correcto (Requirement: Columnas del tablero), y una tarjeta muestra sus 6 datos (id, tag, texto, responsable, fecha, puntos) (Requirement: Tarjeta de tarea)
- [x] 7.4 Pruebas de mover tarjetas por drag-and-drop entre columnas, incluyendo que cancelar el arrastre no mueve la tarjeta (Requirement: Mover tarjetas entre columnas)
- [x] 7.5 Pruebas de añadir tarjeta: texto no vacío crea la tarjeta, cancelar no crea nada, confirmar vacío no crea nada (Requirement: Añadir tarjeta a una columna)
- [x] 7.6 Prueba de eliminar tarjeta: desaparece de su columna y del total (Requirement: Eliminar tarjeta)
- [x] 7.7 Pruebas de límite WIP: aviso visible al superar el límite en "En curso" y ausente dentro del límite (Requirement: Límite de trabajo en curso)
- [x] 7.8 Pruebas de progreso del sprint: porcentaje correcto con tarjetas y con tablero vacío (Requirement: Progreso del sprint)
- [x] 7.9 Prueba de alternar tema claro/oscuro (Requirement: Alternar tema claro/oscuro)
- [x] 7.10 Ejecutar la suite completa (`npm test`) y verificar que todas las pruebas pasan
