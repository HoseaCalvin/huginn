import ProfilePicture from "../assets/profile-picture.png";
import Edit from "../assets/svgs/edit.svg?react";
import Delete from "../assets/svgs/delete.svg?react";
import Settings from "../assets/svgs/settings.svg?react";

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";

import { CategoryBadge } from "../components/Categories.jsx";
import Popup from "../components/Popup.jsx";
import ReactionCard from "../components/ReactionCard.jsx";
import StoryModal from "../components/StoryModal.jsx";

function Profile() {
    const { user, logout } = useAuth();

    const [stories, setStories] = useState([]);
    const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
    const [isPersonalizationModalOpen, setIsPersonalizationModalOpen] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);

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

    const dateOfBirthFormat = (dob) => {
        return new Date(dob).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });        
    }

    const handleOpenStory = (story) => {
        setIsStoryModalOpen(true);
        setSelectedStory(story);
    }

    const handleCloseStory = () => {
        setIsStoryModalOpen(false);        
        setSelectedStory(null);
        window.location.reload();
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

            <div className="page-spacer px-7 lg:px-12">
                <div className="flex mt-12 py-2 px-1.5 items-center bg-gray-50 rounded-xl relative lg:py-0 lg:rounded-3xl lg:mt-5">
                    <div>
                        <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-[80px] h-auto p-1.5 md:p-2 md:w-[130px] lg:p-3 lg:w-[220px]"/>
                    </div>
                    <div className="mx-2 md:mx-4 *:py-0.5 md:*:p-1">
                        <p className="text-sm md:text-xl lg:text-3xl">{user.username}</p>
                        <p className="text-xs md:text-lg lg:text-xl">{dateOfBirthFormat(user.dob)}</p>
                    </div>
                    <Settings onClick={() => setIsPersonalizationModalOpen(true)} className="w-[26px] h-auto absolute bottom-0.5 right-2 p-1.5 rounded-full cursor-pointer hover:bg-gray-300 md:bottom-2.5 md:right-3.5 md:w-[30px] lg:w-[35px]"/>                 
                </div>
                <div className="">
                    <div className="flex justify-end p-1.5">
                        <button onClick={logout} className="py-1.5 px-3.5 text-xs bg-red-700 rounded-lg text-white font-semibold cursor-pointer my-2 lg:text-lg lg:my-3.5 lg:py-1.5 lg:px-6">Log Out</button>
                    </div>
                    <hr className="text-gray-300 border-[1px]"/>
                    <div>
                        <p className="p-1.5 mt-1.5 text-sm lg:mt-3 lg:text-lg ">Your Stories</p>
                        { stories.length > 0 ? 
                            <div className="flex flex-col gap-x-3 gap-y-4 py-6 z-0 sm:grid sm:grid-cols-3 sm:auto-rows-auto sm:place-items-center sm:max-h-[130px] sm:gap-y-4 lg:mt-[2rem] lg:py-0 lg:px-7">
                                {
                                    (stories.map((story, key) => (                   
                                        <PersonalStoryCard 
                                            id={story._id}
                                            title={story.title}
                                            categories={story.categories}
                                            reactions={story.reactions}
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
                </div> 
            </div>
        </>
    )
}

function PersonalStoryCard({ id, title, categories, modalFunction }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation();
    }

    const openDeleteModal = (e) => {
        e.stopPropagation();
        setIsDeleteModalOpen(true);
    }

    const closeDeleteModal = (e) => {
        e.stopPropagation();
        setIsDeleteModalOpen(false);
        window.location.reload();
    }

    const handleDelete = async (id) => {
        try {
            const deleteStory = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/story/delete/${id}`);
        } catch (error) {
            console.error("Error in deleting a story!", error);
        }
    }    

    return(
        <>
            <div className="max-w-[350px] max-h-[150px] self-center w-full h-full rounded-xl bg-white shadow-lg py-2.5 px-3 border-[1px] hover:bg-gray-50 cursor-pointer relative after:p-3" onClick={modalFunction} tabIndex={0}>
                <div className="px-2">
                    <h1 className="font-bold text-sm text-center lg:text-xl">{title}</h1>
                </div>
                <div className="mt-3.5 px-2">
                    <div className="flex flex-wrap gap-2">
                        { categories.slice(0, 1).map((category, index) => (
                            <CategoryBadge key={index} category={category}/>
                        ))}

                        {categories.length > 1 && (
                            <span className="border-[1px] py-0.5 px-2 rounded-3xl text-xs text-gray-500 self-center">
                                +{categories.length - 1}
                            </span>
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 right-1.5 rounded-4xl p-1 flex *:flex *:p-1.5 *:cursor-pointer *:hover:bg-gray-200 *:rounded-lg">
                    <Link to={`/story/edit/${id}`} onClick={(e) => handleEdit(e)}>
                        <Edit width={18} height={18}/>
                    </Link>
                    <div onClick={(e) => openDeleteModal(e)}>
                        <Delete width={18} height={18}/>
                    </div>                    
                </div>

                { isDeleteModalOpen && 
                    <Popup 
                        text="Are you sure you want to delete this Story?" 
                        type="confirmation" 
                        onClose={(e) => closeDeleteModal(e)} 
                        onConfirm={(e) => { closeDeleteModal(e); handleDelete(id) }}
                    />
                }                  
            </div>  
        </>
    )
}

function Personalization({ modalFunction }) {
    const { user } = useAuth();

    const [darkMode, setDarkMode] = useState(false);

    return(
        <div className="fixed w-full h-full bg-gray-400/70 z-50">
            <button className="text-5xl text-white p-3 cursor-pointer absolute top-0.5 right-2.5" onClick={modalFunction}>&times;</button>
            <div className="flex flex-col justify-center items-center h-full">
                <div className="bg-white max-w-[250px] max-h-[400px] w-full h-full rounded-2xl px-5 py-4.5 md:max-w-[350px] md:max-h-[400px] lg:max-w-[450px] lg:max-h-[550px]">
                    <div className="flex justify-center items-center w-full mb-3 lg:mb-7">
                        <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Personalization</h1>
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
                    </div>
                </div>   
            </div>            
        </div>
    )
}



export default Profile;