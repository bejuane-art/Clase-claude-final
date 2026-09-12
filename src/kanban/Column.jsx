import styles from './KanbanBoard.module.css'
import Card from './Card'
import AddCardForm from './AddCardForm'

export default function Column({
  column,
  isOver,
  isAdding,
  draft,
  dragId,
  onDragOver,
  onDragLeave,
  onDrop,
  onStartAdd,
  onCommitAdd,
  onCancelAdd,
  onDraftChange,
  onDraftKeyDown,
  onCardDragStart,
  onCardDragEnd,
  onDeleteCard,
}) {
  return (
    <div
      className={styles.column}
      data-testid={`column-${column.id}`}
      style={{ background: column.bg, borderColor: isOver ? column.accent : 'transparent' }}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className={styles.columnHeader}>
        <div className={styles.columnDot} style={{ background: column.accent }} />
        <div className={styles.columnTitle}>{column.title}</div>
        <div
          className={`${styles.columnCount} ${styles.mono}`}
          style={{ background: column.accent }}
          data-testid={`column-count-${column.id}`}
        >
          {column.cards.length}
        </div>
      </div>

      {column.overLimit && (
        <div className={`${styles.wipWarning} ${styles.mono}`} data-testid={`wip-warning-${column.id}`}>
          límite WIP superado
        </div>
      )}

      <div className={styles.cardList}>
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            dragOpacity={dragId === card.id ? 0.4 : 1}
            onDragStart={() => onCardDragStart(card.id)}
            onDragEnd={onCardDragEnd}
            onDelete={() => onDeleteCard(card.id)}
          />
        ))}
      </div>

      {isAdding && (
        <AddCardForm
          accent={column.accent}
          value={draft}
          onChange={onDraftChange}
          onKeyDown={onDraftKeyDown}
          onCommit={onCommitAdd}
          onCancel={onCancelAdd}
        />
      )}

      <button type="button" className={styles.startAddBtn} onClick={onStartAdd}>
        + Añadir tarea
      </button>
    </div>
  )
}
