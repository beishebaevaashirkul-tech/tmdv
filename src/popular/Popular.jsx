import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../apikey/apikey";
import "./Popular.css";
import MovieCard from "../components/pages/movicard/MovieCard";
import { MovieContext } from "../components/pages/rootcontext";

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const { lang } = useContext(MovieContext);

  const getPopular = async (key) => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=${lang}&page=1`,
      );
      setPopular(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular(API_KEY);
  }, [lang]);

  return (
    <div id="popular">
      <div className="container">
        <div className="popular">
          {popular.map((el) => (
            <MovieCard key={el.id} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popular;
