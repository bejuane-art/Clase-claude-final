## 1. Workflow de GitHub Actions

- [ ] 1.1 Crear `.github/workflows/tests.yml` con triggers `push` y `pull_request` sobre `branches: [master]`, y verificar que el archivo es YAML válido
- [ ] 1.2 Configurar el job en `ubuntu-latest` con `actions/checkout` y `actions/setup-node` (Node.js 20, `cache: 'npm'`), y verificar que ambos steps quedan definidos antes del paso de instalación
- [ ] 1.3 Agregar el step `npm ci` para instalar dependencias de forma reproducible, y verificar que usa el `package-lock.json` existente
- [ ] 1.4 Agregar el step `npm run test` para ejecutar la suite de Vitest, y verificar que el job termina con código de salida distinto de cero si una prueba falla

## 2. Verificación

- [ ] 2.1 Ejecutar `npm run test` localmente y confirmar que las pruebas existentes (`KanbanBoard.test.jsx`, `seedData.test.js`) pasan con la configuración replicada en el workflow
- [ ] 2.2 Hacer push del workflow (o abrir un pull request) y confirmar en la pestaña "Actions" de GitHub que el workflow se dispara y el check reporta éxito
- [ ] 2.3 (Validación manual opcional) Introducir temporalmente una prueba que falle, confirmar que el workflow reporta el check en rojo, y revertir el cambio de prueba
