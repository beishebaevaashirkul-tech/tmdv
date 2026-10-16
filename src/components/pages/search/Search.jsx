import axios from "axios";
import { API_KEY } from "../../../apikey/apikey";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../movicard/MovieCard";
import { useParams } from "react-router-dom";
import "./Search.css";
import { MovieContext } from "../rootcontext";

const Search = () => {
  const [search, setSearch] = useState([]);
  const { movieName } = useParams();
  const { lang } = useContext(MovieContext);

  async function getSearch(key) {
    const res = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(movieName)}&language=${lang}`,
    );
    setSearch(res.data.results);
  }

  useEffect(() => {
    if (!movieName) return;
    getSearch(API_KEY);
  }, [movieName, lang]);

  return (
    <div id="search">
      <div className="container">
        <div className="searchCard">    
          {search.map((el) => (
            <MovieCard key={el.id} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
