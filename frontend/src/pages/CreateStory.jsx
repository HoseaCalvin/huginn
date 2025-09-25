import { useState } from "react";
import { useAuth } from "../hooks/AuthContext.jsx";

import { CategoryList } from "../components/Categories.jsx";
import ThumbnailList from "../components/Thumbnails.jsx";
import { toast } from "react-toastify";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [story, setStory] = useState('');
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState('');

    const MAX_TITLE_LENGTH = 30;
    const MAX_STORY_LENGTH = 500;

    const titleRemaining = MAX_TITLE_LENGTH - title.length;
    const storyRemaining = MAX_STORY_LENGTH - story.length;

    const trackTitleField = (e) => {
        setTitle(e.target.value.slice(0, MAX_TITLE_LENGTH));
    };

    const trackStoryField = (e) => {
        setStory(e.target.value.slice(0, MAX_STORY_LENGTH));
    };

    const validateForm = () => {
        let isTitleValid = true;
        let isStoryValid = true;
        let isCategoryValid = true;

        if(!title || title.length <= 0 || title.length > MAX_TITLE_LENGTH) {
            isTitleValid = false;
        }

        if(!story || story.length <= 0 || story.length > MAX_STORY_LENGTH) {
            isStoryValid = false;
        }

        if(categories.length === 0 || categories.length > 2) {
            isCategoryValid = false;
        }

        return isTitleValid && isStoryValid && isCategoryValid;
    }

    const handleCategory = (categoryName) => {
        setCategories((prev) =>
            prev.includes(categoryName) ? prev.filter((c) => c !== categoryName) : [...prev, categoryName]
        );
    };

    const handleThumbnail = (thumbnail) => {
        setThumbnail(() => (
            !thumbnail ? 'default.jpg' : thumbnail
        ))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            userId: user._id,
            title: title,
            story: story,
            categories: categories,
            thumbnail: thumbnail
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/story/create/`, data);

            toast.success("Story successfully created!"); 
            navigate('/home');
        } catch (error) {
            toast.error("Failed to create a Story!");
            console.error("Can't create a Story!", error);
        }
    }

    return(
        <main className="py-12 px-9 page-spacer sm:px-14 md:py-14 md:px-24">
            <h1 className="font-bold py-0.5 text-base lg:text-lg">Create Story</h1>
            <hr className="mt-1.5 mb-3 text-gray-400 lg:mt-2"/>
            <form onSubmit={handleSubmit}>
                <section className="section-spacer">
                    <p className="text-xs font-semibold py-1 md:text-base lg:text-lg">Title</p>
                    <div className="w-full md:w-4/5">
                        <input type="text" value={title} onChange={trackTitleField} className="w-full px-1 py-1.5 border border-gray-500 rounded-sm text-xs md:text-base"/>
                        <p className="text-xs p-0.5 text-gray-400">{titleRemaining} words left</p>
                    </div>
                </section>
                <section className="section-spacer">
                    <p className="text-xs font-semibold py-1 md:text-base lg:text-lg">Story</p>
                    <div className="w-full md:w-4/5">
                        <textarea value={story} onChange={trackStoryField} className="w-full m-0 p-1 border border-gray-500 min-h-[120px] rounded-sm h-full resize-none text-xs md:max-h-[450px] md:text-base"></textarea>
                        <p className="text-xs p-0.5 text-gray-400">{storyRemaining} words left</p>         
                    </div>
                </section>
                <section className="section-spacer">
                    <p className="text-xs font-semibold py-1 md:text-base lg:text-lg">Category</p>
                    <div className="w-full py-1 flex flex-wrap rounded-md md:py-0 md:w-4/5">
                        <CategoryList categoryList={categories} onToggle={handleCategory}/>
                    </div>
                </section>
                <section className="section-spacer">
                    <p className="text-xs font-semibold py-1 md:text-base lg:text-lg">Thumbnail</p>
                    <div className="w-full py-1 flex flex-wrap md:py-0 md:w-4/5">
                        <ThumbnailList selectedPicture={thumbnail} setSelectedPicture={handleThumbnail}/>
                    </div>
                </section>
                <div className="flex justify-center mx-auto w-full mt-6 mb-4 py-5">
                    <button type="submit" disabled={validateForm() === false} className={`primary-button ${validateForm() ? 'cursor-pointer hover:bg-gray-600' : 'opacity-60 cursor-no-drop'}`}>Submit</button>
                </div>
            </form>
        </main>
    )
}

export default Create;