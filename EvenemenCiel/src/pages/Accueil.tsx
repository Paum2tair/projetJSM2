import React, { useEffect, useState } from "react";
import "../assets/css/accueil.css";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Etoiles from "../components/Etoiles";
import { Event } from "../scripts/Event";
import { filterAndSortEvents } from "../scripts/eventUtils";
interface AccueilProps {
    events: Event[];
  }

  const Accueil: React.FC<AccueilProps> = ({ events }) => {
    // Variable servant à la navigation entre les pages
    const nav = useNavigate();

    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

    // Stocke les catégories
    const [categories, setCategories] = useState<string[]>([]); 

    //Stocke le nomvre de place restante pour les évènements
    const [placesRemainingMap, setPlacesRemainingMap] = useState<{ [key: number]: number }>({});

    // États pour les filtres
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [dateFilter, setDateFilter] = useState<"past" | "future" | undefined>();
    const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | undefined>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    // Fonction pour enlever les filtres
    const resetFilters = () => {
        setSelectedCategory(undefined);
        setDateFilter(undefined);
        setPriceOrder(undefined);
        setSearchTerm("");
    };

    // Mettre à jour le nombre de place restante
    useEffect(() => {
        const placesMap: { [key: number]: number } = {};
        events.forEach(event => {
            const savedPlaces = event.nb_ticket;
            placesMap[event.id] = savedPlaces !== null ? event.max_attendees - savedPlaces: event.max_attendees;
        });
        setPlacesRemainingMap(placesMap);
        const uniqueCategories = Array.from(new Set(events.map(event => event.category)));
        setCategories(uniqueCategories);
    },[events]);

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

    // Fonction pour la barre de recherche
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
                
                {/* Affichage des évènements sous forme de cartes */}
                <div className="lescarte">
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