import { useState, useEffect } from "react";

import { maskUsername } from "../../../backend/utils/hideUsername.js";

import { CategoryBadge } from "./Categories.jsx";
import ReactionCard from "./ReactionCard.jsx";

function StoryModal({ id, username, title, categories, story, reactions: initialReactions, modalFunction }) {
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

    return(
        <main className="fixed w-full h-full bg-gray-400/70 z-100">
            <div className="flex flex-col justify-center items-center h-full">
                <div className="relative bg-white max-w-[280px] max-h-[450px] w-full h-full rounded-2xl px-5 py-4.5 mx-6 overflow-y-auto sm:max-w-[450px] md:max-w-[680px] md:max-h-[520px] lg:max-w-[930px] lg:max-h-[550px]">
                    <button className="text-4xl p-1 cursor-pointer absolute top-0.5 right-2" onClick={modalFunction}>&times;</button>
                    <h1 className="text-center text-lg font-bold md:text-xl lg:text-2xl">{title}</h1>
                    <div className="flex justify-between mt-4 md:mt-2 lg:mt-3">
                        <div>
                            <ReactionCard id={id} reactions={reactions}/>
                        </div>
                        <div>
                            <h2 className="text-sm px-4">{maskUsername(username)}</h2>
                        </div>
                    </div>
                    <hr className="my-1.5 lg:my-2"/>
                    <div className="flex overflow-x-scroll scrollbar-hide w-full gap-x-2.5 gap-y-3 px-0.5 py-1">
                        {
                            categories.map((category) => (
                                <CategoryBadge category={category}/>
                            ))
                        }
                    </div>
                    <div className="mt-2.5 mb-1 mx-1.5 lg:mt-4">
                        <p className="text-xs md:text-base">{story}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default StoryModal;