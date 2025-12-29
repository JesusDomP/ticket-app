import axios from "axios";

// Comunicación con el backend
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000"
});

export default api;