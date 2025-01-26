import styles from './About.module.css';

export default function About() {
    return (
        <div className={`d-flex ${styles.container}`}>
            <div className={`bg-white shadow rounded ${styles.card}`}>
                <h1 className="text-center text-dark mb-3">
                    Riguardo noi
                </h1>
                <p className="text-center text-secondary mb-4">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum ea officia eaque repellendus explicabo fugiat vitae, harum fugit ab ducimus expedita dolor ipsam deserunt quisquam, nam praesentium odit molestias eligendi?
                </p>
            </div>
        </div>
    );
}
