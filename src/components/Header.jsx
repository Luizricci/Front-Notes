import styles from '../styles/Header.module.css';

export default function Header({ notesCount, onNewNote }) {
  const handleNewNote = () => {
    if (onNewNote) onNewNote();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>📝 Minhas Notas</h1>
          <p className={styles.subtitle}>
            {notesCount > 0 
              ? `${notesCount} nota${notesCount !== 1 ? 's' : ''} encontrada${notesCount !== 1 ? 's' : ''}`
              : 'Nenhuma nota encontrada'
            }
          </p>
        </div>
        <button className={styles.btnPrimary} onClick={handleNewNote}>
          ➕ Nova Nota
        </button>
      </div>
    </header>
  );
}