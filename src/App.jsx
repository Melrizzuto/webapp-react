import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout";
import HomePage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import Form from "./components/Form";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movies">
            <Route index element={<HomePage />} />
            <Route path=":id" element={<MovieDetails />} />
          </Route>
          <Route path="form" element={<Form />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
