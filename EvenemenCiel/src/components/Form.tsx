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
  const [resa, setResa] = useState<Resa>();

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