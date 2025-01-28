import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";

import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import Form from "./components/Form";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="movies">
              <Route path=":id" element={<MovieDetails />} />
            </Route>
            <Route path="form" element={<Form />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
