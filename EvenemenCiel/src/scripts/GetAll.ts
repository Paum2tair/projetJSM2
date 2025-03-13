import { Event } from './Event';

/**
 * Récupère tous les événements depuis le JSON Server
 * @returns Promise contenant un tableau d'événements
 */
export async function getAllEvents(): Promise<Event[]> {
  try {
    const response = await fetch('http://localhost:3000/events');
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const events: Event[] = await response.json();
    return events;
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    throw error;
  }
}

// Exemple d'utilisation:
// import { getAllEvents } from './GetAll';
//
// getAllEvents()
//   .then(events => {
//     console.log('Événements récupérés:', events);
//   })
//   .catch(error => {
//     console.error('Échec de la récupération des événements:', error);
//   });