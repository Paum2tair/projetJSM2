import { useState } from 'react';

interface UseModifyResult<T> {
    data: T | null;
    isPending: boolean;
    error: any | null;
    modifyData: (url: string, method: 'POST' | 'PUT' | 'DELETE', body: any) => void;
}

const useModify = <T,>(): UseModifyResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<any | null>(null);

    const modifyData = (url: string, method: 'POST' | 'PUT' | 'DELETE', body: any) => {
        setIsPending(true);
        setError(null);

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
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