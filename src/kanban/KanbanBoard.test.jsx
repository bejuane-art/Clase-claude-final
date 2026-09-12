import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import KanbanBoard from './KanbanBoard'

function getColumn(id) {
  return screen.getByTestId(`column-${id}`)
}

beforeEach(() => {
  render(<KanbanBoard />)
})

describe('columnas del tablero', () => {
  it('renderiza las 4 columnas con su título y contador', () => {
    const expected = [
      ['backlog', 'Backlog', 3],
      ['curso', 'En curso', 2],
      ['revision', 'Revisión', 2],
      ['hecho', 'Hecho', 3],
    ]
    for (const [id, title, count] of expected) {
      const column = getColumn(id)
      expect(within(column).getByText(title)).toBeInTheDocument()
      expect(screen.getByTestId(`column-count-${id}`)).toHaveTextContent(String(count))
    }
  })
})

describe('tarjeta de tarea', () => {
  it('muestra id, tag, texto, responsable, fecha y puntos', () => {
    const backlog = getColumn('backlog')
    const card = within(backlog).getAllByTestId(/^card-/)[0]
    const scoped = within(card)
    expect(scoped.getByText('T-101')).toBeInTheDocument()
    expect(scoped.getByText('diseño')).toBeInTheDocument()
    expect(scoped.getByText('Rediseñar el flujo de alta')).toBeInTheDocument()
    expect(scoped.getByText('MR')).toBeInTheDocument()
    expect(scoped.getByText('12 sep')).toBeInTheDocument()
    expect(scoped.getByText('5 pts')).toBeInTheDocument()
  })
})

describe('mover tarjetas entre columnas', () => {
  it('mueve una tarjeta de Backlog a En curso al soltarla', () => {
    const backlog = getColumn('backlog')
    const curso = getColumn('curso')
    const card = within(backlog).getByTestId('card-T-101')

    fireEvent.dragStart(card)
    fireEvent.dragOver(curso)
    fireEvent.drop(curso)

    expect(within(curso).queryByTestId('card-T-101')).toBeInTheDocument()
    expect(within(getColumn('backlog')).queryByTestId('card-T-101')).not.toBeInTheDocument()
  })

  it('no mueve la tarjeta si el arrastre se cancela sin soltar', () => {
    const backlog = getColumn('backlog')
    const card = within(backlog).getByTestId('card-T-101')

    fireEvent.dragStart(card)
    fireEvent.dragEnd(card)

    expect(within(getColumn('backlog')).queryByTestId('card-T-101')).toBeInTheDocument()
  })
})

describe('añadir tarjeta a una columna', () => {
  it('crea una tarjeta con texto no vacío al confirmar', async () => {
    const user = userEvent.setup()
    const backlog = getColumn('backlog')
    await user.click(within(backlog).getByText('+ Añadir tarea'))
    await user.type(within(backlog).getByPlaceholderText('Nueva tarea…'), 'Nueva tarea de prueba')
    await user.click(within(backlog).getByText('Añadir'))

    expect(within(getColumn('backlog')).getByText('Nueva tarea de prueba')).toBeInTheDocument()
    expect(screen.getByTestId('column-count-backlog')).toHaveTextContent('4')
  })

  it('no crea ninguna tarjeta al cancelar', async () => {
    const user = userEvent.setup()
    const backlog = getColumn('backlog')
    await user.click(within(backlog).getByText('+ Añadir tarea'))
    await user.type(within(backlog).getByPlaceholderText('Nueva tarea…'), 'Se va a cancelar')
    await user.click(within(backlog).getByText('Cancelar'))

    expect(screen.queryByText('Se va a cancelar')).not.toBeInTheDocument()
    expect(screen.getByTestId('column-count-backlog')).toHaveTextContent('3')
  })

  it('no crea ninguna tarjeta al confirmar sin texto', async () => {
    const user = userEvent.setup()
    const backlog = getColumn('backlog')
    await user.click(within(backlog).getByText('+ Añadir tarea'))
    await user.click(within(backlog).getByText('Añadir'))

    expect(screen.getByTestId('column-count-backlog')).toHaveTextContent('3')
  })
})

describe('eliminar tarjeta', () => {
  it('elimina la tarjeta de su columna y del total', () => {
    expect(screen.getByText(/10 tareas en total/)).toBeInTheDocument()
    const card = screen.getByTestId('card-T-101')
    fireEvent.click(within(card).getByLabelText('Eliminar tarjeta'))

    expect(screen.queryByTestId('card-T-101')).not.toBeInTheDocument()
    expect(screen.getByTestId('column-count-backlog')).toHaveTextContent('2')
    expect(screen.getByText(/9 tareas en total/)).toBeInTheDocument()
  })
})

describe('límite de trabajo en curso (WIP)', () => {
  it('no muestra aviso cuando está dentro del límite', () => {
    expect(screen.queryByTestId('wip-warning-curso')).not.toBeInTheDocument()
  })

  it('muestra aviso al superar el límite', async () => {
    const user = userEvent.setup()
    const curso = getColumn('curso')
    for (let i = 0; i < 2; i++) {
      await user.click(within(curso).getByText('+ Añadir tarea'))
      await user.type(within(curso).getByPlaceholderText('Nueva tarea…'), `Extra ${i}`)
      await user.click(within(curso).getByText('Añadir'))
    }

    expect(screen.getByTestId('wip-warning-curso')).toBeInTheDocument()
  })
})

describe('progreso del sprint', () => {
  it('calcula el porcentaje de tarjetas en Hecho sobre el total', () => {
    expect(screen.getByTestId('progress-pct')).toHaveTextContent('30%')
  })

  it('muestra 0% cuando no hay tarjetas', () => {
    for (const testId of screen.getAllByTestId(/^card-/).map((el) => el.dataset.testid)) {
      const card = screen.queryByTestId(testId)
      if (card) fireEvent.click(within(card).getByLabelText('Eliminar tarjeta'))
    }
    expect(screen.getByTestId('progress-pct')).toHaveTextContent('0%')
  })
})

describe('alternar tema claro/oscuro', () => {
  it('cambia el tema al activar el toggle', async () => {
    const user = userEvent.setup()
    expect(screen.getByTestId('board')).toHaveAttribute('data-theme', 'light')

    await user.click(screen.getByTestId('theme-toggle'))

    expect(screen.getByTestId('board')).toHaveAttribute('data-theme', 'dark')
  })
})
