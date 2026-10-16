import { useContext } from "react";
import { translations } from "../../translition";
import "./Footer.css";
import { MovieContext } from "../../pages/rootcontext";

function Footer() {
  const { lang } = useContext(MovieContext);
  const t = translations[lang] || translations["en-US"];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h1>
            THE <span className="logo-pill"></span>
            <br />
            MOVIE
            <br />
            <span className="logo-long"></span> DB
          </h1>
        </div>

        <div className="footer-column">
          <h3>{t.footer.basics}</h3>
          <a href="#">{t.footer.about}</a>
          <a href="#">{t.footer.api}</a>
          <a href="#">{t.footer.business}</a>
          <a href="#">{t.footer.status}</a>
        </div>

        <div className="footer-column">
          <h3>{t.footer.participate}</h3>
          <a href="#"> {t.footer.editors}</a>
          <a href="#">{t.footer.addMovie}</a>
          <a href="#">{t.footer.addSeries}</a>
        </div>

        <div className="footer-column">
          <h3>{t.footer.community}</h3>
          <a href="#">{t.footer.guides}</a>
          <a href="#">{t.footer.honor}</a>
          <a href="#">{t.footer.support}</a>
        </div>

        <div className="footer-column">
          <h3>{t.footer.legal}</h3>
          <a href="#">{t.footer.terms}</a>
          <a href="#">{t.footer.apiTerms}</a>
          <a href="#">{t.footer.privacy}</a>
          <a href="#">{t.footer.dmca}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
