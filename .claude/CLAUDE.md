# CLAUDE.md

Este archivo da contexto a Claude Code al trabajar en este repositorio.

## Proyecto

Proyecto React creado con Vite (`npm create vite@latest -- --template react`).

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run preview` — preview del build
- `npm run lint` — linting (oxlint)

## Estructura

- `src/` — código fuente de la app
- `public/` — assets estáticos
- `index.html` — punto de entrada HTML

## Flujo de trabajo

Todo lo que se agregue al proyecto (features, cambios, refactors) debe hacerse
usando [OpenSpec](https://github.com/Fission-AI/OpenSpec): primero crear/actualizar
la spec correspondiente en `openspec/` y luego implementar en base a ella.

- `openspec/specs/` — specs vigentes del proyecto
- `openspec/changes/` — propuestas de cambio en curso
- Iniciar un cambio nuevo con el comando `/opsx:propose "descripción"`
- No implementar código nuevo sin una spec/propuesta de OpenSpec asociada
