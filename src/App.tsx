import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';


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
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to Your App
            </Typography>
            <Typography variant="body1" gutterBottom>
                {message}
            </Typography>
            <Button variant="contained" color="primary">
                Click me
            </Button>
        </Container>
    );
}

export default App;