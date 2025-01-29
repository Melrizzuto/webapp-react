import { useMovieContext } from "../context/MovieContext";
import Card from "./Card";

function MoviesList() {
    const { movies, isLoading, error } = useMovieContext();

    return (
        <div className="container mt-4">
            {isLoading ? (
                <p>caricamento in corso...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div className="row">
                    {movies.length === 0 ? (
                        <p>nessun film disponibile.</p>
                    ) : (
                        movies.map((movie) => <Card key={movie.id} movie={movie} />)
                    )}
                </div>
            )}
        </div>
    );
}

export default MoviesList;
