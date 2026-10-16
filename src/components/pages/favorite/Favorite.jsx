import { useContext } from "react";
import { MovieContext } from "../rootcontext";
import MovieCard from "../movicard/MovieCard";
import "./Favorite.css";

const Favorite = () => {
  const { favorite, setFavorite } = useContext(MovieContext);
  // const { lang } = useContext(MovieContext);
  return (
    <div id="favorite">
      <div className="container">
        <div className="favorite">
          <h1>Избранное</h1>
          {favorite.map((el) => (
            <div key={el.id}>
              <MovieCard el={el} />
              <button
                onClick={() =>
                  setFavorite(favorite.filter((movie) => movie.id !== el.id))
                }
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
