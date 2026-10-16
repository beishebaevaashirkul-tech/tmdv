import { useEffect, useState } from "react";
import { API_KEY } from "../../../apikey/apikey";
import axios from "axios";
import "./Videos.css";

const Videos = ({ videosId }) => {
  const [videos, setVideos] = useState([]);

  async function getVideos(key) {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/${videosId}/videos?api_key=${key}&language=en-US`,
      );

      console.log(res.data.results);
      setVideos(
        res.data.results
          .filter((el) => el.site === "YouTube" && el.type === "Trailer")
          .slice(0, 2),
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getVideos(API_KEY);
  }, [videosId]);

  return (
    <div id="videos">
      <div className="container">
        <div className="videos">
          {videos.map((el) => (
            <iframe
              key={el.id}
              width="419"
              height="217"
              src={`https://www.youtube.com/embed/${el.key}`}
              title={el.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;

// import { useEffect, useState } from "react";
// import { API_KEY } from "../../../apikey/apikey";
// import axios from "axios";
// import './Videos.css'
// const Videos = ({ videosId }) => {
//   const [videos, setVideos] = useState([]);

//   async function getVideos(key) {
//     try {
//       const res = await axios(
//         `https://api.themoviedb.org/3/movie/${videosId}/videos?api_key=${key}&language=en-US`,
//       );
//        console.log(res.data.results);
//      setVideos(res.data.results);
//     }
//   }

//   useEffect(() => {
//     getVideos(API_KEY);
//   }, [videosId]);

//   return (
//     <div id="videos">
//       <div className="container">
//         <div className="videos">
//            {videos.map((el) => (
//                        <iframe
//               key={el.id}
//               width="419"
//               height="217"
//               src={`https://www.youtube.com/embed/${el.key}`}
//               title={el.name}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//             ></iframe>

//         ))}
//         </div>
//       </div>
//     </div>
//   )

// export default Videos;
