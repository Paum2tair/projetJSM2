import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormProps {
  eventId: number;
  max_places: number;
}

const Form: React.FC<FormProps> = ({ eventId, max_places }) => {
  const navigate = useNavigate();
  const localStorageKey = `places_remaining_${eventId}`;

  const [placesRemaining, setPlacesRemaining] = useState<number>(max_places);

  // Chargement du nombre de places restantes depuis localStorage
  useEffect(() => {
    const savedPlaces = localStorage.getItem(localStorageKey);
    if (savedPlaces !== null) {
      setPlacesRemaining(parseInt(savedPlaces, 10));
    }
  }, [localStorageKey]);

  // Gestion de la soumission du formulaire
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const placesRequested = Number(formData.get("places"));

    if (placesRequested > placesRemaining) {
      alert("Nombre de places insuffisant !");
      return;
    }

    const newRemaining = placesRemaining - placesRequested;
    setPlacesRemaining(newRemaining);
    localStorage.setItem(localStorageKey, newRemaining.toString());

    // Afficher un pop-up "Merci !" puis rediriger vers la page d'accueil
    alert("Merci pour votre réservation !");
    navigate("/"); // Redirection vers l'accueil
  };

  return (
    <div className="form">
      <h3>Réservation de l'événement</h3>
      <p>Places restantes : {placesRemaining}</p>

      <form onSubmit={handleSubmit} className="submit_f">
        <label htmlFor="name">Nom :</label>
        <input type="text" id="name" name="name" placeholder="Nom" required />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" name="email" placeholder="Email" required />

        <label htmlFor="places">Nombre de places :</label>
        <input
          type="number"
          id="places"
          name="places"
          placeholder="1"
          min="1"
          max={placesRemaining}
          required
        />

        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default Form;
