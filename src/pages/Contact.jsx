import { useState } from "react";
import emailjs from "emailjs-com";
import '../styles/Contact.css';
import Menu from "../components/Menu";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Définir l'état de chargement sur true pour afficher l'animation de chargement
    setIsLoading(true);
    // Envoyer l'e-mail via EmailJS
    emailjs.sendForm("sgdev", "template_ntj43be", e.target, "zPQSR3rUXV9g7pUXc")
      .then((response) => {
        console.log("E-mail envoyé avec succès!", response.text);
        // Mettre à jour l'état pour afficher la confirmation
        setIsSent(true);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail:", error);
      })
      .finally(() => {
        // Réinitialiser les champs et l'état de chargement après l'envoi
        setIsLoading(false);
        setEmail("");
        setName("");
        setMessage("");
      });
    };
    

  return (
    <div className="contactPage">
    <Menu />
    <div className="backgroundImage"></div>
    <div className="contact">
      <h3>Contactez-moi</h3>
      <form onSubmit={handleSubmit}>
        <div className="nameEmail">
        <label htmlFor="from_name">
          <input
            type="text"
            className="contact__name"
            name="from_name"
            placeholder="Nom"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            placeholder="E-mail"
            className="contact__email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        </div>
        <label htmlFor="message"></label>
        <textarea
          className="contact__message"
          placeholder="Message"
          name="message"
          rows="4"
          cols="50"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <input type="submit" value="Envoyer" className="sendButton" />
        {/* Afficher l'animation de chargement lors de l'envoi */}
        {isLoading && <div>Envoi en cours...</div>}

        {/* Afficher la confirmation après l'envoi */}
        {isSent && <div>Message envoyé avec succès!</div>}
      </form>
    </div>
    </div>
  );
}