import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <div className={styles.notFoundContent}>
                <h1 className={styles.heading}>404</h1>
                <p className={styles.message}>La pagina che stai cercando non esiste.</p>
                <Link to="/" className={styles.homeLink}>Torna alla Home</Link>
            </div>
        </div>
    );
}

export default NotFound;