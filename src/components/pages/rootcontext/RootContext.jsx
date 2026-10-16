import { useEffect, useState } from "react";
import { MovieContext } from "./index";

const RootContext = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "ru-RU");

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [favorite, setFavorite] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorite") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <MovieContext.Provider
      value={{
        favorite,
        setFavorite,
        lang,
        setLang,
        theme,
        setTheme,
      }}
    >
      {children}
    </MovieContext.Provider>
  ) 
};

export default RootContext;
