import { useState } from 'react';
import { Event } from '../scripts/Event';

interface UseModifyResult<T> {
    data: Event | undefined;
    isPending: boolean;
    error: any | null;
    modifyData: (method: 'PUT', body?: any) => void;
}

const useModify = <T,>(url: string, ): UseModifyResult<T> => {

    url = 'http://localhost:3000/'+url;

    const [data, setData] = useState<Event>();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);

    const modifyData = (method: 'PUT', body?: any) => {
        setIsPending(true);
        setError(null);

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Error modifying data');
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
    };

    return { data, isPending, error, modifyData };
};

export default useModify;