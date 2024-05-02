// src/hooks/useFetchData.js
import { useState, useEffect } from 'react';

function useFetchData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = 'https://raw.githubusercontent.com/xl-spec/Music_Blog/main/src/data/posts.json';

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []); // Empty dependency array ensures this runs only once on mount

    return { data, loading, error };
}

export default useFetchData;
