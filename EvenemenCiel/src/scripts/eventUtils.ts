import { Event } from "./Event";

/**
 * Fonction pour trier les événements selon la catégorie, la date et le prix.
 * @param events Liste des événements à trier.
 * @param category Catégorie des événements (optionnel).
 * @param dateFilter "past" pour les événements passés, "future" pour les futurs, sinon aucun filtre.
 * @param priceOrder "asc" pour tri croissant, "desc" pour décroissant, sinon aucun tri.
 * @param searchTerm string pour la recherche par mot
 * @returns Liste des événements triés.
 */
export const filterAndSortEvents = (
    events: Event[],
    category?: string,
    dateFilter?: "past" | "future",
    priceOrder?: "asc" | "desc",
    searchTerm?: string
): Event[] => {
    let filteredEvents = [...events];
    
    // Filtrer par terme de recherche
    if (searchTerm && searchTerm.length >= 3) {
        const searchLower = searchTerm.toLowerCase();
        filteredEvents = filteredEvents.filter(event => 
            event.title.toLowerCase().includes(searchLower) || 
            event.description.toLowerCase().includes(searchLower) ||
            event.price.toFixed(2).toString().toLowerCase().includes(searchLower) ||
            event.location.toLowerCase().includes(searchLower)
        );
    }
    
    // Filtrer par catégorie
    if (category) {
        filteredEvents = filteredEvents.filter(event => event.category === category);
    }
    
    // Filtrer par date (événements passés ou futurs)
    if (dateFilter) {
        const today = new Date();
        filteredEvents = filteredEvents.filter(event => {
            const eventDate = new Date(event.date);
            return dateFilter === "past" ? eventDate < today : eventDate >= today;
        });
    }
    
    // Trier par prix
    if (priceOrder) {
        filteredEvents.sort((a, b) => {
            return priceOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
    }
    
    return filteredEvents;
};