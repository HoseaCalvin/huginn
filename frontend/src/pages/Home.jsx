import Search from "../assets/svgs/search.svg?react";

import { useState } from "react";

import { useStories } from "../hooks/StoryContext.jsx";

import { StoryCard, SkeletonStoryCard } from "../components/StoryCard.jsx";
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

            <main className="page-spacer">
                <div className="bg-[#FBFBFB] w-full py-3.5 px-3 shadow-md flex justify-end items-center gap-x-2 lg:gap-x-4 lg:px-5">
                    <section>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="form-control focus:outline-none lg:text-md">
                            <option value="">All</option>
                            <option value="Mythology" >Mythology</option>
                            <option value="Dark">Dark</option>
                            <option value="Politics">Politics</option>
                            <option value="Hilarious">Hilarious</option>
                            <option value="Controversial">Controversial</option>
                            <option value="History">History</option>
                            <option value="Heartbreaking">Heartbreaking</option>
                        </select>
                    </section>
                    <section className="max-w-[200px] w-[85px] sm:w-[160px] md:w-full">
                        <div className="flex border border-gray-400 rounded-lg overflow-hidden sm:rounded-full">
                            <input type="text" value={searchResult} placeholder="Search" onChange={(e) => setSearchResult(e.target.value)} className="focus:outline-none flex-1 bg-white text-xs px-2 py-1.5 sm:rounded-l-full lg:text-md"/>
                            <Search className="hidden w-[27px] h-auto px-1.5 mx-auto sm:block"/>
                        </div>
                    </section>
                </div>
                { loading ? (
                    <div className="flex flex-col gap-x-3 gap-y-5 my-6 mx-7 z-0 h-full sm:grid sm:grid-cols-2 sm:auto-rows-auto sm:place-items-center md:grid-cols-3 md:mt-[2rem] xl:gap-y-7">
                        <SkeletonStoryCard/>
                        <SkeletonStoryCard/>
                        <SkeletonStoryCard/>
                        <SkeletonStoryCard/>
                        <SkeletonStoryCard/>
                        <SkeletonStoryCard/>                    
                    </div>
                ) : filteredStories.length > 0 ? (
                    <div className="flex flex-col gap-x-3 gap-y-5 my-6 mx-7 z-0 h-full sm:grid sm:grid-cols-2 sm:auto-rows-auto sm:place-items-center md:grid-cols-3 md:mt-[2rem] xl:gap-y-7">
                        {
                            filteredStories.map((story, key) => (                   
                                <StoryCard
                                    key={key}
                                    thumbnail={story.thumbnail}
                                    title={story.title}
                                    date={story.createdAt}
                                    categories={story.categories}
                                    modalFunction={() => handleOpenStory(story)}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-lg md:text-2xl lg:text-3xl">No Stories.</p>
                    </div>
                )}
            </main>  
        </>
    )
}

export default Home;