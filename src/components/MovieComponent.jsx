import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import Card from "./Card";

function MoviesList() {
    const { movies, loading, error } = useContext(MovieContext);

    return (
        <div className="container mt-4">
            {loading ? (
                <p>Loading Movies...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div className="row">
                    {movies.length === 0 ? (
                        <p>No movies available.</p>
                    ) : (
                        movies.map((movie) => (
                            <Card key={movie.id} movie={movie} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default MoviesList;
