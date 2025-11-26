import ProfilePicture from "../assets/profile-picture.png";
import Settings from "../assets/svgs/settings.svg?react";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";

import { dateOfBirthFormat } from "../../../backend/utils/dateFormats.js";

import StoryModal from "../components/StoryModal.jsx";
import { PersonalStoryCard, SkeletonStoryCard } from "../components/StoryCard.jsx";

function Profile() {
    const { user, loading } = useAuth();

    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
    const [isPersonalizationModalOpen, setIsPersonalizationModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserStories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/story/get/personal/`, { 
                    params: { userId: user._id }
                 })

                setStories(response.data.data);
            } catch (error) {
                console.error("Error in fetching stories: ", error);
            }
        }

        fetchUserStories();
    }, [])

    const handleOpenStory = (story) => {
        setIsStoryModalOpen(true);
        setSelectedStory(story);
    }

    const handleCloseStory = () => {
        setIsStoryModalOpen(false);        
        setSelectedStory(null);
        window.location.reload();
    }

    const handleEdit = (e) => {
        e.stopPropagation();
    }

    return(
        <>
            { isStoryModalOpen && selectedStory &&
                <StoryModal
                    id={selectedStory._id} 
                    title={selectedStory.title}
                    categories={selectedStory.categories}
                    story={selectedStory.story}
                    reactions={selectedStory.reactions}
                    modalFunction={handleCloseStory}
                />
            }

            { isPersonalizationModalOpen && 
                <Personalization modalFunction={() => setIsPersonalizationModalOpen(false)}/>
            }

            <div className="page-spacer">
                <div className="flex items-center profile-background h-[150px] relative p-3">
                    <Settings onClick={() => setIsPersonalizationModalOpen(true)} className="w-[27px] h-auto absolute bottom-2 right-3.5 p-1 rounded-full cursor-pointer bg-white hover:bg-gray-300 md:bottom-3 md:right-7 md:w-[30px]"/>                 
                </div>
                <div className="flex items-center gap-x-1.5 bg-gray-50 px-3 py-0.5 sm:gap-x-3.5 sm:px-5 lg:px-7">
                    <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-[100px] h-auto p-1.5 sm:p-2 sm:w-[130px] lg:p-3 lg:w-[170px]"/>
                    <div className="space-y-1 sm:space-y-2">
                        <p className="font-semibold text-xl sm:text-2xl lg:text-3xl">{user.username}</p>
                        <p className="text-sm sm:text-base lg:text-xl">{dateOfBirthFormat(user.dob)}</p>
                    </div>
                </div>
                <div className="mt-3 px-4 pb-12 md:px-7">
                    <div>
                        <p className="text-base lg:text-lg py-1 sm:pt-3">Your Stories</p>
                        <hr className="my-0.5"/>
                        { loading ? (
                            <div className="flex flex-col gap-x-3 gap-y-5 my-3.5 z-0 h-full sm:grid sm:grid-cols-2 sm:auto-rows-auto sm:place-items-center md:grid-cols-3 md:mt-[1.5rem] md:gap-y-5 xl:gap-y-6">
                                <SkeletonStoryCard/>
                                <SkeletonStoryCard/>
                                <SkeletonStoryCard/>
                                <SkeletonStoryCard/>
                                <SkeletonStoryCard/>
                                <SkeletonStoryCard/>
                            </div>
                        ) : stories.length > 0 ? (
                            <div className="flex flex-col gap-x-3 gap-y-5 my-6 mx-7 z-0 h-full sm:grid sm:grid-cols-2 sm:auto-rows-auto sm:place-items-center md:grid-cols-3 md:mt-[2rem] xl:gap-y-7 xl:w-fit xl:mx-auto">
                                {
                                    stories.map((story, key) => (                   
                                        <PersonalStoryCard 
                                            id={story._id}
                                            thumbnail={story.thumbnail}
                                            title={story.title}
                                            date={story.createdAt}
                                            categories={story.categories}
                                            reactions={story.reactions}
                                            modalFunction={() => handleOpenStory(story)}
                                            editFunction={(e) => handleEdit(e)}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className="flex justify-center items-center h-screen">
                                <p className="text-lg md:text-2xl lg:text-3xl">No Stories.</p>
                            </div>
                        )}
                    </div>           
                </div> 
            </div>
        </>
    )
}

function Personalization({ modalFunction }) {
    const { user, logout } = useAuth();

    const [darkMode, setDarkMode] = useState(false);

    return(
        <div className="fixed w-full h-full bg-gray-400/70 z-50">
            <div className="flex flex-col justify-center items-center h-full">
                <div className="bg-white max-w-[250px] max-h-[400px] w-full h-full rounded-2xl px-5 py-3.5 relative md:max-w-[350px] md:max-h-[400px] lg:max-w-[450px] lg:max-h-[550px]">
                    <button className="text-3xl p-0.5 cursor-pointer absolute top-0.5 right-2" onClick={modalFunction}>&times;</button>
                    <div className="flex justify-center items-center w-full mb-3 lg:mb-7">
                        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Settings</h1>
                    </div>
                    <div className="divide-y-2 divide-gray-200">
                        {/* <div className="flex justify-between px-1.5 py-2.5">
                            <p className="text=xs lg:text-md">Dark Mode</p>
                            <label className="relative inline-block w-12 h-6 cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)}/>
                                <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors duration-300 peer-checked:bg-blue-500"></span>
                                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                            </label>
                        </div> */}
                        <div className="flex justify-between px-1.5 py-1.5 lg:py-2.5">
                            <p className="text-xs self-center md:text-sm">Edit Account</p>
                            <Link to={`/profile/edit/${user._id}`} className="bg-black cursor-pointer py-1 px-2.5 text-white hover:bg-gray-600 text-xs rounded-full md:py-1.5 md:px-3.5">Edit</Link>
                        </div>
                        <div className="flex justify-between px-1.5 py-1.5 lg:py-2.5">
                            <p className="text-xs self-center md:text-sm">Logout</p>
                            <button onClick={logout} className="block bg-red-700 cursor-pointer py-1 px-2.5 text-white hover:bg-red-800 text-xs rounded-full md:py-1.5 md:px-3.5">Log Out</button>
                        </div>
                    </div>
                </div>   
            </div>            
        </div>
    )
}



export default Profile;