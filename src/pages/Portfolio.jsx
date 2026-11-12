import { useState } from "react";
import "../styles/Portfolio.css";
import Menu from "../components/Menu";
import Screenblocks from "../assets/images/screenblocks.webp";
import Screenblocks2 from "../assets/images/screenblocks2.webp";
import MVG from "../assets/images/monVieuxGrimoire.webp";
import MVG2 from "../assets/images/monVieuxGrimoire2.webp";
import Nina from "../assets/images/NinaCarducci.webp";
import Nina2 from "../assets/images/Nina2.webp";
import Modal from "../components/Modal";
import projectData from "../data/projectsData.json";
import gaec from "../assets/images/gaec.webp";
import adp from "../assets/images/adp.webp";
import ph from "../assets/images/ph.webp";

export default function Portfolio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImage2, setSelectedImage2] = useState("");
  const [selectedImage3, setSelectedImage3] = useState("");
  const [selectedProjectData, setSelectedProjectData] = useState({});
  const openModal = (imageSrc, imageSrc2, imageSrc3, projectData) => {
    setSelectedImage(imageSrc);
    setSelectedImage2(imageSrc2);
    setSelectedImage3(imageSrc3);
    setSelectedProjectData(projectData);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage("");
    setSelectedImage2("");
    setSelectedImage3("");
    setSelectedProjectData({});
    setModalOpen(false);
  };

  const images = [
    { img1: Screenblocks, img2: Screenblocks2 },
    { img1: MVG, img2: MVG2 },
    { img1: Nina, img2: Nina2 },
    { img1: gaec, img2: adp, img3: ph },
  ];

  return (
    <div className="works">
      <Menu />
      <div className="backgroundImage"></div>
      <div>
        <div className="portfolio">
          {projectData
          .filter(project => !project.hidden)
          .map((project, index) => (
            <button
              type="button"
              key={project.id}
              className="block"
              onClick={() =>
                openModal(
                  images[index].img1,
                  images[index].img2,
                  images[index].img3,
                  project
                )
              }
            >
              <img
                src={images[index].img1}
                alt={`Projet ${project.title}`}
                title={project.title}
                className="project"
              />
              <div className="text-overlay">
                <h2>{project.title}</h2>
                <p>voir plus</p>
              </div>
            </button>
          ))}
        </div>
        <Modal
          show={modalOpen}
          onClose={closeModal}
          imageSrc={selectedImage}
          imageAlt="Image du projet"
          imageSrc2={selectedImage2}
          imageAlt2="Seconde image du projet"
          imageSrc3={selectedImage3}
          imageAlt3="Troisième image du projet" 
          projectData={selectedProjectData}
        />
      </div>
    </div>
  );
}
