import { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Aggiungi useParams per ottenere l'ID dalla URL
import styles from "./Form.module.css"; // Stili personalizzati per il form
import { MovieContext } from "../context/MovieContext"; // Importa il contesto

const initialData = {
    name: "",
    text: "",
    vote: "",
};

function AddReview() {
    const { movie, fetchMovieDetails } = useContext(MovieContext); // Aggiungi fetchMovieDetails al contesto
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = useParams();


    if (!movie || !id) {
        return <p className="text-danger">Errore: Nessun film selezionato.</p>;
    }

    // URL base dell'API e endpoint dinamico
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiEndpoint = `${apiUrl}/movies/${id}/reviews`;

    // Gestione dei cambiamenti nei campi del form
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Gestione delle stelle per il rating
    function handleRatingChange(rating) {
        setFormData({ ...formData, vote: rating });
    }

    // Funzione di validazione del form
    function validateForm() {
        if (!formData.name || !formData.text || formData.vote < 1 || formData.vote > 5) {
            setError("Tutti i campi sono obbligatori e la valutazione deve essere tra 1 e 5.");
            return false;
        }
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setIsSubmitting(true);

        if (!id) {
            setError("Errore: Nessun film selezionato.");
            setIsSubmitting(false);
            return;
        }

        if (!validateForm()) {
            setIsSubmitting(false);
            return;
        }

        const reviewData = { ...formData, movie_id: id };

        axios
            .post(apiEndpoint, reviewData)
            .then((response) => {
                console.log("Review creata:", response.data);
                setSuccess("Recensione aggiunta con successo!");
                setFormData(initialData);

                // Ricarica le recensioni del film dopo l'aggiunta
                fetchMovieDetails(id); // Ricarica le recensioni dal server
            })
            .catch((err) => {
                console.error("Errore durante il salvataggio della recensione:", err);
                setError("Si è verificato un errore durante l'invio. Riprova.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    // Render delle stelle
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= formData.vote ? styles.filledStar : styles.emptyStar}
                    onClick={() => handleRatingChange(i)}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <section className="my-4 container">
            <h2>Aggiungi nuova recensione</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Inserisci il tuo nome"
                        className="form-control"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="text">Testo della recensione:</label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="Scrivi la tua recensione qui..."
                        className="form-control"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Valutazione:</label>
                    <div className={styles.stars}>{renderStars()}</div>
                </div>

                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>} {/* Mostra il messaggio di successo */}

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Invio in corso..." : "Aggiungi recensione"}
                </button>
            </form>
        </section>
    );
}

export default AddReview;
