import axios from "axios";

import { useAuth } from "../hooks/AuthContext.jsx";

export function useApi() {
    const { token } = useAuth();
    
    const instance = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
    })

    instance.interceptors.request.use((config) => {
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    });

    return instance;
}