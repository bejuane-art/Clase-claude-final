## Context

El repositorio no tiene ningún workflow bajo `.github/workflows/` (carpeta inexistente). Las pruebas ya existen y corren localmente con `npm run test` → `vitest run`, usando `jsdom` como entorno (configurado en `vite.config.js`) y `src/test/setup.js` como setup file. El proyecto no declara `engines.node` en `package.json`. Ver `proposal.md` - Why para la motivación.

## Goals / Non-Goals

**Goals:**
- Correr `npm run test` automáticamente en GitHub Actions ante push y pull request hacia `master`.
- Que el check falle claramente si una prueba falla, bloqueando la señal de "verde" en el PR.
- Instalación de dependencias reproducible (usar el lockfile existente).

**Non-Goals:**
- No se agrega cobertura de código (coverage) ni se publican reportes/artefactos.
- No se agrega matrix de múltiples versiones de Node ni de sistemas operativos (una sola versión, `ubuntu-latest`).
- No se agrega deploy, build de producción, ni linting al mismo workflow (fuera del alcance de "pruebas unitarias").
- No se modifica ningún código de `src/` ni las pruebas existentes.

## Decisions

- **Un solo job en `ubuntu-latest`**: es el runner estándar de GitHub Actions, más rápido y barato que alternativas; no hay motivo para Windows/macOS ya que las pruebas no dependen del SO.
- **Node.js 20 (LTS activa)**: el proyecto no fija una versión en `engines`; se elige la LTS activa al momento de este cambio para estabilidad con Vite 8 / Vitest 5, que requieren Node moderno. Alternativa considerada: usar `.nvmrc` — no existe en el repo, así que se fija la versión directamente en el workflow para simplicidad.
- **`actions/setup-node` con `cache: 'npm'`**: acelera runs sucesivos cacheando `~/.npm` en base al `package-lock.json`, sin depender de una acción de cache separada.
- **`npm ci` en vez de `npm install`**: instala exactamente lo que indica `package-lock.json`, de forma reproducible y más rápida en CI; falla si el lockfile está desincronizado, lo cual es la señal correcta.
- **Comando de test: `npm run test`**: reutiliza el script ya definido (`vitest run`), evitando duplicar lógica de invocación de Vitest en el workflow.
- **Triggers: `push` y `pull_request` sobre `branches: [master]`**: cubre tanto commits directos a `master` como pull requests dirigidos a esa rama, que es la rama principal actual del repo.

## Risks / Trade-offs

- [Riesgo] Fijar Node 20 manualmente puede desactualizarse con el tiempo → Mitigación: es una versión LTS con soporte largo; se puede actualizar el workflow cuando el proyecto lo requiera.
- [Riesgo] Si en el futuro el repo agrega más ramas de trabajo largas (ej. `develop`), el workflow no las cubriría → Mitigación: no aplica hoy (solo existe `master`); se puede ampliar `branches` más adelante sin cambiar el contrato de esta spec.
- [Trade-off] No incluir lint/build en este workflow mantiene el scope acotado a "pruebas unitarias" (según lo pedido), a costa de no tener una señal única de "todo verde"; puede agregarse en un cambio posterior.
