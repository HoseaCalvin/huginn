import { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );
    
    useEffect(() => {
        if(isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

    return(
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            { children }
        </ThemeContext.Provider>
    )
}

export function useDark() {
    return useContext(ThemeContext);
}

export default ThemeProvider;