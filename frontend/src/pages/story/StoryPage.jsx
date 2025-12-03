import ProfilePicture from "../../assets/profile-picture.png";
import Option from "../../assets/svgs/three-dots.svg?react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { exposeOrMaskUsername } from "../../../../backend/utils/hideUsername.js";
import { textFormat } from "../../../../backend/utils/dateFormats.js";

import { useAuth } from "../../hooks/AuthContext.jsx";

import { CategoryBadge } from "../../components/Categories.jsx";
import ReactionCard from "../../components/ReactionCard.jsx";
import { PopupConfirmation } from "../../components/Popup.jsx";

function StoryPage() {
    const { id } = useParams();
    const { user } = useAuth();
    
    const [storyData, setStoryData] = useState(null);
    const [allComments, setAllComments] = useState([]);

    const [commentText, setCommentText] = useState('');
    const [activeOptionIndex, setActiveOptionIndex] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/story/get/${id}`);
                
                setStoryData(res.data.data);
            } catch (error) {
                console.error("Error in fetching Story!", error);                
            }
        }

        const getComments = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/comment/get/story`, {
                    params: { storyId: id }
                });
    
                setAllComments(res.data.data);
            } catch (error) {
                console.error("Error in fetching Story comments!", error);
            }
        }

        getData();
        getComments();
    }, [id]);

    if (!storyData) {
        return (
            <SkeletonStoryPage/>
        );
    }

    const submitComment = async (e) => {
        e.preventDefault();

        const data = {
            storyId: id,
            userId: user._id,
            comment: commentText
        };

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/comment/create`, data);
        
            setCommentText('');

            window.location.reload();
        } catch (error) {
            console.error("Error in inserting a Story comment!", error);
        }
    }

    const deleteComment = async (commentId) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/comment/delete/${commentId}`);

            window.location.reload();
        } catch (error) {
            console.error("Error in deleting a Story comment!", error);            
        }
    }

    const validateComment = () => {
        if(commentText === null || commentText.trim() === '') {
            return false;
        }

        return true;
    }

    return(
        <>
            <main className="page-spacer py-9 px-6 sm:p-10 md:p-12 lg:p-14">
                <div className="mx-auto max-w-[1300px]">
                    <div className="pb-2.5 lg:pb-4">
                        <h1 className="text-xs md:text-sm lg:text-base
                                    dark:text-[#CBD5E1]">{exposeOrMaskUsername(storyData.userId.username, user.username)}</h1>
                    </div>
                    <h1 className="font-bold text-xl md:text-2xl lg:text-3xl
                                dark:text-[#F1F5F9]">{storyData.title}</h1>
                    <div className="space-x-2 sm:items-center py-1 md:flex md:py-2.5 lg:py-3">
                        <p className="text-gray-500 pb-2 text-xs md:pb-0 md:text-base">{textFormat(storyData.createdAt)}</p>
                        <p className="hidden font-semibold text-gray-400 text-[10px] md:inline-block md:text-base">·</p>
                        {
                            storyData.categories.map((category) => (
                                <CategoryBadge category={category}/>
                            ))
                        }
                    </div>
                    <article className="h-fit pt-8 pb-3 lg:py-6">
                        <p className="text-xs sm:text-sm md:text-base
                                    dark:text-[#CBD5E1]">{storyData.story}</p>
                    </article>
                    <hr className="border-gray-300 
                                dark:border-[#323843]"/>
                    <section className="py-1.5 lg:py-3">
                        <div className="space-y-4">
                            <div className="flex items-center gap-x-1.5">
                                <ReactionCard id={id} reactions={storyData.reactions}/>
                            </div>
                        </div>
                        <form onSubmit={submitComment} className="w-full pt-4 pb-4 lg:pt-6 lg:pb-2">
                            <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="What do you think about this Story?" className="border-0 border-b-2 rounded-xl border-gray-400 w-full text-xs px-2 py-2 outline-0 transition-all focus:border-black sm:px-2.5 sm:text-sm md:text-base
                                                                                                                                                                            dark:border-[#2C313A] dark:focus:border-[#525a6a] dark:text-[#CBD5E1]"/>
                            <div className="flex justify-end px-2.5 py-2 w-full gap-x-2 md:py-2 md:gap-x-3 lg:gap-x-4">
                                <div onClick={() => setCommentText('')} className="font-semibold cursor-pointer px-4 py-1 rounded-full text-xs transition-all ease-in-out duration-300 hover:bg-red-700 hover:text-white md:text-base
                                                                                dark:text-white">Clear</div>
                                <button type="submit" disabled={validateComment() === false} className={`${validateComment() ? 'cursor-pointer hover:bg-gray-600' : 'opacity-60 pointer-events-none'} bg-black text-white font-semibold px-4 py-1 rounded-full text-xs transition-all ease-in-out duration-300 md:text-base
                                                                                                        dark:bg-white dark:text-black dark:hover:bg-gray-300`}>Send</button>
                            </div>
                        </form>
                        <article>
                            <h2 className="font-semibold text-xs pb-4 sm:text-sm md:text-base md:pb-5 lg:text-lg
                                        dark:text-[#F1F5F9]">Comments</h2>
                            { allComments.map((comment, key) => (
                                    <div className="relative flex items-center gap-x-3 mb-6 md:mb-8 lg:mb-10">
                                        { comment.userId.username == user.username &&
                                            <Option onClick={() => setActiveOptionIndex(activeOptionIndex === key ? null : key)} className="absolute p-1.5 cursor-pointer rounded-full top-1 right-1 h-auto w-[25px] lg:w-[30px] hover:bg-gray-200 md:top-2
                                                                                                                                            dark:text-[#94A3B8] dark:hover:bg-[#272B33]"/>                                    
                                        }
                                        { comment.userId.username == user.username && activeOptionIndex === key &&
                                            <div className="bg-white absolute shadow-md p-1.5 space-y-3.5 rounded-lg top-6 right-1 *:hover:bg-gray-100 md:top-11
                                                            dark:bg-[#111418] dark:text-[#F1F5F9] dark:border dark:border-[#363940]">
                                                <p onClick={() => setIsPopupOpen(true)} className="text-xs cursor-pointer px-2.5 py-1.5 rounded-lg md:text-sm
                                                                                                    dark:hover:bg-[#3d434f]">Delete</p>
                                            </div>
                                        }
                                        { isPopupOpen &&
                                            <PopupConfirmation
                                                header={"Are you sure you want to delete this comment?"}
                                                text={"This will permanently delete your comment!"}
                                                onClose={() => setIsPopupOpen(false)}
                                                onConfirm={() => deleteComment(comment._id)}
                                            />
                                        }
                                        <img src={ProfilePicture} alt="Profile Picture" draggable="false" className="h-auto w-[35px] sm:w-[50px] md:w-[60px]"/>
                                        <div className="space-y-0.5">
                                            <h1 className="font-semibold text-gray-400 text-xs md:text-sm lg:text-base
                                                dark:text-[#CBD5E1]">{exposeOrMaskUsername(comment.userId.username, user.username)}</h1>
                                            <p className="text-sm md:text-base
                                                dark:text-[#F1F5F9]">{comment.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </article>
                    </section>
                </div>
            </main>
        </>
    )
}

function SkeletonStoryPage() {
    return(
        <main className="page-spacer animate-pulse py-15 px-6 sm:p-10 md:p-12 lg:p-14">
            <div className="bg-gray-100 rounded-lg h-[20px] my-2.5 w-[80px] sm:w-[100px]
                            dark:bg-[#3d434f]"></div>
            <div className="bg-gray-100 rounded-lg h-[40px] my-2 sm:w-[400px] md:my-3 md:w-[500px]
                            dark:bg-[#3d434f]"></div>
            <div className="flex gap-x-4.5 md:gap-x-6">
                <div className="bg-gray-100 rounded-lg h-[25px] my-1 w-[80px] lg:w-[130px]
                                dark:bg-[#3d434f]"></div>
                <div className="bg-gray-100 rounded-lg h-[25px] my-1 w-[120px] lg:w-[300px]
                                dark:bg-[#3d434f]"></div>
            </div>
            <div className="bg-gray-100 rounded-lg h-[110px] mt-4 mb-8 md:my-7 lg:my-8
                            dark:bg-[#3d434f]"></div>
            <div className="bg-gray-100 rounded-lg h-[8px]
                            dark:bg-[#3d434f]"></div>
            <div className="bg-gray-100 rounded-lg h-[25px] my-4.5 w-[120px] lg:w-[220px]
                            dark:bg-[#3d434f]"></div>
            <div className="bg-gray-100 rounded-lg h-[35px] mt-7 mb-3
                            dark:bg-[#3d434f]"></div>
            <div className="flex gap-x-3 justify-end">
                <div className="bg-gray-100 rounded-lg h-[25px] w-[60px] md:w-[80px] lg:w-[100px]
                                dark:bg-[#3d434f]"></div>
                <div className="bg-gray-100 rounded-lg h-[25px] w-[60px] md:w-[80px] lg:w-[100px]
                                dark:bg-[#3d434f]"></div>
            </div>
            <div className="bg-gray-100 rounded-lg mt-6 h-[25px] w-[100px] md:mt-3 lg:w-[130px]
                            dark:bg-[#3d434f]"></div>
            <div className="my-4.5 flex gap-x-4.5 md:my-6">
                <div className="bg-gray-100 rounded-full h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]
                                dark:bg-[#3d434f]"></div>
                <div className="space-y-1.5 lg:space-y-3">
                    <div className="bg-gray-100 rounded-full h-[20px] w-[60px] lg:w-[80px]
                                    dark:bg-[#3d434f]"></div>
                    <div className="bg-gray-100 rounded-full h-[20px] w-[120px] lg:w-[150px]
                                    dark:bg-[#3d434f]"></div>
                </div>
            </div>
            <div className="my-4.5 flex gap-x-4.5 md:my-6">
                <div className="bg-gray-100 rounded-full h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]
                                dark:bg-[#3d434f]"></div>
                <div className="space-y-1.5 lg:space-y-3">
                    <div className="bg-gray-100 rounded-lg h-[20px] w-[60px] lg:w-[80px]
                                    dark:bg-[#3d434f]"></div>
                    <div className="bg-gray-100 rounded-lg h-[20px] w-[120px] lg:w-[150px]
                                    dark:bg-[#3d434f]"></div>
                </div>
            </div>
        </main>
    )
}

export default StoryPage;