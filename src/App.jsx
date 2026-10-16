import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Favorite from "./components/pages/favorite/Favorite";
import TopRated from "./components/pages/topRated/TopRated";
import Popular from "./popular/Popular";
import MovieDetails from "./components/pages/moviedetails/MovieDetails";
import Actors from "./components/pages/actors/Actors";
import Search from "./components/pages/search/Search";
import Home from "./components/pages/home/Home";
import Footer from "./components/layout/footer/Footer";
import { useContext } from "react";
import { MovieContext } from "./components/pages/rootcontext";

const App = () => {
  const { theme } = useContext(MovieContext);
  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        background: theme ? "black" : "white",
        color: theme ? "white" : "black",
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/topRated" element={<TopRated />} />
        <Route path="/movieDetails/:movieId" element={<MovieDetails />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/search/:movieName" element={<Search />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
