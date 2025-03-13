export async function updatePlace(id: number, nbTicket: number, maxAttendees: number): Promise<void> {
    const url = `http://localhost:3000/events`;

    try {
        // Étape 1 : Récupérer tout le tableau `events`
        const response = await fetch(url);
        if (!response.ok) throw new Error("Impossible de récupérer les événements");

        const events = await response.json();

        // Vérifier si l'ID existe dans le tableau
        if (id < 0 || id >= events.length) throw new Error("ID invalide");

        // Vérifier si l'ajout de nbTicket dépasse maxAttendees
        if (events[id].nb_ticket + nbTicket > maxAttendees) {
            throw new Error("Nombre maximum de participants dépassé");
        }

        // Mettre à jour le nb_ticket du bon événement
        events[id].nb_ticket += nbTicket;

        // Étape 2 : Mettre à jour tout le tableau `events` avec un `PUT`
        const updateResponse = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(events),
        });

        if (!updateResponse.ok) throw new Error("Erreur lors de la mise à jour");

        console.log("Mise à jour réussie :", await updateResponse.json());
    } catch (error) {
        console.error("Erreur :", (error as Error).message);
    }
}
