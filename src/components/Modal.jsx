import "../styles/Modal.scss";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import reactLogo from "../assets/logos/logoREACT.png";
import ugoLogo from "../assets/logos/ugo.png";
import htmlLogo from "../assets/logos/logoHTML.png";
import cssLogo from "../assets/logos/logoCSS.png";
import jsLogo from "../assets/logos/logoJAVASCRIPT.png";
import exLogo from "../assets/logos/logoExpress.png";
import mongodbLogo from "../assets/logos/logoMongo.png";
import lightLogo from "../assets/logos/logoLighthouse.png";
import jwtLogo from "../assets/logos/logoJWT.png";
import logoNode from "../assets/logos/logoNodeJs.png";
import tmdbLogo from "../assets/logos/logoTMDB.png";
import sqlLogo from "../assets/logos/logoSQL.png";
import nextLogo from "../assets/logos/logoNextJS.webp";
import tsLogo from "../assets/logos/logoTypeScript.webp";
import tailwindLogo from "../assets/logos/logoTailwind.svg";
import supabaseLogo from "../assets/logos/logoSupabase.webp";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const logoMapping = {
  REACT: reactLogo,
  HTML: htmlLogo,
  CSS: cssLogo,
  JAVASCRIPT: jsLogo,
  EXPRESS: exLogo,
  MONGODB: mongodbLogo,
  LIGHTHOUSE: lightLogo,
  JSONWEBTOKEN: jwtLogo,
  NODEJS: logoNode,
  API_TMDB: tmdbLogo,
  SQL: sqlLogo,
  UGO: ugoLogo,
  NEXTJS: nextLogo,
  TYPESCRIPT: tsLogo,
  TAILWIND: tailwindLogo,
  SUPABASE: supabaseLogo,
};

const Modal = ({
  show,
  onClose,
  imageSrc,
  imageSrc2,
  imageSrc3,
  imageAlt,
  imageAlt2,
  projectData,
}) => {
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const handleOverlayClick = (e) => {
    // Ferme la modale uniquement si le clic provient de l'overlay
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    if (!show) return undefined;
    // Mémorise l'élément qui a ouvert la modale pour lui rendre le focus à la fermeture
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={projectData.title}
      >
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Fermer"
          ref={closeRef}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div className="modal-div one">
          <a
            href={imageSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="img-link"
          >
            <img src={imageSrc} alt={imageAlt} className="modal-img" />
          </a>

          <a
            href={imageSrc2}
            target="_blank"
            rel="noopener noreferrer"
            className="img-link"
          >
            <img src={imageSrc2} alt={imageAlt2} className="modal-img" />
          </a>
          {imageSrc3 && (
            <a
              href={imageSrc3}
              target="_blank"
              rel="noopener noreferrer"
              className="img-link hidden"
            >
              <img src={imageSrc3} alt={imageAlt2} className="modal-img" />
            </a>
          )}
        </div>
        <div className="modal-div two">
          <h2>
            {projectData.link ? (
              <a
                href={projectData.link}
                style={{ color: "black" }}
                rel="noopener noreferrer"
                target="_blank"
                className="link-ws"
                title={`${projectData.title} : aller vers le site`}
              >
                {projectData.title}{" "}
              </a>
            ) : (
              projectData.title // Afficher le titre du projet s'il n'y a pas de lien
            )}
            {projectData.github && (
              <a
                href={projectData.github}
                rel="noopener noreferrer"
                target="_blank"
                className="link-gh"
                aria-label={`${projectData.title} : code source sur GitHub`}
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
          </h2>
          <h3>Mission :</h3>
          <p>{projectData.mission}</p>
          {projectData.links && projectData.links.length > 0 && (
            <>
              <h3>Sites réalisés :</h3>
              <ul className="liens-sites">
                {projectData.links.map((site) => (
                  <li key={site.nom}>
                    {site.url ? (
                      <a
                        href={
                          site.url.startsWith("http")
                            ? site.url
                            : `https://${site.url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {site.nom}
                      </a>
                    ) : (
                      <span>{site.nom} (site fermé)</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
          <h3>Technologies utilisées :</h3>
          <ul>
            {projectData.technologies.map((tech) => (
              <li key={tech}>
                {logoMapping[tech.toUpperCase()] ? (
                  <img
                    src={logoMapping[tech.toUpperCase()]}
                    alt={tech}
                    title={tech}
                  /> // Afficher l'icône si disponible
                ) : (
                  tech // Afficher le nom de la technologie s'il n'y a pas d'icône correspondant
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageSrc2: PropTypes.string.isRequired,
  imageSrc3: PropTypes.string,
  imageAlt: PropTypes.string.isRequired,
  imageAlt2: PropTypes.string.isRequired,
  projectData: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    github: PropTypes.string,
    mission: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        nom: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    technologies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Modal;
