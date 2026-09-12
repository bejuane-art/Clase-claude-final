import styles from './KanbanBoard.module.css'

export default function Card({ card, dragOpacity, onDragStart, onDragEnd, onDelete }) {
  return (
    <div
      className={styles.card}
      data-testid={`card-${card.id}`}
      style={{ opacity: dragOpacity }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={styles.cardTop}>
        <div className={styles.cardTag} style={{ background: card.tagColor }}>
          {card.tag}
        </div>
        <div className={styles.cardMeta}>
          <span className={`${styles.cardId} ${styles.mono}`}>{card.id}</span>
          <button type="button" className={styles.deleteBtn} onClick={onDelete} aria-label="Eliminar tarjeta">
            ×
          </button>
        </div>
      </div>
      <div className={styles.cardText}>{card.text}</div>
      <div className={styles.cardFooter}>
        <div className={styles.cardAvatar} style={{ background: card.whoColor }}>
          {card.who}
        </div>
        <span className={`${styles.cardDue} ${styles.mono}`}>{card.due}</span>
        <span className={`${styles.cardPts} ${styles.mono}`}>{card.pts}</span>
      </div>
    </div>
  )
}
