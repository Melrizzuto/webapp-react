import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Form from "../pages/Form";
import styles from './MovieDetails.module.css';

export default function MovieDetails() {
    const { id } = useParams(); //si usa per recuperare l'id 
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // ottengo i dettagli del film e le recensioni dal backend quando il componente è montato
    useEffect(() => {
        axios
            .get(`http://localhost:3000/movies/${id}`)
            .then((response) => {
                setMovie(response.data.item);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Errore nel recuperare i dettagli del film:", error);
                setLoading(false);
            });
    }, [id]); // dependences

    // fn per renderizzare le stelle
    const renderStars = (rating) => {
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
        return <p>Caricamento...</p>;
    }

    return (
        <div className={styles.movieDetails}>
            <h1 className={styles.title}>{movie.title}</h1>
            <img
                src={movie.coverImage}
                alt={movie.title}
                className={styles.bookImage}
            />
            <p className={styles.description}>{movie.description}</p>

            <h3 className={styles.reviewsTitle}>Recensioni:</h3>
            <ul className={styles.reviewsList}>
                {movie.reviews.map((review) => (
                    <li key={review.id} className={styles.reviewItem}>
                        <strong>{review.user}:</strong> {review.comment}
                        <div className={styles.stars}>{renderStars(review.rating)}</div>
                    </li>
                ))}
            </ul>

            <h4 className={styles.addReviewTitle}>Aggiungi una recensione:</h4>
            <Form />
        </div>
    );
}

