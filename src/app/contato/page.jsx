"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import { useState } from "react";
import styles from './contato.module.css';
import axios from "axios";

export default function Contato() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        cidade: "",
        telefone: "",
        mensagem: ""
    });
    const [loading, setLoading] = useState(false);
    const [addedContact, setAddedContact] = useState([]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
                nome: form.nome.trim(),
                email: form.email.trim(),
                cidade: form.cidade.trim(),
                telefone: form.telefone.trim(),
                mensagem: form.mensagem.trim()
            });
            setAddedContact([response.data, ...addedContact]);
            setForm({ nome: "", email: "", cidade: "", telefone: "", mensagem: "" });
            console.log("Formulário enviado com sucesso:", response.data);
            alert("Mensagem enviada com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
            alert("Erro ao enviar mensagem. Verifique sua conexão e tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    const atualizarInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }



    return (
        <div>
            <Header />
            <FloatingButton 
                onClick={() => window.location.href = '/home'}
                icon="back"
                tooltip="Voltar para Home"
            />
            <div className={styles.container}>
                <h1 className={styles.title}>Contato</h1>
            </div>
            <div className={styles.formContainer}>
                <form action="" method="post" className={styles.form}>
                    <input 
                        type="text" 
                        name="nome"
                        placeholder="Nome"
                        value={form.nome}
                        onChange={atualizarInput}
                        className={styles.input} 
                        required 
                        />

                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={form.email}
                        onChange={atualizarInput}
                        className={styles.input} 
                        required 
                        />

                    <input 
                        type="text" 
                        name="cidade"
                        placeholder="Cidade" 
                        value={form.cidade}
                        onChange={atualizarInput}
                        className={styles.input} 
                        required 
                        />

                    <input 
                        type="tel" 
                        name="telefone"
                        placeholder="Telefone" 
                        value={form.telefone}
                        onChange={atualizarInput}
                        className={styles.input} 
                        required 
                        />

                    <textarea 
                        name="mensagem"
                        placeholder="Mensagem"
                        value={form.mensagem}
                        onChange={atualizarInput}
                        className={styles.textarea} 
                        required
                        />

                    <button type="submit" className={styles.button} onClick={handleSubmit} disabled={loading}>
                        {loading ? "Enviando..." : "Enviar Mensagem"}
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}