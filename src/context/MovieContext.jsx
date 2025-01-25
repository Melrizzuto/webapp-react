import { createContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext();

function MovieProvider({ children }) {
    const [movies, setMovies] = useState([]); // Stato per la lista dei film
    const [movie, setMovie] = useState(null); // Stato per il singolo film
    const [reviews, setReviews] = useState([]); // Stato per le recensioni
    const [loading, setLoading] = useState(false); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori

    // Funzione per recuperare la lista dei film (1° chiamata)
    function fetchMovies() {
        setLoading(true);
        setError(null); // Reset degli errori in caso di successo
        axios
            .get("http://localhost:3000/movies")
            .then((response) => {
                setMovies(response.data.results || []);
            })
            .catch((err) => {
                console.error("Errore nel recuperare la lista dei film:", err);
                setError("Si è verificato un errore nel recupero dei film.");
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // Funzione per recuperare i dettagli di un singolo film (2° chiamata)
    function fetchMovieDetails(id) {
        setLoading(true);
        setError(null); // Reset errore precedente
        axios
            .get(`http://localhost:3000/movies/${id}`)
            .then((response) => {
                setMovie(response.data.item);
                setReviews(response.data.item.reviews || []);
            })
            .catch((err) => {
                setError("Errore nel recuperare i dettagli del film.");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // Effettua il fetch della lista dei film quando il provider viene inizializzato
    useEffect(() => {
        fetchMovies();  // Chiamata per recuperare i dati dei film
    }, []); // si imposta l'array vuoto per effetturare il fetch solo una volta al primo montaggio del componente

    return (
        <MovieContext.Provider
            value={{
                movies,
                movie,
                reviews,
                loading,
                error,
                fetchMovies,
                fetchMovieDetails,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}

export { MovieContext, MovieProvider };
