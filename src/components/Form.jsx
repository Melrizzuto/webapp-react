import { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // aggiungo useParams per ottenere l'ID dalla URL
import styles from "./Form.module.css"; // stili personalizzati per il form
import { MovieContext } from "../context/MovieContext"; // importo il contesto

const initialData = {
    name: "",
    text: "",
    vote: "", // inizializzo i dati del form
};

function AddReview() {
    const { movie, fetchMovieDetails } = useContext(MovieContext); // uso il contesto per recuperare il film e la funzione per ricaricare i dettagli
    const [formData, setFormData] = useState(initialData);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // stato per gestire l'invio
    const { id } = useParams(); // prendo l'ID del film dalla URL

    if (!movie || !id) {
        return <p className="text-danger">errore: nessun film selezionato.</p>; // controllo se il film è disponibile
    }

    // URL base dell'API e endpoint dinamico
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiEndpoint = `${apiUrl}/movies/${id}/reviews`; // imposta l'endpoint per le recensioni

    // gestione dei cambiamenti nei campi del form
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // aggiorno i dati del form
    }

    // gestione delle stelle per la valutazione
    function handleRatingChange(rating) {
        setFormData({ ...formData, vote: rating }); // aggiorno la valutazione
    }

    // funzione di validazione del form
    function validateForm() {
        if (!formData.name || !formData.text || formData.vote < 1 || formData.vote > 5) {
            setError("tutti i campi sono obbligatori e la valutazione deve essere tra 1 e 5."); // errore se manca qualcosa nel form
            return false;
        }
        return true;
    }

    // gestione dell'invio del form
    function handleSubmit(e) {
        e.preventDefault();
        setError(null); // resetto eventuali errori
        setSuccess(null); // resetto eventuali successi
        setIsSubmitting(true); // disabilito il pulsante mentre invio la recensione

        if (!id) {
            setError("errore: nessun film selezionato.");
            setIsSubmitting(false); // riabilito il pulsante
            return;
        }

        if (!validateForm()) {
            setIsSubmitting(false); // riabilito il pulsante se la validazione fallisce
            return;
        }

        const reviewData = { ...formData, movie_id: id }; // aggiungo l'ID del film ai dati della recensione

        // invio la recensione al server
        axios
            .post(apiEndpoint, reviewData)
            .then((response) => {
                console.log("recensione creata:", response.data);
                setSuccess("recensione aggiunta con successo!");
                setFormData(initialData); // resetto il form

                // ricarico le recensioni del film dopo aver aggiunto la nuova
                fetchMovieDetails(id); // ricarico i dettagli e le recensioni del film
            })
            .catch((err) => {
                console.error("errore durante il salvataggio della recensione:", err);
                setError("si è verificato un errore durante l'invio. riprova.");
            })
            .finally(() => {
                setIsSubmitting(false); // riabilito il pulsante dopo il completamento dell'invio
            });
    }

    // render delle stelle per la valutazione
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= formData.vote ? styles.filledStar : styles.emptyStar} // controllo se la stella è piena o vuota
                    onClick={() => handleRatingChange(i)} // gestisco il click per cambiare la valutazione
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <section className="my-4 container">
            <h2>aggiungi nuova recensione</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="inserisci il tuo nome"
                        className="form-control"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="text">testo della recensione:</label>
                    <textarea
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        placeholder="scrivi la tua recensione qui..."
                        className="form-control"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>valutazione:</label>
                    <div className={styles.stars}>{renderStars()}</div> {/* visualizzo le stelle per la valutazione */}
                </div>

                {error && <p className="text-danger">{error}</p>} {/* mostro l'errore, se presente */}
                {success && <p className="text-success">{success}</p>} {/* mostro il messaggio di successo */}

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "invio in corso..." : "aggiungi recensione"} {/* testo del pulsante */}
                </button>
            </form>
        </section>
    );
}

export default AddReview;

