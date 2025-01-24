import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Form from "./Form"
import axios from 'axios';
import styles from './MovieDetails.module.css'; // Importa il file CSS

export default function MovieDetails() {
    const { id } = useParams(); //si usa per recuperare l'id 
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);  // Stato per il caricamento

    // ottengo i dettagli del film e le recensioni dal backend quando il componente è montato
    useEffect(() => {
        setLoading(true); // Inizia il caricamento
        axios.get(`http://localhost:3000/movies/${id}`)
            .then(response => {
                setMovie(response.data.item);
                setReviews(response.data.item.reviews || []);  // Fallback se non ci sono recensioni
                setLoading(false);  // Imposta il caricamento a false quando i dati sono pronti
            })
            .catch(error => {
                console.error('Errore nel recuperare i dettagli del film:', error);
                setLoading(false);  // In ogni caso, termina il caricamento
            });
    }, [id]); // dependences

    // fn per renderizzare le stelle
    function renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= rating ? styles.filledStar : styles.emptyStar}
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    // Render della pagina
    if (loading) {
        return <div className="container"><p>Caricamento...</p></div>;
    }

    return (
        <div className={styles.movieDetails}>
            {movie ? (
                <>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <img
                        src={movie.coverImage}
                        alt={movie.title}
                        className={styles.bookImage}
                    />
                    <p className={styles.description}>{movie.description}</p>

                    <h3 className={styles.reviewsTitle}>Recensioni</h3>
                    {reviews.length > 0 ? (
                        <ul className={styles.reviewsList}>
                            {reviews.map(review => (
                                <li key={review.id} className={styles.reviewItem}>
                                    <strong>{review.name}</strong>: {review.text}
                                    - {renderStars(review.vote)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nessuna recensione disponibile.</p>
                    )}
                </>
            ) : (
                <p>Impossibile caricare i dettagli del film.</p>
            )}
            <Form />
        </div>

    );
};


