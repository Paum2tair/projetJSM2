import { JSX, useState, useEffect } from 'react';
import useModify from './useModify';
import { Event } from '../scripts/Event';

const Test = (): JSX.Element => {
    const [events, setEvents] = useState<Event[]>([]);
    const { modifyData } = useModify<Event>();

    useEffect(() => {
        fetch('http://localhost:3000/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    }, []);

    //Fonction de mise à jour du JSON
    const updateEvent = (event: any) => {
        fetch(`http://localhost:3000/events/${event.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...event,
            id: Number(event.id)
          }),
        })
          .then(response => response.json())
          .then(updatedEvent => {
            console.log("Événement mis à jour :", updatedEvent);
          })
          .catch(error => console.error("Erreur lors de la mise à jour :", error));
      }

    return (
        <section>
            {events.length === 0 && <p>Ça chaaaarge...</p>}
            {events.map(event => (
                <section key={event.id}>
                    <h4> Nous avons le plaisir d'inviter l'event {event.id}</h4>
                    <small>Aussi connu sous le nom de {event.title}</small>
                    <p>Nombre de tickets : {event.nb_ticket}</p>
                    <button onClick={() => updateEvent({ ...event, nb_ticket: String(Number(event.nb_ticket) + 1) })}>
                        Ajouter un 
                    </button>
                </section>
            ))}
        </section>
    );
};

export default Test;