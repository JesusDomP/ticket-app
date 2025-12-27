import axios from "axios";

// Comunicación con el backend
const api = axios.create({
    baseURL: "http://localhost:4000/api",
});

export default api;