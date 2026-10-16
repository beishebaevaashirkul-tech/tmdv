import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../../../apikey/apikey";
import "./TopRated.css";
import MovieCard from "../movicard/MovieCard";
import { MovieContext } from "../rootcontext";

const topRated = () => {
  const [topRated, settopRated] = useState([]);
  const { lang } = useContext(MovieContext);

  const gettopRated = async (key) => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=${lang}&page=1`,
      );
      settopRated(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    gettopRated(API_KEY);
  }, [lang]);

  return (
    <div id="topRated">
      <div className="container">
        <div className="topRated">
          {topRated.map((el) => (
            <MovieCard el={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default topRated;
