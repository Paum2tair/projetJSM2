import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Resa } from "../scripts/Resa";
import { Event } from "../scripts/Event";

interface FormProps {
  eventId: number;
  max_places: number;
  evente: Event;
}

const Form: React.FC<FormProps> = ({ eventId, max_places, evente }) => {
  const navigate = useNavigate();
  const localStorageKey = `places_remaining_${eventId}`;
  const localStorageItem = `panierItems`;
  const [placesRemaining, setPlacesRemaining] = useState<number>(max_places);
  const [reservationSuccess, setReservationSuccess] = useState<boolean>(false);
  // const [nbPlaces, setNbPlaces] = useState<number>(1);

  // Chargement du nombre de places restantes et des tickets deja achetes depuis localStorage
  useEffect(() => {
    const local_remaining = localStorage.getItem(localStorageKey);
    if (local_remaining !== null) {
      const remaining = parseInt(local_remaining, 10);
      setPlacesRemaining(remaining);
      // setNbPlaces(max_places - remaining);
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

    let reservation: Resa = {
      id: eventId,
      title: evente.title,
      description: evente.description,
      date: evente.date,
      location: evente.location,
      category: evente.category,
      image: evente.image,
      organizer: evente.organizer,
      max_attendees: evente.max_attendees,
      price: evente.price,
      nb_ticket: placesRequested,  // Initialisation de nb_ticket
    };

    setPlacesRemaining(newRemaining);
    localStorage.setItem(localStorageKey, newRemaining.toString());

    // Récupération des réservations existantes
    const resas = localStorage.getItem(localStorageItem);

    // Vérifiez si resas est une chaîne valide avant d'appeler JSON.parse
    let resasArray: Resa[] = [];
    if (resas) {
      try {
        resasArray = JSON.parse(resas);
      } catch (e) {
        console.error("Erreur lors du parsing du JSON:", e);
      }
    }

    // Récupérations des réservations dont l'id vaut celle de event
    const resasEvent = resasArray.filter((resa: Resa) => resa.id === eventId);

    // Si une réservation existe déjà pour cet event
    if (resasEvent.length > 0) {
      // On ajoute les places demandées à la réservation existante
      reservation = resasEvent[0];
      reservation.nb_ticket += placesRequested;
    }

    // Dans resas, on retire l'ancienne réservation et on ajoute celle-ci
    const newResas = resasArray.filter((resa: Resa) => resa.id !== eventId);
    newResas.push(reservation);

    localStorage.setItem(localStorageItem, JSON.stringify(newResas));

    // Afficher un message de succès en remplaçant le formulaire
    setReservationSuccess(true);
    
    // Option: rediriger automatiquement après quelques secondes
    // setTimeout(() => {
    //   navigate("/");
    // }, 3000);
  };

  // Afficher un message de confirmation si la réservation est réussie
  if (reservationSuccess) {
    return (
      <div className="form success-message">
        <h3>Réservation confirmée !</h3>
        <p>Merci pour votre réservation de {evente.title}.</p>
        <p>Votre commande a été enregistrée avec succès.</p>
        <button onClick={() => navigate("/panier")}>Voir mon panier</button>
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="form">
      <h3>Réservation de l'événement</h3>
      <p>Places restantes : {placesRemaining}</p>

      <form onSubmit={handleSubmit} className="submit_f">
        <div className="element"> <label htmlFor="name">Nom :</label>
          <input type="text" className="textarea" id="name" name="name" placeholder="Nom" required />
        </div>
        <div className="element">  <label htmlFor="email">Email :</label>
          <input type="email" className="textarea"  id="email" name="email" placeholder="Email" required />
        </div>
        <div className="element">  <label htmlFor="places">Nombre de places :</label>
          <input
          className="number"
            type="number"
            id="places"
            name="places"
            placeholder="1"
            //onChange={(e) => setNbPlaces(Number(e.target.value))}
            // value={nbPlaces}
            min="1"
            max={placesRemaining}
            required
          /> </div>


        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default Form;