export const PEOPLE = [
  { ini: 'MR', color: 'oklch(0.62 0.23 20)' },
  { ini: 'JL', color: 'oklch(0.62 0.2 255)' },
  { ini: 'AC', color: 'oklch(0.65 0.19 150)' },
  { ini: 'SV', color: 'oklch(0.6 0.24 320)' },
]

export const TAGS = {
  diseño: 'oklch(0.6 0.24 320)',
  frontend: 'oklch(0.62 0.2 255)',
  backend: 'oklch(0.65 0.19 150)',
  bug: 'oklch(0.62 0.23 20)',
  research: 'oklch(0.68 0.17 70)',
}

export const COLUMNS = [
  {
    id: 'backlog',
    title: 'Backlog',
    accent: 'oklch(0.6 0.24 320)',
    bg: '#f1ecf3',
    bgDark: 'oklch(0.25 0.06 320)',
  },
  {
    id: 'curso',
    title: 'En curso',
    accent: 'oklch(0.62 0.2 255)',
    bg: '#e9eef7',
    bgDark: 'oklch(0.25 0.06 255)',
  },
  {
    id: 'revision',
    title: 'Revisión',
    accent: 'oklch(0.68 0.17 70)',
    bg: '#f7f0e4',
    bgDark: 'oklch(0.25 0.05 70)',
  },
  {
    id: 'hecho',
    title: 'Hecho',
    accent: 'oklch(0.65 0.19 150)',
    bg: '#e7f2ea',
    bgDark: 'oklch(0.25 0.05 150)',
  },
]

const SEED_CARDS = {
  backlog: [
    ['Rediseñar el flujo de alta', 'diseño', 'MR', '12 sep', '5 pts'],
    ['Migrar tokens de color', 'frontend', 'JL', '15 sep', '3 pts'],
    ['Entrevistas con 6 usuarios', 'research', 'SV', '18 sep', '8 pts'],
  ],
  curso: [
    ['Vista de tablero en móvil', 'frontend', 'JL', 'hoy', '5 pts'],
    ['API de notificaciones', 'backend', 'AC', 'mañana', '8 pts'],
  ],
  revision: [
    ['Filtros guardados', 'frontend', 'MR', 'hoy', '3 pts'],
    ['Duplicado al arrastrar', 'bug', 'AC', 'hoy', '2 pts'],
  ],
  hecho: [
    ['Modo compacto', 'diseño', 'SV', '9 sep', '2 pts'],
    ['Búsqueda por etiqueta', 'backend', 'AC', '8 sep', '5 pts'],
    ['Atajos de teclado', 'frontend', 'JL', '5 sep', '3 pts'],
  ],
}

export function createSeedColumns() {
  let n = 100
  return COLUMNS.map((col) => ({
    ...col,
    cards: SEED_CARDS[col.id].map(([text, tag, who, due, pts]) => ({
      id: 'T-' + ++n,
      text,
      tag,
      due,
      pts,
      tagColor: TAGS[tag],
      who,
      whoColor: (PEOPLE.find((p) => p.ini === who) || PEOPLE[0]).color,
    })),
  }))
}
