import // api.ts
import axios, {AxiosInstance} from 'axios';

interface HealthResponse {
    status: string;
}

export class ApiService {
    private client: AxiosInstance;

    constructor(baseURL: string) {
        this.client = axios.create({baseURL});
    }

    async getHealthStatus(): Promise<string> {
        try {
            const response = await this.client.get<HealthResponse>('/api/health');
            return response.data.status;
        } catch (error) {
            throw new Error('Failed to connect to backend. Is it running?');
        }
    }
}

// App.tsx
import {useState, useEffect} from 'react';
import {ApiService} from './api';

interface AppProps {
    apiService: ApiService;
}

export function App({apiService}: AppProps) {
    const [message, setMessage] = useState<string>('Loading...');

    useEffect(() => {
        const fetchHealthStatus = async () => {
            try {
                const status = await apiService.getHealthStatus();
                setMessage(status);
            } catch (error) {
                console.error("Backend connection error:", error);
                setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
            }
        };

        fetchHealthStatus();
    }, [apiService]);

    return (
        <div className="App">
            <h1>Candidate Match Frontend</h1>
            <p>
                Status from backend: <strong>{message}</strong>
            </p>
        </div>
    );
}

// main.tsx
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {App} from './App';
import {ApiService} from './api';

const apiService = new ApiService(import.meta.env.VITE_API_BASE_URL);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App apiService={apiService}/>
    </StrictMode>
);, { useState, useEffect } from 'react';
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