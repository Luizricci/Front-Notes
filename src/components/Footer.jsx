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
    </footer>
  );
}