import styles from "./Footer.module.css"; // Importa il file di stile

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className={styles.content}>
          <span className={styles.text}>© Fatto con &hearts; da Melania</span>
        </div>
      </div>
    </footer>
  );
}