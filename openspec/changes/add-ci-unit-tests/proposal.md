## Why

El proyecto ya cuenta con pruebas unitarias (Vitest + Testing Library) en `src/kanban/KanbanBoard.test.jsx` y `src/kanban/seedData.test.js`, pero solo se ejecutan manualmente con `npm run test`. No hay ninguna automatización que las corra en cada push o pull request, por lo que cambios que rompan el tablero Kanban pueden llegar a `master` sin detección temprana.

## What Changes

- Se agrega un workflow de GitHub Actions (`.github/workflows/tests.yml`) que instala dependencias y ejecuta `npm run test` (Vitest) en cada `push` y `pull_request` dirigidos a la rama principal (`master`).
- El workflow falla (bloquea el check) si alguna prueba unitaria falla.
- Se documenta el estado del pipeline (opcional: badge en README) para visibilidad del equipo.

## Capabilities

### New Capabilities
- `ci-testing`: Ejecución automatizada de pruebas unitarias en GitHub Actions ante push/PR a la rama principal, reportando el resultado como check del repositorio.

### Modified Capabilities
(ninguna — no se modifica comportamiento de specs existentes; el tablero Kanban no cambia)

## Impact

- Código afectado: nuevo archivo `.github/workflows/tests.yml`. No se modifica código de `src/`.
- Dependencias: usa las dependencias de test ya declaradas en `package.json` (`vitest`, `@testing-library/*`, `jsdom`); no se agregan nuevas dependencias npm.
- Sistemas: introduce uso de GitHub Actions en el repositorio `bejuane-art/Clase-claude-final` (no existía CI previamente).
