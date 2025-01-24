import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ movie }) {
    // url completo dell'immagine
    const imageUrl = `http://localhost:3000/images/${movie.image}`;

    return (
        <div className={`col-md-4 mb-4 ${styles.cardContainer}`}>
            <div className={`card h-100 ${styles.card}`}>
                {/* Inserisco l'immagine con il percorso completo */}
                <img
                    src={imageUrl} // Usa l'URL completo
                    className={`card-img-top ${styles.cardImage}`}
                    alt={movie.title}
                />
                <div className={`card-body ${styles.cardBody}`}>
                    <h5 className={`card-title ${styles.cardTitle}`}>{movie.title}</h5>
                    <p className={`card-text ${styles.cardAuthor}`}>
                        <strong>By {movie.director}</strong>
                    </p>
                    <p className={`card-text ${styles.cardAbstract}`}>
                        {movie.abstract}
                    </p>
                    <Link to={`/movies/${movie.id}`} className={`btn ${styles.cardButton}`}>
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Card;