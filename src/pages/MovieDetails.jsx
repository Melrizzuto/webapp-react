import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MovieContext } from "../context/MovieContext";
import Form from "../components/Form";
import styles from './MovieDetails.module.css';

function MovieDetails() {
    const { id } = useParams(); // Si usa per recuperare l'id
    const { movie, reviews, loading, error, fetchMovieDetails } = useContext(MovieContext);

    // Recupera i dettagli del film e le recensioni quando il componente viene montato
    useEffect(() => {
        fetchMovieDetails(id); // Chiamata al fetch del contesto
    }, [id]); // dipendenza

    // Funzione per rendere le stelle
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

    if (error) {
        return <div className="container"><p className="text-danger">{error}</p></div>;
    }

    return (
        <div className={styles.movieDetails}>
            {movie ? (
                <>
                    <h1 className={styles.title}>{movie.title}</h1>
                    <h6 className='py-2'>By {movie.director}</h6>
                    {/* definisco l'URL dell'immagine dopo che movie è stato caricato */}
                    <img
                        src={`http://localhost:3000/images/${movie.image}`}
                        alt={movie.title}
                        className={styles.movieImage}
                    />
                    <p className={styles.description}>{movie.abstract}</p>

                    <h3 className={styles.reviewsTitle}>Recensioni</h3>
                    {reviews.length > 0 ? (
                        <ul className={styles.reviewsList}>
                            {reviews.map((review) => (
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


export default MovieDetails;