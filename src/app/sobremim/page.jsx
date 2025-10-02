"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FloatingButton from "@/components/FloatingButton";
import styles from './sobre.module.css';

export default function SobreMim() {
  return (
    <div>
        <Header />
        <FloatingButton 
            onClick={() => window.location.href = '/home'}
            icon="back"
            tooltip="Voltar para Home"
        />
        
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    <span className={styles.avatarEmoji}>👨‍💻</span>
                </div>
                
                <h1 className={styles.name}>Luiz Henrique</h1>
                <p className={styles.role}>Desenvolvedor Frontend</p>
                
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>📚 Formação</h2>
                    <p className={styles.text}>
                        Estou cursando um técnico em desenvolvimento de sistemas.
                        Tenho conhecimentos em HTML, CSS, JavaScript e frameworks como React.
                    </p>
                </div>
                
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>💡 Interesses</h2>
                    <p className={styles.text}>
                        Apaixonado por tecnologia, gosto muito de Back-End e desenvolvimento de APIs.
                        Gosto Tambem de desenvolver em menor parte o Front-End.
                    </p>
                </div>
                
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>🎯 Objetivos Profissionais</h2>
                    <p className={styles.text}>
                        Meu objetivo é me tornar um desenvolvedor full-stack completo,
                        contribuindo para projetos que impactem positivamente a vida das pessoas.
                    </p>
                </div>
            </div>
        </div>
        
        <Footer />
    </div>
  );
}