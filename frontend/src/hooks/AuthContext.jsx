import { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("userToken");
        const savedUser = localStorage.getItem("userCred");

        if(savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        if (user && token) {
            localStorage.setItem("userCred", JSON.stringify(user));
            localStorage.setItem("userToken", token);
        } else {
            localStorage.removeItem("userCred");
            localStorage.removeItem("userToken");
        }
    }, [user, token]);

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/login/`, { username, password });

            if(response.data.success) {
                setUser(response.data.user);
                setToken(response.data.token);

                localStorage.setItem("userToken", response.data.token);
                localStorage.setItem("userCred", JSON.stringify(response.data.user));
                setIsAuthenticated(true);

                return true;
            }

            return false;
        } catch (error) {
            console.error("Login failed!", error);

            localStorage.removeItem("userToken");
            localStorage.removeItem("userCred");

            setUser(null);
            setToken(null);
            setIsAuthenticated(false);

            return false;
        } finally {
            setLoading(false)
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("userToken");
        localStorage.removeItem("userCred");

        setIsAuthenticated(false);
    }

    return(
        <AuthContext.Provider value={{ user, setUser, token, isAuthenticated, loading, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;