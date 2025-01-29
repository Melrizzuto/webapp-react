import Loader from "../components/Loader";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMovieContext } from "../context/MovieContext";
import { useEffect } from "react";

export default function DefaultLayout() {
    const { isLoading, setIsLoading } = useMovieContext();

    //simulazione caricamento pagina
    useEffect(() => {
        // mostro il loader dopo 1sec
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        // pulizia del timer quando il componente viene smontato
        return () => clearTimeout(timer);
    }, [setIsLoading]);

    return (
        <>
            <Header />
            {isLoading && <Loader />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
