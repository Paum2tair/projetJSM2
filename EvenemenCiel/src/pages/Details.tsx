import "../assets/css/details.css"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Form from "../components/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Event } from "../scripts/Event";
import Etoiles from "../components/Etoiles";
import { getAllEvents } from "../scripts/GetAll";
interface DetailsProps {
  events: Event[];
   setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}
const Details: React.FC<DetailsProps> = ({ events, setEvents }) => {
  const { id } = useParams<{ id: string }>(); // Récupérer l'id de l'URL
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const localStorageShowFormKey = `showForm_${id}`;

  // Charger l'état du formulaire depuis localStorage au chargement
  useEffect(() => {
    const savedShowForm = localStorage.getItem(localStorageShowFormKey);
    if (savedShowForm !== null) {
      setShowForm(JSON.parse(savedShowForm));
    }
  }, [localStorageShowFormKey]);

  // Sauvegarder l'état du formulaire dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem(localStorageShowFormKey, JSON.stringify(showForm));
  }, [showForm, localStorageShowFormKey]);

  // Mettre à jour la récupération de l'id de l'évènement sélectionné
  useEffect(() => {
    const savedData = localStorage.getItem("data");
    let allEvents = savedData ? JSON.parse(savedData) : events;

    let foundEvent = allEvents.find((event: { id: { toString: () => string | undefined; }; }) => event.id.toString() === id);
    
    if (foundEvent) {
        setEvent(foundEvent);
    } else {
        getAllEvents()
            .then((data: Event[]) => {
                const foundEventFromAPI = data.find(event => event.id.toString() === id);
                if (foundEventFromAPI) {
                    setEvent(foundEventFromAPI);
                }
            })
            .catch(error => setError(error.message));
    }
}, [id]);

  // Fonction pour ouvrir/ fermer le formulaire
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Affichage du chargement ou de l'erreur en rappport avec l'évènement
  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!event) {
    return <p>Chargement...</p>;
  }


  return (
    <>
      <div className="principale_container">
        <Header />
        <Etoiles />
        <div className="container">
          <div className="event-details">
            <div className="titre_image">
              <img src={`/images/${event.title}.jpg`} alt={event.title} />
            </div>
            {/* Affichage des informations de l'évènement */}
            <div className="text">
              <h1>{event.title}</h1>
              <p>{event.description}</p>
              <p><strong>Date :</strong> {event.date}</p>
              <p><strong>Lieu :</strong> {event.location} </p>
              <p><strong>Organisateur :</strong> {event.organizer}</p>
              <p><strong>Prix :</strong> {event.price.toFixed(2)} <img src="/euro.png" alt="Euro" /></p>

              {/* bouton dynamique pour la réservation */}
              <button
                className="reservation-button"
                onClick={toggleForm}
              >
                {showForm ? "Masquer le formulaire" : "Réserver"}
              </button>
            </div>
          </div>
          {/* Formulaire de réservation */}
          <div
            className={`form-container ${showForm ? 'open' : 'closed'}`}
          >
            {showForm && <Form eventId={event.id} events={events} setEvents={setEvents} />}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Details;