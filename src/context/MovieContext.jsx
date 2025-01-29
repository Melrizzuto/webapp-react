import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

//creo il contesto
const MovieContext = createContext();

function MovieProvider({ children }) {
    const [movies, setMovies] = useState([]); // Stato per la lista dei film
    const [movie, setMovie] = useState(null); // Stato per il singolo film
    const [reviews, setReviews] = useState([]); // Stato per le recensioni
    const [isLoading, setIsLoading] = useState(true); // Stato per il caricamento
    const [error, setError] = useState(null); // Stato per gli errori

    // Funzione per recuperare la lista dei film (1° chiamata)
    function fetchMovies() {
        setIsLoading(true); // Attiviamo il loader
        setError(null); // Reset degli errori
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
                setIsLoading(false); // Nascondiamo il loader
            });
    };

    // Funzione per recuperare i dettagli di un singolo film (2° chiamata)
    function fetchMovieDetails(id) {
        setIsLoading(true); // Attiviamo il loader
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
                setIsLoading(false); // Nascondiamo il loader
            });
    };

    // Funzione per aggiungere una recensione
    function addReview(newReview) {
        setReviews((prevReviews) => [...prevReviews, newReview]); // Aggiungo la recensione alla lista
    };

    // Effettua il fetch della lista dei film quando il provider viene inizializzato
    useEffect(() => {
        fetchMovies(); // Chiamata per recuperare i dati dei film
    }, []); // si imposta l'array vuoto per effetturare il fetch solo una volta al primo montaggio del componente

    return (
        <MovieContext.Provider
            value={{
                movies,
                movie,
                reviews,
                isLoading,
                setIsLoading,
                error,
                fetchMovies,
                fetchMovieDetails,
                addReview,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
}
// Hook per utilizzare il contesto
function useMovieContext() {
    const context = useContext(MovieContext);
    return context;
}

export { useMovieContext, MovieProvider };

