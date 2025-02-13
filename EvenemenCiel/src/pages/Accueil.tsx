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
                    <img src={`/images/${event.title}.jpg`} alt={event.title} />
                    <div className="event-content">
                        <div className="event-title">{event.title}</div>
                        <div className="event-date">📅 {event.date}</div>
                        <div className="event-location"><img src="/epingle-de-la-carte.png"></img> {event.location}</div>
                        <p className='event-description'>{event.description}</p>
                        <div className="event-price">{event.price.toFixed(2)}<img src="/euro.png"></img></div>
                    </div>
                    <div className="plusplace hidden"></div>
                </div>
            ))}
            </div>
        </div>
        < Footer />
        </div>
    );

};

export default Accueil;
