import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../scripts/Event";

interface FormProps {
  eventId: number;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const Form: React.FC<FormProps> = ({ eventId, events, setEvents }) => {
  const navigate = useNavigate();
  const [reservationSuccess, setReservationSuccess] = useState<boolean>(false);
  const [nbPlaces, setNbPlaces] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const maxAvailablePlaces = events[eventId].max_attendees - events[eventId].nb_ticket;

  // Validation du nombre de places en temps réel
  useEffect(() => {
    if (nbPlaces > maxAvailablePlaces) {
      setIsValid(false);
      setErrorMessage(`Vous ne pouvez pas réserver plus de ${maxAvailablePlaces} place${maxAvailablePlaces > 1 ? 's' : ''}`);
    } else if (nbPlaces < 1) {
      setIsValid(false);
      setErrorMessage("Vous devez réserver au moins 1 place");
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  }, [nbPlaces, maxAvailablePlaces]);

  // Gestion de la soumission du formulaire
  const handleSubmit = (event2: React.FormEvent<HTMLFormElement>) => {
    event2.preventDefault();

    // Vérifier si la demande est valide avant de procéder
    if (!isValid || nbPlaces > maxAvailablePlaces) {
      setErrorMessage(`Impossible de réserver : nombre de places demandé (${nbPlaces}) supérieur aux places disponibles (${maxAvailablePlaces})`);
      return;
    }

    // Mettre à jour le nombre de tickets
    const updatedEvents = [...events];
    updatedEvents[eventId] = {
      ...updatedEvents[eventId],
      nb_ticket: updatedEvents[eventId].nb_ticket + nbPlaces
    };

    // Mettre à jour l'état et le stockage local
    setEvents(updatedEvents);
    localStorage.setItem("data", JSON.stringify(updatedEvents));
    setReservationSuccess(true);
  };

  // Gérer le changement de nombre de places
  const handlePlacesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNbPlaces(Number(e.target.value));
  };

  // Afficher un message de confirmation si la réservation est réussie
  if (reservationSuccess) {
    return (
      <div className="form success-message">
        <h3>Réservation confirmée !</h3>
        <p>Merci pour votre réservation de {nbPlaces} place{nbPlaces > 1 ? 's' : ''}.</p>
        <p>Votre commande a été enregistrée avec succès.</p>
        <button onClick={() => navigate("/panier")}>Voir mon panier</button>
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="form">
      <h3>Réservation de l'événement</h3>
      <p>Places restantes : {maxAvailablePlaces}</p>

      <form onSubmit={handleSubmit} className="submit_f">
        <div className="element">
          <label htmlFor="name">Nom :</label>
          <input type="text" className="textarea" id="name" name="name" placeholder="Nom" required />
        </div>
        
        <div className="element">
          <label htmlFor="email">Email :</label>
          <input type="email" className="textarea" id="email" name="email" placeholder="Email" required />
        </div>
        
        <div className="element">
          <label htmlFor="places">Nombre de places :</label>
          <input
            className="number"
            type="number"
            id="places"
            name="places"
            placeholder="1"
            onChange={handlePlacesChange}
            value={nbPlaces}
            min="1"
            max={maxAvailablePlaces}
            required
          />
        </div>
        
        {/* Message d'erreur affiché en temps réel */}
        {!isValid && (
          <div className="error-message" style={{ color: "red", marginTop: "8px" }}>
            {errorMessage}
          </div>
        )}

        <button type="submit" className="submit" disabled={!isValid}>Valider</button>
      </form>
    </div>
  );
};

export default Form;