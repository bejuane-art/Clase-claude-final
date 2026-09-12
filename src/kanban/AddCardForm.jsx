import styles from './KanbanBoard.module.css'

export default function AddCardForm({ accent, value, onChange, onKeyDown, onCommit, onCancel }) {
  return (
    <div className={styles.addForm} style={{ borderColor: accent }}>
      <input
        className={styles.addInput}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Nueva tarea…"
        autoFocus
      />
      <div className={styles.addActions}>
        <button type="button" className={styles.addBtn} style={{ background: accent }} onClick={onCommit}>
          Añadir
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </div>
  )
}
