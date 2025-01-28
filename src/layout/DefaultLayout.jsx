import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

export default function DefaultLayout() {
    const { loading } = useContext(MovieContext);

    return (
        <>
            <Header />
            {loading && <Loader />} {/* mostro il loader quando 'loading' è true */}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
