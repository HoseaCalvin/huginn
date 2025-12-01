import ProfilePicture from "../../assets/profile-picture.png";
import Settings from "../../assets/svgs/settings.svg?react";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext.jsx";

import { dateOfBirthFormat } from "../../../../backend/utils/dateFormats.js";

import { PersonalStoryCard, SkeletonStoryCard } from "../../components/StoryCard.jsx";
import { useDark } from "../../hooks/ThemeContext.jsx";

function Profile() {
    const { user, loading } = useAuth();

    const [stories, setStories] = useState([]);
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
    }, []);

    const handleEdit = (e) => {
        e.stopPropagation();
    }

    return(
        <>
            { isPersonalizationModalOpen && 
                <Personalization modalFunction={() => setIsPersonalizationModalOpen(false)}/>
            }

            <div className="page-spacer">
                <div className="flex items-center profile-background h-[150px] relative p-3">
                    <Settings onClick={() => setIsPersonalizationModalOpen(true)} className="w-[27px] h-auto absolute bottom-2 right-3.5 p-1 rounded-full cursor-pointer bg-white hover:bg-gray-300 md:bottom-3 md:right-7 md:w-[30px]
                                                                                            dark:text-[#F1F5F9] dark:bg-[#111418] dark:hover:bg-[#272B33]"/>                 
                </div>
                <div className="flex items-center gap-x-1.5 bg-gray-50 px-3 py-0.5 sm:gap-x-3.5 sm:px-5 lg:px-7
                                dark:bg-[#111418]">
                    <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-[100px] h-auto p-1.5 sm:p-2 sm:w-[130px] lg:p-3 lg:w-[170px]"/>
                    <div className="space-y-1 sm:space-y-2">
                        <p className="font-semibold text-xl sm:text-2xl lg:text-3xl
                                    dark:text-[#CBD5E1]">{user.username}</p>
                        <p className="text-sm sm:text-base lg:text-xl
                                    dark:text-[#CBD5E1]">{dateOfBirthFormat(user.dob)}</p>
                    </div>
                </div>
                <div className="mt-3 px-4 pb-12 md:px-7">
                    <div>
                        <p className="text-base lg:text-lg py-1 sm:pt-3
                                    dark:text-[#F1F5F9]">Your Stories</p>
                        <hr className="my-0.5
                                    dark:border-[#323843]"/>
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
                                <div className="flex flex-col gap-x-3 gap-y-5 my-6 z-0 h-full sm:grid sm:grid-cols-2 sm:auto-rows-auto sm:place-items-center md:grid-cols-3 md:mt-[2rem] xl:gap-y-7 xl:w-fit xl:mx-auto">
                                    {
                                        stories.map((story, key) => (                   
                                            <PersonalStoryCard 
                                                id={story._id}
                                                thumbnail={story.thumbnail}
                                                title={story.title}
                                                date={story.createdAt}
                                                categories={story.categories}
                                                reactions={story.reactions}
                                                editFunction={(e) => handleEdit(e)}
                                            />
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-[250px]">
                                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl
                                                dark:text-[#F1F5F9]">No Stories.</p>
                                </div>
                            )
                        }
                    </div>           
                </div> 
            </div>
        </>
    )
}

function Personalization({ modalFunction }) {
    const { user, logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useDark();

    return(
        <div className="fixed w-full h-full bg-gray-400/70 z-50
                        dark:bg-black/40">
            <div className="flex flex-col justify-center items-center h-full">
                <div className="bg-white max-w-[250px] max-h-[400px] w-full h-full rounded-2xl px-5 py-3.5 relative md:max-w-[350px] md:max-h-[400px] lg:max-w-[450px] lg:max-h-[550px]
                                dark:bg-[#1E1F25] dark:border-[#2C313A] dark:border-2 dark:text-[#F1F5F9]">
                    <button className="text-3xl p-0.5 cursor-pointer absolute top-0.5 right-2" onClick={modalFunction}>&times;</button>
                    <div className="flex justify-center items-center w-full mb-3 lg:mb-7">
                        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Settings</h1>
                    </div>
                    <div className="divide-y-2 divide-gray-200
                                    dark:divide-[#323843]">
                        <div className="flex justify-between px-1.5 py-2.5">
                            <p className="text-xs self-center md:text-sm">Dark Mode</p>
                            <label className="relative inline-block w-12 h-6 cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={(e) => toggleDarkMode(e.target.checked)}/>
                                <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors duration-300 peer-checked:bg-blue-500"></span>
                                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></span>
                            </label>
                        </div>
                        <div className="flex justify-between px-1.5 py-1.5 lg:py-2.5">
                            <p className="text-xs self-center md:text-sm">Edit Account</p>
                            <Link to={`/profile/edit/${user._id}`} className="bg-black cursor-pointer py-1 px-2.5 text-white hover:bg-gray-600 text-xs rounded-full md:py-1.5 md:px-3.5
                                                                            dark:hover:bg-[#3d434f]">Edit</Link>
                        </div>
                        <div className="flex justify-between px-1.5 py-1.5 lg:py-2.5">
                            <p className="text-xs self-center md:text-sm">Sign Out</p>
                            <button onClick={logout} className="block bg-red-700 cursor-pointer py-1 px-2.5 text-white hover:bg-red-800 text-xs rounded-full md:py-1.5 md:px-3.5">Sign Out</button>
                        </div>
                    </div>
                </div>   
            </div>            
        </div>
    )
}

export default Profile;