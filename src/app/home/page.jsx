"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './home.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import NoteCard from '../../components/NoteCard';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    console.log('Nova nota clicada');
    // Aqui você pode navegar para a página de criação de nota
    // ou abrir um modal
  };

  const handleEditNote = (note) => {
    console.log('Editar nota:', note);
    // Aqui você pode navegar para a página de edição
    // ou abrir um modal com o editor
  };

  const handleViewNote = (note) => {
    console.log('Ver nota:', note);
    // Aqui você pode abrir a nota em modo de visualização
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
      <Header 
        notesCount={data?.length || 0} 
        onNewNote={handleNewNote} 
      />

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
    </div>
  );
}