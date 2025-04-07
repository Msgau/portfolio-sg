import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Error404 from "./Error404";
import Presentation from "./Presentation";
import Portfolio from "./Portfolio";
import Contact from "./Contact";

function RouteConfiguration() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/works" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default RouteConfiguration;
