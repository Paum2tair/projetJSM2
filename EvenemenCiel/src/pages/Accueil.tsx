import React, { useEffect, useState } from "react";
import "../assets/css/accueil.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Etoiles from "../components/Etoiles";
import { Event } from "../scripts/Event";
import { filterAndSortEvents } from "../scripts/eventUtils";
import { getAllEvents } from "../scripts/GetAll";
interface AccueilProps {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  }
  const Accueil: React.FC<AccueilProps> = ({ events, setEvents }) => {
    const nav = useNavigate();
    //const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [categories, setCategories] = useState<string[]>([]); // Stocke les catégories
    const [error, setError] = useState<string | null>(null);
    const [placesRemainingMap, setPlacesRemainingMap] = useState<{ [key: number]: number }>({});

    // États pour les filtres
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [dateFilter, setDateFilter] = useState<"past" | "future" | undefined>();
    const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | undefined>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const resetFilters = () => {
        setSelectedCategory(undefined);
        setDateFilter(undefined);
        setPriceOrder(undefined);
        setSearchTerm("");
    };
    
    useEffect(() => {
        getAllEvents()
            .then((data: Event[]) => {
                setEvents(data);
                setFilteredEvents(data);
                localStorage.setItem("data",JSON.stringify(data));

                // Extraire les catégories uniques
                const uniqueCategories = Array.from(new Set(data.map(event => event.category)));
                setCategories(uniqueCategories);

                // Initialiser les places restantes
                const placesMap: { [key: number]: number } = {};
                data.forEach(event => {
                    const localStorageKey = `places_remaining_${event.id}`;
                    const savedPlaces = localStorage.getItem(localStorageKey);
                    placesMap[event.id] = savedPlaces !== null ? parseInt(savedPlaces, 10) : event.max_attendees;
                });

                setPlacesRemainingMap(placesMap);
            })
            .catch(error => setError(error.message));
    }, []);

    // Mettre à jour les événements filtrés et triés lorsque les filtres changent
    useEffect(() => {
        setFilteredEvents(filterAndSortEvents(events, selectedCategory, dateFilter, priceOrder, searchTerm));
    }, [events, selectedCategory, dateFilter, priceOrder, searchTerm]);

    // Fonction pour gérer la sélection d'un événement
    const handleSelectEvent = (id: number) => {
        const placesRemaining = placesRemainingMap[id] || 0;

        if (placesRemaining === 0) {
            alert("Aucune place disponible !");
            return;
        }

        nav(`/details/${id}`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="principale_container">
            <Header />
            <Etoiles />

            {/* Filtres dynamiques */}
            <div className="container">
                <div className="filters">
                    <select value={selectedCategory || ''} onChange={(e) => setSelectedCategory(e.target.value || undefined)}>
                        <option value="">Toutes les catégories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <select value={dateFilter || ''} onChange={(e) => setDateFilter(e.target.value as "past" | "future" || undefined)}>
                        <option value="">Toutes les dates</option>
                        <option value="past">Événements passés</option>
                        <option value="future">Événements futurs</option>
                    </select>

                    <select value={priceOrder || ''} onChange={(e) => setPriceOrder(e.target.value as "asc" | "desc" || undefined)}>
                        <option value="">Sans tri</option>
                        <option value="asc">Prix croissant</option>
                        <option value="desc">Prix décroissant</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Rechercher un événement..." 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button onClick={resetFilters}>Réinitialiser les filtres</button>
                </div>
                
                <div className="lescarte">
                    {error && <p className="error">{error}</p>}
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
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
                                    <p className="event-description">{event.description}</p>
                                    <div className="event-price">
                                        {event.price.toFixed(2)}
                                        <img src="/euro.png" alt="Euro" />
                                    </div>
                                </div>
                                {placesRemainingMap[event.id] === 0 && (
                                    <div className="plusplace">
                                        <h2>Y'a plus</h2>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-results">Aucun événement ne correspond à votre recherche</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Accueil;