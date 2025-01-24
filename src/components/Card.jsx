import { Link } from "react-router-dom";

function Card({ movie }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                {/* Inserisco un'immagine del film, usando l'URL passato dalla prop 'movie'. */}
                <img
                    src={movie.image_url}
                    className="card-img-top"
                    alt={movie.title}
                />
                <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                        <strong>By {movie.author}</strong>
                    </p>
                    <p className="card-text">
                        {movie.abstract}
                    </p>
                    {/* Link per vedere maggiori dettagli sul film */}
                    <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                        See more
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Card;