import "../styles/Error404.scss";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

export default function Error404() {
  return (
    
    <div className="page404">
      <Menu />
      <div className="backgroundImage"></div>
      <div className="error404">
        <div className="number404">404</div>
        <p><span>Oups! La page que</span> <span className="lineBreak">vous demandez n'existe pas.</span></p>
        <div>
          <Link to="/portfolio/">Retourner à la page d'accueil</Link>
        </div>
      </div>
      
    </div>
  );
}