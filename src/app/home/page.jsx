"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './home.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NoteCard from '../../components/NoteCard';
import NoteModal from '../../components/NoteModal';
import FloatingButton from '../../components/FloatingButton';

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' ou 'edit'
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await axios(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
        setData(result.data);
        console.log(result.data);
      } catch (err) {
        setError('Erro ao carregar notas');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNewNote = () => {
    setModalMode('create');
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setModalMode('edit');
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleViewNote = (note) => {
    router.push(`/home/${note.id}`);
  };

  const handleSaveNote = async (noteData, mode) => {
    try {
      if (mode === 'create') {
        // Criar nova nota
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notes`, {
          titulo: noteData.title,
          conteudo: noteData.content
        });
        
        // Adicionar nova nota à lista
        setData(prevData => [response.data, ...prevData]);
      } else if (mode === 'edit') {
        // Editar nota existente
        const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteData.id}`, {
          titulo: noteData.title,
          conteudo: noteData.content
        });
        
        // Atualizar nota na lista
        setData(prevData => 
          prevData.map(note => 
            note.id === noteData.id ? response.data : note
          )
        );
      }
    } catch (error) {
      console.error('Erro ao salvar nota:', error);
      throw error; // Re-throw para que o modal possa tratar o erro
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/notes/${noteId}`);
        // Atualizar a lista removendo a nota excluída
        setData(prevData => prevData.filter(note => note.id !== noteId));
        console.log('Nota excluída com sucesso');
      } catch (err) {
        console.error('Erro ao excluir nota:', err);
        alert('Erro ao excluir nota. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Carregando suas notas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${styles.errorContainer}`}>
        <div className={styles.errorContent}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2 className={styles.errorTitle}>Ops! Algo deu errado</h2>
          <p className={styles.errorMessage}>{error}</p>
          <button 
            className={styles.btnRetry} 
            onClick={() => window.location.reload()}
          >
            🔄 Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header notesCount={data?.length || 0} />
      
      <FloatingButton onClick={handleNewNote} />

      <main className={styles.mainContent}>
        {data && data.length > 0 ? (
          <div className={styles.notesGrid}>
            {data.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onView={handleViewNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <h2 className={styles.emptyTitle}>Nenhuma nota encontrada</h2>
            <p className={styles.emptyText}>
              Que tal criar sua primeira nota? Comece a organizar seus pensamentos e ideias!
            </p>
            <button className={styles.btnPrimaryLarge} onClick={handleNewNote}>
              ➕ Criar Primeira Nota
            </button>
          </div>
        )}
      </main>

      <Footer />

      {/* Modal para criar/editar notas */}
      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        note={currentNote}
        mode={modalMode}
      />
    </div>
  );
}