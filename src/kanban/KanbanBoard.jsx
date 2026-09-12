import { useState } from 'react'
import styles from './KanbanBoard.module.css'
import Column from './Column'
import { PEOPLE, createSeedColumns } from './seedData'

const WIP_LIMIT = 3
const WIP_COLUMN_ID = 'curso'

function lastSeedId(columns) {
  const ids = columns.flatMap((c) => c.cards.map((card) => Number(card.id.slice(2))))
  return ids.length ? Math.max(...ids) : 100
}

export default function KanbanBoard() {
  const [state, setState] = useState(() => {
    const columns = createSeedColumns()
    return {
      columns,
      dragId: null,
      overColId: null,
      addingColId: null,
      draft: '',
      seq: lastSeedId(columns),
      dark: false,
    }
  })

  const total = state.columns.reduce((sum, c) => sum + c.cards.length, 0)
  const done = (state.columns.find((c) => c.id === 'hecho') || { cards: [] }).cards.length
  const pct = total ? Math.round((done / total) * 100) : 0

  function moveCardTo(colId) {
    const dragId = state.dragId
    if (!dragId) return
    setState((s) => {
      let moved = null
      const columns = s.columns.map((c) => ({
        ...c,
        cards: c.cards.filter((card) => {
          if (card.id === dragId) {
            moved = card
            return false
          }
          return true
        }),
      }))
      if (!moved) return { ...s, overColId: null, dragId: null }
      return {
        ...s,
        columns: columns.map((c) => (c.id === colId ? { ...c, cards: [...c.cards, moved] } : c)),
        overColId: null,
        dragId: null,
      }
    })
  }

  function addCardTo(colId) {
    setState((s) => {
      const text = s.draft.trim()
      if (!text) return { ...s, addingColId: null, draft: '' }
      const id = 'T-' + (s.seq + 1)
      const card = {
        id,
        text,
        tag: 'diseño',
        tagColor: 'oklch(0.6 0.24 320)',
        who: PEOPLE[0].ini,
        whoColor: PEOPLE[0].color,
        due: 'sin fecha',
        pts: '3 pts',
      }
      return {
        ...s,
        seq: s.seq + 1,
        draft: '',
        addingColId: null,
        columns: s.columns.map((c) => (c.id === colId ? { ...c, cards: [...c.cards, card] } : c)),
      }
    })
  }

  function deleteCard(cardId) {
    setState((s) => ({
      ...s,
      columns: s.columns.map((c) => ({ ...c, cards: c.cards.filter((card) => card.id !== cardId) })),
    }))
  }

  const dark = state.dark

  return (
    <div className={`${styles.board} ${dark ? styles.dark : ''}`} data-testid="board" data-theme={dark ? 'dark' : 'light'}>
      <div className={styles.header}>
        <div>
          <div className={`${styles.eyebrow} ${styles.mono}`}>Sprint 14 · equipo producto</div>
          <h1 className={styles.title}>Tablero Kanban</h1>
        </div>
        <div className={styles.headerControls}>
          <button
            type="button"
            className={styles.themeToggle}
            data-testid="theme-toggle"
            onClick={() => setState((s) => ({ ...s, dark: !s.dark }))}
          >
            <span className={styles.themeDot} />
            {dark ? 'Claro' : 'Oscuro'}
          </button>
          <div className={styles.progress}>
            <span className={`${styles.progressLabel} ${styles.mono}`}>avance</span>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.progressPct} data-testid="progress-pct">
              {pct}%
            </span>
          </div>
          <div className={styles.avatars}>
            {PEOPLE.map((p) => (
              <div key={p.ini} className={styles.avatar} style={{ background: p.color }}>
                {p.ini}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.columns}>
        {state.columns.map((col) => {
          const overLimit = col.id === WIP_COLUMN_ID && col.cards.length > WIP_LIMIT
          const isOver = state.overColId === col.id
          return (
            <Column
              key={col.id}
              column={{
                ...col,
                bg: isOver ? (dark ? '#262232' : '#fffdf8') : dark ? col.bgDark : col.bg,
                overLimit,
              }}
              isOver={isOver}
              isAdding={state.addingColId === col.id}
              draft={state.draft}
              dragId={state.dragId}
              onDragOver={(e) => {
                e.preventDefault()
                if (state.overColId !== col.id) setState((s) => ({ ...s, overColId: col.id }))
              }}
              onDragLeave={() => {
                if (state.overColId === col.id) setState((s) => ({ ...s, overColId: null }))
              }}
              onDrop={(e) => {
                e.preventDefault()
                moveCardTo(col.id)
              }}
              onStartAdd={() => setState((s) => ({ ...s, addingColId: col.id, draft: '' }))}
              onCommitAdd={() => addCardTo(col.id)}
              onCancelAdd={() => setState((s) => ({ ...s, addingColId: null, draft: '' }))}
              onDraftChange={(e) => setState((s) => ({ ...s, draft: e.target.value }))}
              onDraftKeyDown={(e) => {
                if (e.key === 'Enter') addCardTo(col.id)
                if (e.key === 'Escape') setState((s) => ({ ...s, addingColId: null, draft: '' }))
              }}
              onCardDragStart={(cardId) => setState((s) => ({ ...s, dragId: cardId }))}
              onCardDragEnd={() => setState((s) => ({ ...s, dragId: null, overColId: null }))}
              onDeleteCard={deleteCard}
            />
          )
        })}
      </div>

      <div className={`${styles.footer} ${styles.mono}`}>
        arrastra las tarjetas entre columnas · {total} tareas en total
      </div>
    </div>
  )
}
