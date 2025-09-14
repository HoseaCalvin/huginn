import { useState, useEffect } from "react";

import { useStories } from "../hooks/StoryContext.jsx";

import StoryCard from "../components/StoryCard.jsx";
import StoryModal from "../components/StoryModal.jsx";

function Home() {
    const { stories, loading, error } = useStories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchResult, setSearchResult] = useState('');

    const handleOpenStory = (story) => {
        setIsModalOpen(true);
        setSelectedStory(story);
    }

    const handleCloseStory = () => {
        setIsModalOpen(false);
        setSelectedStory(null);
        window.location.reload();
    }

    const filteredStories = stories.filter((story) => {
        let searchedStories = story.title.toLowerCase().includes(searchResult.toLowerCase());

        let filteredStories = selectedCategory ? story.categories.some((category) => (
                category === selectedCategory
            )) : true

        return searchedStories && filteredStories;
    })

    return(
        <>
            { isModalOpen && selectedStory &&
                <StoryModal
                    id={selectedStory._id} 
                    username={selectedStory.userId.username}
                    title={selectedStory.title}
                    categories={selectedStory.categories}
                    story={selectedStory.story}
                    reactions={selectedStory.reactions}
                    modalFunction={() => handleCloseStory()}
                />
            }

            <div className="page-spacer">
                <div className="bg-[#FBFBFB] w-full py-3.5 px-3 shadow-md flex justify-end items-center gap-x-2 lg:gap-x-6 lg:px-5">
                    <div>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="form-control lg:text-md">
                            <option value="">All</option>
                            <option value="Mythology" >Mythology</option>
                            <option value="Dark">Dark</option>
                            <option value="Politics">Politics</option>
                            <option value="Hilarious">Hilarious</option>
                            <option value="Controversial">Controversial</option>
                            <option value="History">History</option>
                            <option value="Heartbreaking">Heartbreaking</option>
                        </select>
                    </div>
                    <div className="max-w-[200px] w-[110px] md:w-full">
                        <input type="text" value={searchResult} placeholder="Search" onChange={(e) => setSearchResult(e.target.value)} className="form-control lg:text-md"/>
                    </div>
                </div>
                { filteredStories.length > 0 ? 
                    <div className="flex flex-col gap-x-3 gap-y-5 my-6 mx-7 z-0 h-full sm:grid sm:grid-cols-3 sm:auto-rows-[170px] sm:place-items-center sm:mt-[2rem] sm:gap-y-5 xl:gap-y-11">
                        {
                            (filteredStories.map((story, key) => (                   
                                <StoryCard
                                    key={key}
                                    title={story.title}
                                    categories={story.categories}
                                    story={story.story}
                                    modalFunction={() => handleOpenStory(story)}
                                />
                            )))
                        }
                    </div>
                    : (
                        <div className="flex justify-center items-center h-screen">
                            <p className="text-lg md:text-2xl lg:text-3xl">No Stories.</p>
                        </div>
                    )
                }
            </div>  
        </>
    )
}

export default Home;