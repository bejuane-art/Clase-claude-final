## Purpose

Ofrecer a un equipo de producto un tablero Kanban interactivo, con columnas de flujo de trabajo, tarjetas de tarea arrastrables y control de límite de trabajo en curso (WIP), para visualizar y gestionar el estado de las tareas de un sprint.

## ADDED Requirements

### Requirement: Columnas del tablero
El sistema SHALL mostrar exactamente 4 columnas fijas, en este orden: Backlog, En curso, Revisión, Hecho. Cada columna SHALL mostrar su título, un color de acento distintivo y un contador con el número de tarjetas que contiene.

#### Scenario: Conteo de tarjetas por columna
- **WHEN** una columna contiene N tarjetas
- **THEN** el contador de esa columna muestra N

### Requirement: Tarjeta de tarea
Cada tarjeta SHALL mostrar: un identificador único (formato `T-<número>`), una etiqueta de categoría con color propio, el texto de la tarea, un avatar con las iniciales de la persona responsable, una fecha límite y una estimación en puntos.

#### Scenario: Datos visibles de una tarjeta
- **WHEN** se renderiza una tarjeta con id, tag, texto, responsable, fecha y puntos
- **THEN** los seis datos son visibles en la tarjeta

### Requirement: Mover tarjetas entre columnas mediante arrastrar y soltar
El sistema SHALL permitir arrastrar una tarjeta desde su columna de origen y soltarla sobre otra columna, moviéndola al final de la lista de la columna destino. La columna sobre la que se arrastra SHALL indicar visualmente que es un destino válido mientras dura el arrastre.

#### Scenario: Soltar una tarjeta en otra columna
- **WHEN** el usuario arrastra una tarjeta de "Backlog" y la suelta sobre "En curso"
- **THEN** la tarjeta desaparece de "Backlog" y aparece al final de "En curso"

#### Scenario: Cancelar el arrastre
- **WHEN** el usuario inicia el arrastre de una tarjeta y lo cancela sin soltarla sobre una columna
- **THEN** la tarjeta permanece en su columna original

### Requirement: Límite de trabajo en curso (WIP)
El sistema SHALL permitir configurar un límite numérico de tarjetas para la columna "En curso". Cuando el número de tarjetas en esa columna supere el límite configurado, el sistema SHALL mostrar un aviso visual de límite superado en esa columna.

#### Scenario: Límite superado
- **WHEN** el número de tarjetas en "En curso" es mayor que el límite WIP configurado
- **THEN** la columna "En curso" muestra un aviso de "límite WIP superado"

#### Scenario: Dentro del límite
- **WHEN** el número de tarjetas en "En curso" es menor o igual al límite WIP configurado
- **THEN** la columna "En curso" no muestra ningún aviso de límite

### Requirement: Añadir tarjeta a una columna
El sistema SHALL permitir añadir una nueva tarjeta a cualquier columna mediante un formulario inline con un campo de texto. Confirmar con Enter o con el botón "Añadir" SHALL crear la tarjeta al final de esa columna con un id nuevo y único; cancelar con Escape o con el botón "Cancelar" SHALL descartar el formulario sin crear ninguna tarjeta. Enviar el formulario con el campo de texto vacío SHALL cerrar el formulario sin crear ninguna tarjeta.

#### Scenario: Añadir tarjeta con texto
- **WHEN** el usuario escribe un texto no vacío en el formulario de una columna y confirma
- **THEN** se crea una nueva tarjeta al final de esa columna con ese texto y un id único

#### Scenario: Cancelar la creación
- **WHEN** el usuario abre el formulario de nueva tarjeta y lo cancela
- **THEN** no se crea ninguna tarjeta y el formulario se cierra

#### Scenario: Confirmar sin texto
- **WHEN** el usuario confirma el formulario de nueva tarjeta sin haber escrito texto
- **THEN** no se crea ninguna tarjeta y el formulario se cierra

### Requirement: Eliminar tarjeta
El sistema SHALL permitir eliminar cualquier tarjeta de forma individual mediante un control en la propia tarjeta, sin pedir confirmación adicional.

#### Scenario: Eliminar una tarjeta existente
- **WHEN** el usuario activa el control de eliminar en una tarjeta
- **THEN** la tarjeta desaparece de su columna y del conteo total de tareas

### Requirement: Progreso del sprint
El sistema SHALL mostrar un indicador de progreso global calculado como el porcentaje de tarjetas que están en la columna "Hecho" respecto al total de tarjetas en el tablero. El sistema SHALL además mostrar el número total de tareas en el tablero.

#### Scenario: Cálculo de porcentaje
- **WHEN** el tablero tiene 10 tarjetas en total y 3 están en "Hecho"
- **THEN** el indicador de progreso muestra 30%

#### Scenario: Tablero vacío
- **WHEN** el tablero no tiene ninguna tarjeta
- **THEN** el indicador de progreso muestra 0%

### Requirement: Alternar tema claro/oscuro
El sistema SHALL permitir alternar entre un tema claro y un tema oscuro mediante un control visible en la cabecera del tablero. El tema activo SHALL determinar los colores de fondo, texto y superficies de toda la pantalla del tablero.

#### Scenario: Cambiar a tema oscuro
- **WHEN** el usuario activa el control de tema estando en modo claro
- **THEN** los colores de fondo, texto y tarjetas del tablero cambian al esquema oscuro

### Requirement: Datos iniciales del tablero
Al cargar por primera vez, el tablero SHALL mostrar un conjunto de tarjetas de ejemplo distribuidas entre las 4 columnas, cubriendo al menos una tarjeta por cada categoría de etiqueta (diseño, frontend, backend, bug, research) y por cada persona del equipo.

#### Scenario: Carga inicial
- **WHEN** el tablero se muestra por primera vez sin interacción previa del usuario
- **THEN** cada una de las 4 columnas contiene al menos una tarjeta de ejemplo
