import { Event } from './Event';

/**
 * Récupère tous les événements depuis le JSON Server en effectuant des requêtes
 * parallèles pour chaque ID d'événement disponible
 * @returns Promise contenant un tableau d'événements
 */
export async function getAllEvents(): Promise<Event[]> {
  try {
    // Tableau des IDs d'événements à récupérer
    const eventIds = Array.from({ length: 13 }, (_, i) => i); // 0 à 12 inclus
    
    // Création d'un tableau de promesses pour chaque requête
    const promises = eventIds.map(async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/${id}`);
        
        if (!response.ok) {
          console.warn(`Événement avec ID ${id} non trouvé ou inaccessible.`);
          return null;
        }
        
        return await response.json() as Event;
      } catch (error) {
        console.warn(`Erreur lors de la récupération de l'événement ${id}:`, error);
        return null;
      }
    });
    
    // Attendre que toutes les promesses soient résolues
    const results = await Promise.all(promises);
    
    // Filtrer les résultats null (événements non trouvés)
    const events = results.filter((event): event is Event => event !== null);
    
    return events;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
}