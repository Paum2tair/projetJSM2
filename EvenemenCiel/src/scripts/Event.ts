/** Interface représentant la structure d'un événement avec ses propriétés telles que l'ID,
 *  le titre, la description, la date, le lieu,
 *  la catégorie, l'image, l'organisateur, le nombre maximum de participants,
 *  le nombre de billets sélectionnés et le prix. */
export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    image: string;
    organizer: string;
    max_attendees: number;
    nb_ticket: number;
    price: number;
}