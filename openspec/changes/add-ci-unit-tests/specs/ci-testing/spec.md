## Purpose

Detectar automáticamente regresiones en el tablero Kanban ejecutando la suite de pruebas unitarias del proyecto en GitHub Actions ante cada push y pull request, sin depender de que un desarrollador las corra manualmente.

## ADDED Requirements

### Requirement: Ejecución automática de pruebas unitarias en push y pull request
El sistema SHALL ejecutar la suite de pruebas unitarias del proyecto (`npm run test`) mediante un workflow de GitHub Actions cada vez que se haga push a la rama principal (`master`) o se abra/actualice un pull request dirigido a `master`.

#### Scenario: Push a la rama principal
- **WHEN** se hace push de commits a la rama `master`
- **THEN** GitHub Actions dispara el workflow de pruebas y ejecuta la suite completa de pruebas unitarias

#### Scenario: Pull request hacia la rama principal
- **WHEN** se abre o actualiza un pull request cuya rama destino es `master`
- **THEN** GitHub Actions dispara el workflow de pruebas y ejecuta la suite completa de pruebas unitarias sobre el código del pull request

### Requirement: El workflow reporta el resultado de las pruebas como check
El sistema SHALL reportar el resultado de la ejecución de pruebas (éxito o fallo) como un check visible en el commit o pull request correspondiente, y SHALL finalizar con estado de fallo si cualquier prueba unitaria falla.

#### Scenario: Todas las pruebas pasan
- **WHEN** todas las pruebas unitarias ejecutadas en el workflow finalizan sin errores
- **THEN** el check del workflow se marca como exitoso (verde) en el commit o pull request

#### Scenario: Una o más pruebas fallan
- **WHEN** al menos una prueba unitaria falla durante la ejecución del workflow
- **THEN** el check del workflow se marca como fallido (rojo) en el commit o pull request y el job termina con código de salida distinto de cero

### Requirement: Entorno reproducible para ejecutar las pruebas
El sistema SHALL preparar un entorno con Node.js y las dependencias declaradas en `package.json` (instaladas de forma reproducible) antes de ejecutar la suite de pruebas.

#### Scenario: Instalación de dependencias antes de correr pruebas
- **WHEN** el workflow se ejecuta
- **THEN** primero instala las dependencias del proyecto de forma reproducible (usando el lockfile) y luego ejecuta `npm run test`
