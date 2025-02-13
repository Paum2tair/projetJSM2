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
    const [placesRemainingMap, setPlacesRemainingMap] = useState<{ [key: number]: number }>({});

    // Chargement des événements et des places restantes
    useEffect(() => {
        fetch('/events.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de chargement du JSON');
                }
                return response.json();
            })
            .then((data: Event[]) => {
                setEvents(data);
            
                // Initialiser les places restantes pour chaque événement
                const placesMap: { [key: number]: number } = {};
                data.forEach((event: Event) => {
                    const localStorageKey = `places_remaining_${event.id}`;
                    const savedPlaces = localStorage.getItem(localStorageKey);
            
                    placesMap[event.id] = savedPlaces !== null ? parseInt(savedPlaces, 10) : event.max_attendees;
                });
            
                setPlacesRemainingMap(placesMap);
            })
            
            .catch(error => setError(error.message));
    }, []);

    // Fonction pour gérer la sélection d'un événement
    const handleSelectEvent = (id: number) => {
        const placesRemaining = placesRemainingMap[id] || 0;

        if (placesRemaining === 0) {
            alert("Aucune place disponible !");
            return;
        }

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
                            className={`event-card ${placesRemainingMap[event.id] === 0 ? "hidden" : ""}`} 
                            onClick={() => handleSelectEvent(event.id)}
                        >
                            <img src={`/images/${event.title}.jpg`} alt={event.title} />
                            <div className="event-content">
                                <div className="event-title">{event.title}</div>
                                <div className="event-date">📅 {event.date}</div>
                                <div className="event-location">
                                    <img src="/epingle-de-la-carte.png" alt="Location" /> {event.location}
                                </div>
                                <p className='event-description'>{event.description}</p>
                                <div className="event-price">
                                    {event.price.toFixed(2)}
                                    <img src="/euro.png" alt="Euro" />
                                </div>
                            </div>

                            {/* La div "plusplace" est cachée uniquement si placesRemaining === 0 */}
                            <div className={`plusplace ${placesRemainingMap[event.id] === 0 ? "hidden" : ""}`}></div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Accueil;
