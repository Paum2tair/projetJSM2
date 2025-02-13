import "../assets/css/details.css"

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Form from "../components/Form";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    image: string;
    organizer: string;
    max_attendees: number;
    price: number;
}

const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Récupérer l'id de l'URL
    const [event, setEvent] = useState<Event | null>(null);
    const [error, setError] = useState<string | null>(null);

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

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!event) {
        return <p>Chargement...</p>;
    }

    return (
      <>
        <div className="event-details">
            <h1>{event.title}</h1>
            <img src={event.image} alt={event.title} />
            <p>{event.description}</p>
            <p><strong>Date :</strong> {event.date}</p>
            <p><strong>Lieu :</strong> {event.location}</p>
            <p><strong>Organisateur :</strong> {event.organizer}</p>
            <p><strong>Prix :</strong> 💰 {event.price.toFixed(2)}€</p>
        </div>

        <Form />
      </>
    );
};

export default Details;
