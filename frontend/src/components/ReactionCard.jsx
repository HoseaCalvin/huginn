import { useState, useEffect } from "react";
import axios from "axios";

function ReactionCard({ id, reactions: initialReactions }) {
    const [reactions, setReactions] = useState(initialReactions);

    useEffect(() => {
        const eventSource = new EventSource(`${import.meta.env.VITE_API_BASE_URL}/sse/stream`);

        const handleReactionUpdate = (e) => {
            const data = JSON.parse(e.data);

            if(data._id === id) {
                setReactions(data.reactions);
            }
        }

        eventSource.addEventListener("reaction_update", handleReactionUpdate);

        return () => {
            eventSource.removeEventListener("reaction_update", handleReactionUpdate);
            eventSource.close();
        }
    },[id]);

    const handleAddReaction = async (reaction) => {
        setReactions((prev) => ({
            ...prev,
            [reaction]: (prev[reaction] || 0) + 1
        }))

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reaction/add/${id}`, { type: reaction });
        } catch (error) {
            setReactions((prev) => ({
                ...prev,
                [reaction]: Math.max((prev[reaction] || 1) - 1, 0),
            }));
            setError(true);
        }
    }

    return(
        <div className="flex justify-center items-center h-full">
            <ReactionButton emoji='❤️' count={reactions.heart} onClick={() => handleAddReaction('heart')}/>
            <ReactionButton emoji='😭' count={reactions.cry} onClick={() => handleAddReaction('cry')}/>
            <ReactionButton emoji='😂' count={reactions.laugh} onClick={() => handleAddReaction('laugh')}/>
            <ReactionButton emoji='😡' count={reactions.angry} onClick={() => handleAddReaction('angry')}/>
        </div>
    )
}

function ReactionButton({ emoji, count, onClick }) {
    return(
        <div className="mx-1.5 cursor-pointer rounded-md hover:bg-gray-300 text-xs md:text-sm" onClick={(e) => {
            onClick();
            e.stopPropagation();
        }}>
            {emoji}
            {count}
        </div>        
    )    
}

export default ReactionCard;