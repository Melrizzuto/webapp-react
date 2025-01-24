import { useState } from 'react';
import styles from './Form.module.css'; // Stili per il form

export default function Form({ onAddReview }) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);

    // Gestisce il cambiamento del testo della recensione
    const handleTextChange = (event) => {
        setReviewText(event.target.value);
    };

    // // Gestisce il cambiamento del voto (rating)
    // const handleRatingChange = (event) => {
    //     setRating(parseInt(event.target.value));
    // };

    // Gestisce l'invio del form
    const handleSubmit = (event) => {
        event.preventDefault();
        onAddReview(reviewText, rating);
        setReviewText('');
    };

    // Render delle stelle
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= rating ? styles.filledStar : styles.emptyStar}
                    onClick={() => setRating(i)}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="reviewText">Scrivi la tua recensione:</label>
                <textarea
                    id="reviewText"
                    value={reviewText}
                    onChange={handleTextChange}
                    placeholder="Inserisci la tua recensione qui..."
                    className={styles.textarea}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Valuta il film:</label>
                <div className={styles.stars}>{renderStars()}</div>
            </div>

            <button type="submit" className={styles.submitButton}>Aggiungi recensione</button>
        </form>
    );
}
