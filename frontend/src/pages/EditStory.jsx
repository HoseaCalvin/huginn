import { useEffect, useState } from "react";
import axios from "axios";

import { Category } from "../components/Categories.jsx";
import Popup from "../components/Popup.jsx";

import { useParams, Link, useNavigate } from "react-router-dom";

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [editStory, setEditStory] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [editCategories, setEditCategories] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const MAX_STORY_LENGTH = 500;

    const storyRemaining = MAX_STORY_LENGTH - editStory.length;

    useEffect(() => {
        const fetchStoryData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/story/get/${id}`);

                setEditStory(response.data.data.story);
                setEditCategories(response.data.data.categories);

                console.log(response.data.data.categories);
            } catch (error) {
                
            }
        }

        const fetchAllCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/category/get/`)

                setAllCategories(response.data);
            } catch (error) {
                console.error("Error in fetching all categories!", error);
            }
        }

        fetchStoryData();
        fetchAllCategories();
    }, []);

    const trackStoryField = (e) => {
        setEditStory(e.target.value.slice(0, MAX_STORY_LENGTH));
    };

    const validateStory = () => {
        if(!editStory || editStory.length <= 1) {
            return false;
        }

        return true
    }

    const validateCategory = () => {
        if(editCategories.length === 0) {
            return false;
        }

        return true;
    }

    const handleCategory = (category) => {
        setEditCategories((prevCategory) => {
            if(prevCategory.includes(category)) {
                return prevCategory.filter((selectedCategory) => category !== selectedCategory);
            } else {
                return [...prevCategory, category];
            }
        })
    }

    const isFormValid = validateStory() && validateCategory();

    const handleSubmit = async () => {
        const data = {
            story: editStory,
            categories: editCategories
        }

        try {
            axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/story/update/${id}`, data);

            setIsPopupOpen(true);
        } catch (error) {
            console.error("Error in updating a Story!", error);
        }
    }

    return(
        <div className="bg-gray-100 p-5 h-screen flex justify-center items-center page-spacer">
            <div className="inner-page-spacer">
                <div className="my-5 lg:mb-4 xl:mb-7">
                    <p className="text-xs font-semibold py-2 md:text-sm lg:text-lg">Story:</p>
                    <textarea value={editStory} onChange={trackStoryField} required className="w-full p-1 border-[1px] border-gray-500 max-h-[300px] rounded-md h-full resize-none text-xs lg:text-base"></textarea>
                    <p className="text-xs p-0.5 text-gray-400">{storyRemaining} words left</p>                
                </div>
                <div className="my-5 lg:mb-4 xl:mb-7">
                    <p className="text-xs md:text-sm lg:text-lg font-semibold">Category:</p>
                    <div className="flex min-h-[25px] h-full my-1.5 flex-wrap">
                        { editCategories.length <= 0 ? 
                            <p className="text-gray-400 text-xs py-1 md:text-sm">No Categories selected.</p> :
                            <div className="flex overflow-x-scroll scrollbar-hide">
                                {
                                    editCategories.map((category) => (
                                        <Category name={category} onClick={() => handleCategory(category)}/>
                                    ))
                                }
                            </div> 
                        }
                    </div>
                    <div className="mt-3">
                        <div onWheel={(e) => e.currentTarget.scrollLeft += e.deltaY} className="flex overflow-x-scroll custom-scrollbar border-[1.8px] p-1.5 rounded-md border-gray-300 lg:py-4 lg:px-3 lg:overflow-x-auto">
                            {
                                allCategories.map((category) => (
                                    <Category name={category} selected={editCategories.includes(category)} onClick={() => handleCategory(category)}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mx-auto w-full mt-6 mb-4 py-5">
                    <button disabled={isFormValid === false} className={`primary-button ${isFormValid ? 'cursor-pointer hover:bg-gray-600' : 'opacity-60 cursor-no-drop'}`} onClick={handleSubmit}>Submit</button>
                    { isPopupOpen && 
                        <Popup 
                            text="Story has been edited successfully!" 
                            type="affirmative"
                            onConfirm={() => {
                                setIsPopupOpen(false);
                                navigate("/profile");
                            }} 
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default Edit;