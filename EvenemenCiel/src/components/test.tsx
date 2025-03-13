import { JSX } from 'react';
import useFetch from './useFetch';


const id = 10;

const Test = (): JSX.Element => {
    const { data: events, isPending, error } = useFetch();

    if (events) console.log(JSON.stringify(events));

    return (
        <section>
            {/* {error && <p>{error}</p>}
            {isPending && <p>Ça chaaaarge...</p>}
            {events && 
                {events.map(event => (
                    <section>
                        <h4> Nous avons le plaisir d'inviter l'event {event.id}</h4>
                        <small>Aussi connu sous le nom de {event.title}</small>
                        </section>
                ))}
            }
                                       */}
        </section>
    );
};  

export default Test;