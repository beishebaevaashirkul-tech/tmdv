import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { API_KEY } from "../../../apikey/apikey";
import "./Actors.css";
import { MovieContext } from "../rootcontext";
const Actors = ({ actorsId = 980431 }) => {
  const [actors, setActors] = useState([]);
  const { lang } = useContext(MovieContext);

  async function getActors(key) {
    const res = await axios(
      `https://api.themoviedb.org/3/movie/${actorsId}/credits?api_key=${key}&language=${lang}`,
    );

    setActors(res.data.cast);
  }

  useEffect(() => {
    getActors(API_KEY);
  }, [actorsId, lang]);

  return (
    <div id="actors">
      <div className="container">
        <div className="actors">
          {actors.map((el) => (
            <div className="actorsCard" key={el.id}>
              <img
                width="180px"
                src={`https://image.tmdb.org/t/p/w500${el.profile_path}`}
                alt=""
              />
              <h1>{el.name}</h1>
              <p>{el.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Actors;
