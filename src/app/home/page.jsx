"use client";

import styles from "./home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function Home() {

  const [notes, setNotes] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Comece a escrever sua nota aqui...</p>',
    immediatelyRender: false, 
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('Conteúdo atualizado:', html);
    },
  });

  useEffect(() => {
    const fetchNotes = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notes`);
            setNotes(response.data);
            console.log(response.data);
        }catch (error) {
            console.error("Erro ao buscar notas:", error);
        }
    }

    fetchNotes();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo ao Web Notes</h1>
      <p className={styles.description}>Anotações rápidas na web</p>
      
      <div className={styles.editorContainer}>
        <h2>Criar Nova Anotação</h2>
        
        <div className={styles.toolbar}>
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            disabled={!editor}
            className={editor?.isActive('bold') ? styles.isActive : ''}
          >
            <strong>B</strong>
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            disabled={!editor}
            className={editor?.isActive('italic') ? styles.isActive : ''}
          >
            <em>I</em>
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            disabled={!editor}
            className={editor?.isActive('strike') ? styles.isActive : ''}
          >
            <s>S</s>
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            disabled={!editor}
            className={editor?.isActive('bulletList') ? styles.isActive : ''}
          >
            • Lista
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            disabled={!editor}
            className={editor?.isActive('orderedList') ? styles.isActive : ''}
          >
            1. Lista
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
            disabled={!editor}
            className={editor?.isActive('heading', { level: 1 }) ? styles.isActive : ''}
          >
            H1
          </button>
          
          <button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            disabled={!editor}
            className={editor?.isActive('heading', { level: 2 }) ? styles.isActive : ''}
          >
            H2
          </button>
          
          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor}
          >
            ↶ Desfazer
          </button>
          
          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor}
          >
            ↷ Refazer
          </button>
        </div>

        <EditorContent editor={editor} className={styles.editor} />
        
        <div className={styles.preview}>
          <h3>Preview do HTML:</h3>
          <div className={styles.previewContent}>
            {editor?.getHTML() || '<p>Nenhum conteúdo ainda</p>'}
          </div>
        </div>
        
        <button className={styles.saveButton}>
          💾 Salvar Nota
        </button>
      </div>
    </div>
  )
}