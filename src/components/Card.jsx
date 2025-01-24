import { Link } from "react-router-dom";
import styles from "./Card.module.css"; // Importa il file di stile per il modulo

function Card({ movie }) {
    return (
        <div className={`col-md-4 mb-4 ${styles.cardContainer}`}>
            <div className={`card h-100 ${styles.card}`}>
                {/* Inserisco un'immagine del film, usando l'URL passato dalla prop 'movie'. */}
                <img
                    src={movie.image}
                    className={`card-img-top ${styles.cardImage}`}
                    alt={movie.title}
                />
                <div className={`card-body ${styles.cardBody}`}>
                    <h5 className={`card-title ${styles.cardTitle}`}>{movie.title}</h5>
                    <p className={`card-text ${styles.cardAuthor}`}>
                        <strong>By {movie.author}</strong>
                    </p>
                    <p className={`card-text ${styles.cardAbstract}`}>
                        {movie.abstract}
                    </p>
                    {/* Link per vedere maggiori dettagli sul film */}
                    <Link to={`/movies/${movie.id}`} className={`btn ${styles.cardButton}`}>
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Card;
