import Menu from "../components/Menu";
import "../styles/Home.css";

function Home() {

  return (
    <div className="home">
      <Menu />
      <div className="backgroundImage"></div>
      <div className="homeContainer">
        <div className="homeContainerText">
          <div className="ilADitBonjour">Bonjour,</div>
          <h1>Bienvenue sur le site de Sébastien Gau</h1>
          <div className="homeContainerDiv">Développeur web JavaScript</div>
          <div className="homeContainerDiv">
            Création, optimisation et entretien de sites modernes et
            responsives
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
