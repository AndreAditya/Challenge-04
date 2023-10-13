import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import DetailsMovie from "./pages/DetailsMovie";
import NavbarComponent from "./components/Navbar";
import DetailTrailer from "./components/DetailTrailer";
import SearchMovie from "./pages/SearchMovie";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:movieId" element={<DetailsMovie />} />
          <Route path="/trailers/:movieId" element={<DetailTrailer />} />
          <Route path="/movie/search/:query" element={<SearchMovie />}></Route>
          <Route
            path="/*"
            element={<h1 className="custom-error">Data Not Found !</h1>}
          ></Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
