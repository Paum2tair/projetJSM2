import "../assets/css/details.css"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Form from "../components/Form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Event } from "../scripts/Event";
import Etoiles from "../components/Etoiles";

const Details: React.FC = () => {
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

  useEffect(() => {
    fetch('/events.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur de chargement du JSON');
        }
        return response.json();
      })
      .then((data: Event[]) => {
        const foundEvent = data.find(event => event.id === Number(id)); // Trouver l'événement correspondant
        if (!foundEvent) {
          setError("Événement introuvable");
        } else {
          setEvent(foundEvent);
        }
      })
      .catch(error => setError(error.message));
  }, [id]); // Recharger si l'ID change

  const toggleForm = () => {
    setShowForm(!showForm);
  };

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
            <div className="text">
              <h1>{event.title}</h1>
              <p>{event.description}</p>
              <p><strong>Date :</strong> {event.date}</p>
              <p><strong>Lieu :</strong> {event.location} </p>
              <p><strong>Organisateur :</strong> {event.organizer}</p>
              <p><strong>Prix :</strong> {event.price.toFixed(2)} <img src="/euro.png" alt="Euro" /></p>
              
              <button 
                className="reservation-button" 
                onClick={toggleForm}
              >
                {showForm ? "Masquer le formulaire" : "Réserver"}
              </button>
            </div>
          </div>
          
          <div 
            className={`form-container ${showForm ? 'open' : 'closed'}`}
          >
            {showForm && <Form eventId={event.id} max_places={event.max_attendees} evente={event} />}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Details;