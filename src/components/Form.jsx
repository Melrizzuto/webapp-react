import { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // prendo l'id dalla url
import styles from "./Form.module.css"; // importo gli stili personalizzati per il form
import { MovieContext } from "../context/MovieContext"; // uso il contesto per ottenere i dettagli del film

const initialData = {
    name: "",
    text: "",
    vote: "", // inizializzo i dati del form
};

function AddReview() {
    const { movie, fetchMovieDetails } = useContext(MovieContext); // recupero il film e la funzione per ricaricare i dettagli
    const [formData, setFormData] = useState(initialData);
    const [isFormValid, setIsFormValid] = useState(false); // stato per controllare se il form è valido
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // stato per gestire l'invio
    const { id } = useParams(); // prendo l'id del film dalla url

    if (!movie || !id) {
        return <p className="text-danger">errore: nessun film selezionato.</p>; // controllo se il film è disponibile
    }

    // imposto l'url base dell'api e l'endpoint dinamico per le recensioni
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiEndpoint = `${apiUrl}/movies/${id}/reviews`;

    // funzione per aggiornare i dati del form quando l'utente digita nei campi di input
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // funzione per aggiornare la valutazione in base al numero di stelle cliccato
    function handleRatingChange(rating) {
        setFormData({ ...formData, vote: rating });
    }

    // funzione per validare il form prima dell'invio
    function validateForm() {
        if (!formData.name || !formData.text || formData.vote < 1 || formData.vote > 5) {
            setError("tutti i campi sono obbligatori e la valutazione deve essere tra 1 e 5.");
            setIsFormValid(false); // imposto il form come non valido
            return false;
        }
        setIsFormValid(true); // imposto il form come valido
        return true;
    }

    // funzione per gestire l'invio del form
    function handleSubmit(e) {
        e.preventDefault();
        setError(null); // resetto eventuali errori
        setSuccess(null); // resetto eventuali messaggi di successo
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

        const reviewData = { ...formData, movie_id: id }; // aggiungo l'id del film ai dati della recensione

        if (!e.target.checkValidity()) {
            return;
        }

        // invio la recensione al server
        axios
            .post(apiEndpoint, reviewData)
            .then((response) => {
                console.log("recensione creata:", response.data);
                setSuccess("recensione aggiunta con successo!");
                setFormData(initialData); // resetto il form
                setIsFormValid(false); // imposto il form come non valido

                // ricarico i dettagli del film e le recensioni
                fetchMovieDetails(id);
            })
            .catch((err) => {
                console.error("errore durante il salvataggio della recensione:", err);
                setError("si è verificato un errore durante l'invio. riprova.");
            })
            .finally(() => {
                setIsSubmitting(false); // riabilito il pulsante dopo l'invio
            });
    }

    // funzione per visualizzare le stelle per la valutazione
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= formData.vote ? styles.filledStar : styles.emptyStar} // controllo se la stella è piena o vuota
                    onClick={() => handleRatingChange(i)} // aggiorno la valutazione cliccando sulle stelle
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    return (
        <section className="my-4 container">
            <h2>Aggiungi una nuova recensione</h2>
            <form onSubmit={handleSubmit} className={`needs-validation ${isFormValid ? "was-validated" : ""} noValidate {styles.form}`}>
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
                        required
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
                        required
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

