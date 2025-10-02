import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>💻 Web Notes - Seu bloco de notas digital</p>
        <p className={styles.footerSubtitle}>
          Organize suas ideias de forma simples e elegante
        </p>
      </div>
      <div className={styles.aboutLink} onClick={() => window.location.href = '/sobremim'}>
        <p className={styles.aboutText}>Sobre mim</p>
      </div>
      <div onClick={() => window.location.href = '/contato'} className={styles.contactLink}>
        <p className={styles.contactText}>Entre em contato</p>
      </div>
    </footer>
  );
}