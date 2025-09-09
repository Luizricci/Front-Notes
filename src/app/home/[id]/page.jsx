"use client";

import { useState, useEffect, use } from 'react';
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import styles from './[id].module.css'
import axios from 'axios';

export default function NotePage({ params }) {
  const { id } = use(params); 
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes/${id}`);
                setNote(response.data);
            } catch (err) {
                setError('Erro ao carregar a nota');
                console.error('Erro:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);
    return (
        <div className={styles.container}>
            <Link href="/home" className={styles.backButton}>
                <ArrowLeftOutlined />
            </Link>

            <Header notesCount={0} />
            
            <main className={styles.main}>
                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Carregando nota...</p>
                    </div>
                ) : error ? (
                    <div className={styles.error}>
                        <h2>😕 Ops! Algo deu errado</h2>
                        <p>{error}</p>
                        <Link href="/home" className={styles.backToHome}>
                            ← Voltar para home
                        </Link>
                    </div>
                ) : note ? (
                    <div className={styles.noteContainer}>
                        {/* Seção Header */}
                        <section className={styles.headerSection}>
                            <div className={styles.titleArea}>
                                <h1 className={styles.noteTitle}>{note.titulo}</h1>
                                <div className={styles.noteMetadata}>
                                    <span className={styles.noteDate}>
                                        📅 {new Date(note.createdAt || note.updatedAt || Date.now()).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Seção Conteúdo */}
                        <section className={styles.contentSection}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>📄 Conteúdo</h2>
                            </div>
                            <div className={styles.contentArea}>
                                <div 
                                    className={styles.htmlContent}
                                    dangerouslySetInnerHTML={{ __html: note.conteudo }}
                                />
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className={styles.notFound}>
                        <h2>📝 Nota não encontrada</h2>
                        <p>A nota que você está procurando não existe ou foi removida.</p>
                        <Link href="/home" className={styles.backToHome}>
                            ← Voltar para home
                        </Link>
                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
}
