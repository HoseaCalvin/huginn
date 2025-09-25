import Delete from "../assets/svgs/delete.svg?react";

import { useEffect, useState } from "react";
import axios from "axios";

import { CategoryList } from "../components/Categories.jsx";
import { PopupConfirmation } from "../components/Popup.jsx";
import ThumbnailList from "../components/Thumbnails.jsx";
import { toast } from "react-toastify";

import { useParams, Link, useNavigate } from "react-router-dom";

function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [editStory, setEditStory] = useState('');
    const [editCategories, setEditCategories] = useState([]);
    const [editThumbnail, setEditThumbnail] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const MAX_STORY_LENGTH = 500;

    const storyRemaining = MAX_STORY_LENGTH - editStory.length;

    useEffect(() => {
        const fetchStoryData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/story/get/${id}`);

                setEditStory(response.data.data.story);
                setEditCategories(response.data.data.categories);
                setEditThumbnail(response.data.data.thumbnail);
            } catch (error) {
                console.error("Error in fetching Story data!", error);
            }
        }

        fetchStoryData();
    }, []);

    const trackStoryField = (e) => {
        setEditStory(e.target.value.slice(0, MAX_STORY_LENGTH));
    };

    const validateForm = () => {
        let isStoryValid = true;
        let isCategoryValid = true;

        if(!editStory || editStory.length <= 0) {
            isStoryValid = false;
        }

        if(editCategories.length === 0 || editCategories.length > 2) {
            isCategoryValid = false;
        }

        return isStoryValid && isCategoryValid;
    }

    const handleCategory = (categoryName) => {
        setEditCategories((prev) => 
            prev.includes(categoryName) ? prev.filter((selectedCategory) => selectedCategory !== categoryName) : [...prev, categoryName]
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            story: editStory,
            categories: editCategories,
            thumbnail: editThumbnail
        }

        try {
            await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/story/update/${id}`, data);

            toast.success("Story successfully edited!");
            navigate('/profile');
        } catch (error) {
            toast.error("Failed to update Story!");
            console.error("Error in updating a Story!", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/story/delete/${id}`);

            toast.success("Story successfully deleted!");
            navigate('/profile');
        } catch (error) {
            toast.error("Failed to delete Story!");
            console.error("Error in deleting a story!", error);
        }
    }

    return(
        <>
            { isPopupOpen &&
                <PopupConfirmation
                    header={"Are you sure you want to delete this Story?"}
                    text={"This action cannot be reversed. Doing so will remove your Story forever!"}
                    onClose={() => setIsPopupOpen(false)}
                    onConfirm={() => handleDelete(id)}
                />
            }

            <main className="py-12 px-9 page-spacer sm:px-14 md:py-14 md:px-24">
                <h1 className="font-bold py-0.5 text-base lg:text-lg">Edit Story</h1>
                <hr className="mt-1.5 mb-3 text-gray-400 lg:mt-2"/>
                <div className="w-full *:cursor-pointer *:hover:bg-gray-200 *:rounded-lg">
                    <Delete onClick={() => setIsPopupOpen(true)} className="w-[25px] h-auto justify-self-end p-0.5 md:p-1 md:w-[27px]"/>
                </div>
                <form onSubmit={handleSubmit}>
                    <section className="section-spacer">
                        <p className="text-xs font-semibold py-1 md:text-base">Story</p>
                        <div className="w-full md:w-4/5">
                            <textarea value={editStory} onChange={trackStoryField} required className="w-full p-1 border-[1px] border-gray-500 max-h-[300px] rounded-md h-full resize-none text-xs lg:text-base"></textarea>
                            <p className="text-xs p-0.5 text-gray-400">{storyRemaining} words left</p>      
                        </div>
                    </section>
                    <section className="section-spacer">
                        <p className="text-xs font-semibold py-1 md:text-base">Category</p>
                        <div className="w-full py-1 flex flex-wrap rounded-md md:py-0 md:w-4/5">
                            <CategoryList categoryList={editCategories} onToggle={handleCategory}/>
                        </div>
                    </section>
                    <section className="section-spacer">
                        <p className="text-xs font-semibold py-1 md:text-base">Thumbnail</p>
                        <div className="w-full py-1 flex flex-wrap md:py-0 md:w-4/5">
                            <ThumbnailList selectedPicture={editThumbnail} setSelectedPicture={setEditThumbnail}/>
                        </div>
                    </section>
                    <section className="flex justify-center mx-auto w-full mt-6 mb-4 py-5">
                        <button type="submit" disabled={validateForm === false} className={`primary-button ${validateForm ? 'cursor-pointer hover:bg-gray-600' : 'opacity-60 cursor-no-drop'}`}>Update</button>
                    </section>
                </form>
            </main>        
        </>
    )
}

export default Edit;