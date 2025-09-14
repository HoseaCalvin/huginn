import { useState, useEffect, useContext, createContext } from "react";

import axios from "axios";

const StoryContext = createContext();

function StoryProvider({ children }) {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchStories = async () => {
            setLoading(true);

            try {
                const storiesResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/story/get/`);
            
                const fetchedStories = storiesResponse.data.data;
            
                setStories(fetchedStories);
                
                setError(false);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchStories();
    }, [])

    return(
        <StoryContext.Provider value={{stories, loading, error}}>
            { children }
        </StoryContext.Provider>
    )
}

export function useStories() {
    return useContext(StoryContext);
}

export default StoryProvider;