import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../../apikey/apikey";
import { useParams } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import "./MovieDetails.css";
import Actors from "../actors/Actors";
import Videos from "../videos/Videos";
import { MovieContext } from "../rootcontext";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({});
  const { movieId } = useParams();
  const { lang, favorite, setFavorite } = useContext(MovieContext);

  const rating = Math.round((movieDetails.vote_average || 0) * 10);

  const isFavorite = favorite.some((el) => el.id === movieDetails.id);

  function addToFavorite(item) {
    if (!item.id) return;

    if (favorite.some((el) => el.id === item.id)) {
      setFavorite(favorite.filter((el) => el.id !== item.id));
    } else {
      setFavorite([...favorite, item]);
    }
  }

  async function getMovieDetails() {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${lang}`,
      );

      setMovieDetails(res.data);
    } catch (error) {
      console.error("Ошибка загрузки фильма:", error);
    }
  }

  useEffect(() => {
    getMovieDetails();
  }, [movieId, lang]);

  return (
    <>
      <div
        id="movie"
        style={{
          background: movieDetails.backdrop_path
            ? `url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetails.backdrop_path}") center center / cover`
            : "#032541",
        }}
      >
        <div className="container">
          <div className="movie">
            {movieDetails.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w440_and_h660_face/${movieDetails.poster_path}`}
                alt={movieDetails.title || "Movie poster"}
              />
            )}

            <div className="movieText">
              <div>
                <h1>
                  {movieDetails.title || movieDetails.original_title}{" "}
                  <span>({movieDetails.release_date?.slice(0, 4)})</span>
                </h1>

                <h5>
                  <span>{movieDetails.release_date}</span>{" "}
                  {movieDetails.genres?.map((el) => el.name).join(", ")}{" "}
                  <span>{movieDetails.runtime} min</span>
                </h5>
              </div>

              <div className="rating-top">
                <div className="rating" style={{ "--rating": `${rating}%` }}>
                  <span>{rating}%</span>
                </div>
                <h4>{lang === "ru-RU" ? "Рейтинг" : "Rating"}</h4>
              </div>

              <div className="icons">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Menu"
                >
                  <IoMenu />
                </a>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label="Like"
                >
                  <IoIosHeart />
                </a>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToFavorite(movieDetails);
                  }}
                  aria-label="Add to favorites"
                  title={
                    isFavorite
                      ? "Удалить из избранного"
                      : "Добавить в избранное"
                  }
                  style={{ color: isFavorite ? "#01b4e4" : "inherit" }}
                >
                  <FaBookmark />
                </a>
              </div>

              <div className="obzor">
                <h3>{movieDetails.tagline}</h3>
                <h2>{lang === "ru-RU" ? "Обзор" : "Overview"}</h2>
                <p>{movieDetails.overview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Actors actorsId={movieId} />
      <Videos videosId={movieId} />
    </>
  );
};

export default MovieDetails;
