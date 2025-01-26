import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MovieContext } from "../context/MovieContext";
import Form from "../components/Form";
import styles from './MovieDetails.module.css';

function MovieDetails() {
    const { id } = useParams(); // Si usa per recuperare l'id dal parametro della rotta
    const { movie, reviews, loading, error, fetchMovieDetails } = useContext(MovieContext); // Ottieni i dati dal contesto

    useEffect(() => {
        fetchMovieDetails(id); // Chiamata al fetch del contesto per ottenere i dettagli del film
    }, [id]); // Quando l'id cambia, ricarica i dettagli

    // Funzione per rendere le stelle
    function renderStars(rating) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={i <= rating ? styles.filledStar : styles.emptyStar} // Imposta il colore delle stelle
                >
                    &#9733;
                </span>
            );
        }
        return stars;
    };

    // Se i dati sono in fase di caricamento
    if (loading) {
        return <div className="container"><p>Caricamento...</p></div>;
    }

    // Se c'è un errore
    if (error) {
        return <div className="container"><p className="text-danger">{error}</p></div>;
    }

    return (
        <div className={styles.movieDetails}>
            {movie ? (
                <>
                    <div className={styles.movieInfo}> {/* Sezione delle informazioni sul film */}
                        <h1 className={styles.title}>{movie.title}</h1>
                        <h6 className='py-2'>By {movie.director}</h6>
                        <img
                            src={`http://localhost:3000/images/${movie.image}`}
                            alt={movie.title}
                            className={styles.movieImage}
                        />
                        <p className={styles.description}>{movie.abstract}</p>
                    </div>

                    <div className={styles.reviews}> {/* Sezione delle recensioni */}
                        <h3 className={styles.reviewsTitle}>Recensioni</h3>
                        {reviews.length > 0 ? (
                            <ul className={styles.reviewsList}>
                                {reviews.map((review) => (
                                    <li key={review.id} className={styles.reviewItem}>
                                        <strong>{review.name}</strong>: {review.text}
                                        - {renderStars(review.vote)} {/* Mostra le stelle */}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nessuna recensione disponibile.</p>
                        )}

                        <Form /> {/* Form per aggiungere una recensione */}
                    </div>
                </>
            ) : (
                <p>Impossibile caricare i dettagli del film.</p>
            )}
        </div>
    );
}

export default MovieDetails;
