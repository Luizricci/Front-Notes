import styles from '../styles/NoteCard.module.css';

export default function NoteCard({ note, onEdit, onView, onDelete, onArchive }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleEdit = () => {
    if (onEdit) onEdit(note);
  };

  const handleView = () => {
    if (onView) onView(note);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(note.id);
  };

  const handleArchive = () => {
    if (onArchive) onArchive(note.id);
  };

  return (
    <div className={styles.noteCard}>
      <div className={styles.noteHeader}>
        <h3 className={styles.noteTitle}>
          {note.titulo || 'Nota sem título'}
        </h3>
        <p className={styles.noteDate}>
          📅 {formatDate(note.created_at)}
        </p>
      </div>

      <div className={styles.noteContent}>
        <div 
          className={styles.noteText}
          dangerouslySetInnerHTML={{ 
            __html: truncateContent(note.conteudo) 
          }}
        />
        
        <div className={styles.noteActions}>
          <button className={styles.btnEdit} onClick={handleEdit}>
            ✏️ Editar
          </button>
          <button className={styles.btnView} onClick={handleView}>
            👁️ Ver
          </button>
          <button 
            className={`${styles.btnArchive} ${note.arquivado ? styles.btnUnarchive : ''}`}
            onClick={handleArchive}
            title={note.arquivado ? 'Desarquivar nota' : 'Arquivar nota'}
          >
            {note.arquivado ? '📤 Desarquivar' : '📥 Arquivar'}
          </button>
          <button className={styles.btnDelete} onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}