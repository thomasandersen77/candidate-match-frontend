import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        // Example of how to fetch data from your backend
        const apiClient = axios.create({
            baseURL: import.meta.env.VITE_API_BASE_URL,
        });

        apiClient.get('/api/health') // Replace with a real endpoint
            .then(response => {
                setMessage(response.data.status);
            })
            .catch(error => {
                console.error("Could not connect to the backend:", error);
                setMessage("Failed to connect to backend. Is it running?");
            });
    }, []);

    return (
        <div className="App">
            <h1>Candidate Match Frontend</h1>
            <p>
                Status from backend: <strong>{message}</strong>
            </p>
        </div>
    );
}

export default App;