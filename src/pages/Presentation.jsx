import { useState, useEffect } from "react";
import Menu from "../components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { Grid } from "react-loader-spinner";
import CV from "../assets/cv_gau_sebastien_dev_web.pdf";
import {
  faCss3,
  faNodeJs,
  faHtml5,
  faJsSquare,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Presentation.scss";

export default function Presentation() {
  // On définit l'état de contendLoaded à false
  const [contentLoaded, setContentLoaded] = useState(false);

  // ON ajoute un délai de 250 ms
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setContentLoaded(true);
    }, 250);

    // Arrêter le timer quand la page est fermée
    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="presentationPage">
        <div className="backgroundImage"></div>
      {contentLoaded ? ( // Afficher le contenu uniquement quand il est chargé
        <>
      <Menu />
      <div className="presentationContainer">
        <h2>Présentation</h2>
        <p>
          <strong>Développeur web</strong> chez Dignamik depuis 1 an, passionné par les
          nouvelles technologies, je suis animé par une soif d'apprendre et de
          relever de nouveaux défis. Ancien professeur, j'ai acquis des
          compétences pédagogiques qui me permettent de transmettre efficacement
          mes connaissances techniques de manière claire et concise.
        </p>
        <p>
          A travers mon expérience professionnelle et ma formation de développeur web chez <a href="https://openclassrooms.com/fr/paths/717-developpeur-web" rel="noopener noreferrer" target="_blank">Openclassrooms</a>,
          j'ai acquis des connaissances avancées en développement front-end (
          <strong>JavaScript</strong>, <strong>HTML5</strong>, <strong>React</strong>,{" "}
          <strong>CSS3</strong>) et back-end (<strong>Node.js</strong>,{" "}
          <strong>express</strong>, <strong>mongoDB</strong>, <strong>postgreSQL</strong>, <strong>prisma Studio</strong>) me permettant de
          créer des expériences web innovantes et fluides.{" "}
        </p>
        <p>
          Vous pouvez retrouver davantage d'informations sur <a href={CV} target="_blank" rel="noopener noreferrer">mon CV</a>, ou sur ma page{" "}
          <a
            href="https://www.linkedin.com/in/sebastien-gau/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Linkedin.
          </a>
        </p>
      </div>
      <div className="stage-cube-cont">
        <div className="cubespinner">
          <div className="face1">
            <FontAwesomeIcon icon={faCode} color="black" />
          </div>
          <div className="face2">
            
            <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
          </div>
          <div className="face3">
            <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
          </div>
          <div className="face4">
          <FontAwesomeIcon icon={faHtml5} color="#F06529" />
          </div>
          <div className="face5">
            <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
          </div>
          <div className="face6">
            <FontAwesomeIcon icon={faNodeJs} color="#43853D" />
          </div>
        </div>
      </div>
      </>
      ) : (
        <div className="loader-container">
          <Grid type="Grid" color="#FF00FF" height={100} width={100} />
        </div>
      )}
    </div>
  );
}
