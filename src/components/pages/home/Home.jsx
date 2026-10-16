import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_KEY } from "../../../apikey/apikey";
import "./Home.css";
import { MovieContext } from "../rootcontext";
import { translations } from "../../translition";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const navigate = useNavigate();
  const { lang } = useContext(MovieContext);
  const t = translations[lang] || translations["en-US"];

  async function getMovies() {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=${lang}`,
      );
      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, [lang]);

  function searchMovie(event) {
    event.preventDefault();
    if (movieName.trim()) {
      navigate(`/search/${encodeURIComponent(movieName.trim())}`);
    }
  }

  return (
    <div id="home">
      <section
        className="homeHero"
        style={{
          backgroundImage: movies[0]?.backdrop_path
            ? `linear-gradient(90deg, rgb(2 20 42 / 76%), rgb(2 20 42 / 12%)), linear-gradient(0deg, #06314b 0%, transparent 27%), url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movies[0].backdrop_path}")`
            : undefined,
        }}
      >
        <div className="homeHeroContent">
          <h1>{t.welcome}</h1>
          <h2>{t.description}</h2>
          <form className="homeSearch" onSubmit={searchMovie}>
            <input
              type="text"
              value={movieName}
              onChange={(event) => setMovieName(event.target.value)}
              placeholder={t.heroPlaceholder}
            />
            <button type="submit">{t.searchButton}</button>
          </form>
        </div>
      </section>

      <section className="homeTrending">
        <div className="homeTrendingContent">
          <h2>В тренде</h2>
          <div className="homeMovieList">
            {movies.map((el) => (
              <div className="homeMovieCard" key={el.id}>
                <Link to={`/MovieDetails/${el.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                    alt={el.title || el.name}
                  />
                </Link>
                <h3>{el.title || el.name}</h3>
                <p>{el.release_date || el.first_air_date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
