import { useState, useEffect } from 'react';
import { Event } from '../scripts/Event';

interface UseFetchResult {
    data: Event[] | null;
    isPending: boolean;
    error: any | null;
}

// Hook utilisé pour récupérer les données de l'API
const useFetch = (): UseFetchResult => {
    const url = ('http://localhost:3000/events');
    const [data, setData] = useState<Event[] | null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Error fetching data');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                });
        }, 1000);
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;
