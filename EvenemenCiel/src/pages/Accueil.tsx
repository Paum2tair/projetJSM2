import React, { useEffect, useState } from 'react';
import "../assets/css/accueil.css";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

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

const Accueil: React.FC = () => {
    const nav = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

    useEffect(() => {
        fetch('/events.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de chargement du JSON');
                }
                return response.json();
            })
            .then(data => setEvents(data))
            .catch(error => setError(error.message));
    }, []);

    // Fonction pour sélectionner un événement
    const handleSelectEvent = (id: number) => {
        setSelectedEventId(id);
        console.log(`Événement sélectionné : ${id}`);
        nav(`/details/${id}`);
    };

    return (
        <div className="principale_container">
        <Header />

         
        <div className="container">
            <div className="lescarte">
            {error && <p className="error">{error}</p>}
            {events.map(event => (
                <div 
                    key={event.id} 
                    className={`event-card ${selectedEventId === event.id ? 'selected' : ''}`} 
                    onClick={() => handleSelectEvent(event.id)}
                >
                    <img src={event.image} alt={event.title} />
                    <div className="event-content">
                        <div>{event.image}</div>
                        <div className="event-title">{event.title}</div>
                        <div className="event-date">📅 {event.date}</div>
                        <div className="event-location">📍 {event.location}</div>
                        <p>{event.description}</p>
                        <div className="event-price">💰 {event.price.toFixed(2)}€</div>
                    </div>
                </div>
            ))}
            </div>
        </div>
        < Footer />
        </div>
    );

};

export default Accueil;
