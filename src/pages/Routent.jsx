import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import Error404 from "./Error404";
import Presentation from "./Presentation";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import useScrollNavigation from "../components/useScrollNavigation";

const TITLES = {
  "/": "Sébastien Gau – Développeur web JavaScript",
  "/presentation": "Présentation – Sébastien Gau",
  "/projets": "Projets – Sébastien Gau",
  "/contact": "Contact – Sébastien Gau",
};

// Doit être rendu à l'intérieur du Router
function RouteEffects() {
  const { pathname } = useLocation();
  useScrollNavigation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? "Page introuvable – Sébastien Gau";
  }, [pathname]);
  return null;
}

// BASE_URL vaut "/portfolio-sg/" : le basename ne doit pas finir par "/"
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

function RouteConfiguration() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router basename={basename}>
          <RouteEffects />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/projets" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            {/* Anciennes URLs */}
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/works" element={<Navigate to="/projets" replace />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default RouteConfiguration;
