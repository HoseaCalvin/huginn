import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthContext.jsx";

import { Category } from "../components/Categories.jsx";
import Popup from "../components/Popup.jsx";

import axios from "axios";

function Create() {
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);

    const MAX_TITLE_LENGTH = 30;
    const MAX_STORY_LENGTH = 500;

    const titleRemaining = MAX_TITLE_LENGTH - title.length;
    const storyRemaining = MAX_STORY_LENGTH - story.length;
    
    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/category/get/`);
                
                setAllCategories(response.data);
            } catch (error) {
                console.error("Error in fetching all categories!", error);
            }
        }

        fetchAllCategories();
    }, []);

    const trackTitleField = (e) => {
        setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH));
    };

    const trackStoryField = (e) => {
        setStory(e.target.value.slice(0, MAX_STORY_LENGTH));
    };

    const validateTitle = () => {
        if(!title || title.length <= 1) {
            return false;
        }

        return true;
    }

    const validateStory = () => {
        if(!story || story.length <= 1) {
            return false;
        }

        return true
    }

    const validateCategory = () => {
        if(categories.length === 0) {
            return false;
        }

        return true;
    }

    const handleCategory = (categoryName) => {
        setCategories((prevCategories) => {
            if(prevCategories.includes(categoryName)) {
                return prevCategories.filter((category) => category !== categoryName);
            } else {
                return [...prevCategories, categoryName];
            }
        });
    }

    const handlePopup = () => {

    }

    const isFormValid = validateTitle() && validateStory() && validateCategory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            userId: user._id,
            title: title,
            story: story,
            categories: categories
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/story/create/`, data);

            setTitle("");
            setStory("");
            setCategories([]);
            setIsPopupOpen(true);
        } catch (error) {
            console.error("Can't submit!", error);
        }
    }

    return(
        <div className="bg-gray-100 p-5 h-screen flex justify-center items-center page-spacer">
            <form onSubmit={handleSubmit} className="inner-page-spacer">
                <div className="lg:mb-4 xl:mb-7">
                    <p className="text-xs font-semibold py-2 md:text-sm lg:text-lg">Title:</p>
                    <input type="text" value={title} onChange={trackTitleField} required className="w-full p-1 border-[1px] border-gray-500 rounded-md text-xs lg:text-base"/>
                    <p className="text-xs p-0.5 text-gray-400">{titleRemaining} words left</p>
                </div>
                <div className="my-5 lg:mb-4 xl:mb-7">
                    <p className="text-xs font-semibold py-2 md:text-sm lg:text-lg">Story:</p>
                    <textarea value={story} onChange={trackStoryField} required className="w-full p-1 border-[1px] border-gray-500 max-h-[300px] rounded-md h-full resize-none text-xs lg:text-base"></textarea>
                    <p className="text-xs p-0.5 text-gray-400">{storyRemaining} words left</p>                
                </div>
                <div className="my-5 lg:mb-4 xl:mb-7">
                    <p className="text-xs md:text-sm lg:text-lg font-semibold">Category:</p>
                    <div className="flex min-h-[25px] h-full my-1.5 flex-wrap">
                        { categories.length <= 0 ? 
                            <p className="text-gray-400 text-xs py-1 md:text-sm">No Categories selected.</p> : 
                            <div className="flex overflow-x-scroll scrollbar-hide">
                                {
                                    categories.map((category, index) => (
                                        <Category name={category} onClick={() => handleCategory(category)}/>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <div className="mt-3">
                        <div onWheel={(e) => e.currentTarget.scrollLeft += e.deltaY} className="flex overflow-x-scroll custom-scrollbar border-[1.8px] p-1.5 rounded-md border-gray-300 lg:overflow-x-auto lg:py-4 lg:px-3">
                            {
                                allCategories.map((category, index) => (
                                    <Category name={category} selected={categories.includes(category)} onClick={() => handleCategory(category)}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {/* <div className="lg:mb-4 xl:mb-7 relative">
                    <p className="text-xs font-semibold py-2 md:text-sm lg:text-lg">Thumbnail</p>
                    <button onClick={(e) => setIsThumbnailModalOpen(!isThumbnailModalOpen)} className="cursor-pointer">Select Picture</button>
                    { isThumbnailModalOpen &&
                        <div className="absolute bg-white border max-w-[350px] w-full h-max-[150px] h-full">

                        </div>
                    }
                </div> */}
                <div className="flex justify-center mx-auto w-full mt-6 mb-4 py-5">
                    <button type="submit" disabled={isFormValid === false} className={`primary-button ${isFormValid ? 'cursor-pointer hover:bg-gray-600' : 'opacity-60 cursor-no-drop'}`}>Submit</button>
                    { isPopupOpen && 
                        <Popup 
                            text="Story has been created successfully!" 
                            type="affirmative"
                            onConfirm={() => setIsPopupOpen(false)} 
                        />
                    }
                </div>
            </form>
        </div>
    )
}

export default Create;