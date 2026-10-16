// import { Link, useNavigate } from "react-router-dom";
// import headerImg from "../../../assets/img/headerLogo.svg";
// import "./Header.css";
// import { useContext, useEffect, useState } from "react";
// import { MovieContext } from "../../pages/rootcontext";
// import { FaSearch, FaSun, FaMoon } from "react-icons/fa";

// const Header = () => {
//   const nav = useNavigate();
//   const [movieName, setMovieName] = useState("");
//   const { lang, setLang, theme, setTheme } = useContext(MovieContext);
//   // const changeTheme = () => {
//   //   setTheme(theme === "dark" ? "light" : "dark");
//   // };

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   return (
//     <div id="header">
//       <div className="container">
//         <div className="header">
//           <div className="left">
//             <Link to="/">
//               <img width="200px" src={headerImg} alt="TMDB" />
//             </Link>
//             <Link to="/popular">Популярные</Link>
//             <Link to="/topRated">Топ рейтинг</Link>
//             <Link to="/favorite">Избранное</Link>
//           </div>

//           <div className="right">
//             <FaSun />

//             <select onChange={(e) => setLang(e.target.value)}>
//               <option value="en-US">EN</option>
//               <option value="ru-RU">RU</option>
//             </select>

//             <input
//               type="text"
//               placeholder="Найти фильм, сериал..."
//               onChange={(e) => setMovieName(e.target.value)}
//             />
//             <a onClick={() => nav(`/search/${movieName}`)}>
//               <FaSearch />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useContext, useState } from "react";
import headerLogo from "../../../assets/img/headerLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Header.css";
import { MdDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { MovieContext } from "../../pages/rootcontext";
import { translations } from "../../translition";

const Header = () => {
  const { lang, setLang, setTheme, theme } = useContext(MovieContext);
  const [movieName, setMovieName] = useState("");
  const nav = useNavigate();

  const t = translations[lang] || translations["en-US"];

  const searchMovie = () => {
    if (movieName.trim() === "") {
      alert("Напишите название фильма, сериала!");
    } else {
      nav(`/search/${movieName}`);
      setMovieName("");
    }
  };
  return (
    <header id="header">
      <div className="container">
        <div className="header">
          <Link to="/">
            <img width="230px" src={headerLogo} alt="TMDB" />
          </Link>

          <div className="headerLeft">
            <Link to="/popular">{t.popular}</Link>
            <Link to="/topRated">{t.topRated}</Link>
            <Link to="/favorite">{t.favorites}</Link>
          </div>

          <div className="icons">
            <Link
              className="dark"
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setTheme(!theme);
              }}
            >
              {theme ? <MdDarkMode /> : <IoSunny />}
            </Link>
          </div>
          <div className="headerRight">
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="en-US">EN</option>
              <option value="ru-RU">RU</option>
            </select>

            <input
              type="text"
              value={movieName}
              placeholder={t.searchPlaceholder}
              onChange={(e) => setMovieName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchMovie();
              }}
            />

            <a onClick={searchMovie}>
              <FaSearch />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
