import { useState, useEffect } from "react";
import "../styles/Portfolio.css";
import Menu from "../components/Menu";
import { Grid } from "react-loader-spinner";
import CineCrew from "../assets/images/cineCrew.webp";
import CineCrew2 from "../assets/images/cineCrew2.webp";
import MVG from "../assets/images/monVieuxGrimoire.png";
import MVG2 from "../assets/images/monVieuxGrimoire2.png";
import Nina from "../assets/images/NinaCarducci.png";
import Nina2 from "../assets/images/Nina2.png";
import Modal from "../components/Modal";
import projectData from "../data/projectsData.json";
import gaec from "../assets/images/gaec.png";
import adp from "../assets/images/adp.png";
import ph from "../assets/images/ph.png";

export default function Portfolio() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImage2, setSelectedImage2] = useState("");
  const [selectedImage3, setSelectedImage3] = useState("");
  const [selectedProjectData, setSelectedProjectData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate the loading process for 2 seconds
    const loadingTimer = setTimeout(() => setLoading(false), 1000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(loadingTimer);
  }, []);

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
    setSelectedProjectData({});
    setModalOpen(false);
  };

  const images = [
    { img1: CineCrew, img2: CineCrew2 },
    { img1: MVG, img2: MVG2 },
    { img1: Nina, img2: Nina2 },
    { img1: gaec, img2: adp, img3: ph },
  ];

  return (
    <div className="works">
      <Menu />
      <div className="backgroundImage"></div>
      <div style={loading ? { display: "none" } : { display: "block" }}>
        <div className="portfolio">
          {projectData
          .filter(project => !project.hidden)
          .map((project, index) => (
            <div
              key={index}
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
            </div>
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
      <div
        className="loader-container"
        style={loading ? { display: "block" } : { display: "none" }}
      >
        <Grid type="Grid" color="#FF00FF" height={100} width={100} />
      </div>
    </div>
  );
}
