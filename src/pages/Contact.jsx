import { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/Contact.css";
import Menu from "../components/Menu";

// "idle" | "sending" | "sent" | "error"
export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm("sgdev", "template_ntj43be", e.target, "zPQSR3rUXV9g7pUXc")
      .then(() => {
        setStatus("sent");
        // Les champs ne sont vidés qu'en cas de succès
        setEmail("");
        setName("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail:", error);
        setStatus("error");
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
            <div className="field">
              <label htmlFor="from_name" className="sr-only">
                Nom
              </label>
              <input
                id="from_name"
                type="text"
                className="contact__name"
                name="from_name"
                placeholder="Nom"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="email" className="sr-only">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="E-mail"
                className="contact__email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <textarea
            id="message"
            className="contact__message"
            placeholder="Message"
            name="message"
            rows="4"
            cols="50"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <input
            type="submit"
            value={status === "sending" ? "Envoi…" : "Envoyer"}
            className="sendButton"
            disabled={status === "sending"}
          />
          <div className="formStatus" role="status" aria-live="polite">
            {status === "sent" && "Message envoyé avec succès !"}
            {status === "error" &&
              "L'envoi a échoué. Votre message a été conservé, vous pouvez réessayer."}
          </div>
        </form>
      </div>
    </div>
  );
}
