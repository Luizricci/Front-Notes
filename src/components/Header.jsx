import styles from '../styles/Header.module.css';

export default function Header() {
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerText} onClick={() => window.location.href = '/home'}>
          <h1 className={styles.title}>📝 Minhas Notas</h1>
        </div>
      </div>
    </header>
  );
}