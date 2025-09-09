import { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from '../styles/NoteModal.module.css';

export default function NoteModal({ isOpen, onClose, onSave, note = null, mode = 'create' }) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (note && mode === 'edit') {
      setTitle(note.titulo || '');
      if (editorRef.current) {
        editorRef.current.setContent(note.conteudo || '');
      }
    } else if (mode === 'create') {
      setTitle('');
      if (editorRef.current) {
        editorRef.current.setContent('');
      }
    }
  }, [note, mode, isOpen]);

  const handleSave = async () => {
    if (!editorRef.current) return;

    const content = editorRef.current.getContent();
    const noteTitle = title.trim() || 'Nota sem título';

    if (!content || content.trim() === '' || content === '<p></p>') {
      alert('Por favor, escreva algo antes de salvar!');
      return;
    }

    setIsLoading(true);

    try {
      const noteData = {
        title: noteTitle,
        content: content,
        ...(mode === 'edit' && note ? { id: note.id } : {})
      };

      await onSave(noteData, mode);
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar nota. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    if (editorRef.current) {
      editorRef.current.setContent('');
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {mode === 'edit' ? '✏️ Editar Nota' : '✨ Nova Nota'}
          </h2>
          <button 
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* Campo de título */}
          <div className={styles.inputGroup}>
            <label htmlFor="noteTitle" className={styles.label}>
              📝 Título da Nota
            </label>
            <input
              id="noteTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da sua nota..."
              className={styles.titleInput}
            />
          </div>

          {/* Editor TinyMCE */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>📄 Conteúdo</label>
            
            <div className={styles.editorWrapper}>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue=""
                init={{
                  height: 350,
                  menubar: false,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style: `
                    body { 
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; 
                      font-size: 14px;
                      line-height: 1.6;
                      color: #374151;
                      padding: 12px;
                    }
                    p { margin-bottom: 12px; }
                    h1, h2, h3 { color: #1f2937; margin-top: 20px; margin-bottom: 12px; }
                  `,
                  skin: 'oxide',
                  content_css: 'default',
                  branding: false,
                  resize: false,
                  statusbar: false,
                  placeholder: 'Digite o conteúdo da sua nota aqui...'
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button 
            className={styles.cancelButton}
            onClick={handleClose}
            disabled={isLoading}
          >
            ❌ Cancelar
          </button>
          <button 
            className={styles.saveButton}
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? '💾 Salvando...' : '💾 Salvar Nota'}
          </button>
        </div>
      </div>
    </div>
  );
}
