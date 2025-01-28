import styles from './Loader.module.css';

export default function Loader() {
    return (
        <div className={styles.loader}>
            <span><i className="fa-solid fa-spinner fa-spin-pulse"></i></span>
        </div>
    );
}