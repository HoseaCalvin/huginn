import ProfilePicture from "../assets/profile-picture.png";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { exposeOrMaskUsername } from "../../../backend/utils/hideUsername.js";
import { textFormat } from "../../../backend/utils/dateFormats.js";

import { useAuth } from "../hooks/AuthContext";

import { CategoryBadge } from "../components/Categories";
import ReactionCard from "../components/ReactionCard";

function StoryPage() {
    const { id } = useParams();
    const { user } = useAuth();
    
    const [storyData, setStoryData] = useState(null);
    const [allComments, setAllComments] = useState([]);

    const [commentText, setCommentText] = useState('');

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
            <main className="page-spacer lg:px-12 lg:py-9">
                <p>Loading story...</p>
            </main>
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
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/comment/create/68da4036abfc9f9f4065e93a`, data);
        
            setCommentText('');

            window.location.reload();
        } catch (error) {
            console.error("Error in inserting a Story comment!", error);
        }
    }

    return(
        <main className="page-spacer p-8 sm:p-10 md:p-12 lg:p-14">
            <div className="mx-auto max-w-[1300px]">
                <div className="pb-2.5 lg:pb-4">
                    <h1 className="text-xs md:text-sm lg:text-base">{exposeOrMaskUsername(storyData.userId.username, user.username)}</h1>
                </div>
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">{storyData.title}</h1>
                <div className="flex gap-x-2 items-center py-1.5 md:py-2.5 lg:py-3">
                    <p className="text-gray-500 text-xs md:text-base">{textFormat(storyData.createdAt)}</p>
                    <p className="font-semibold text-gray-400 text-xs md:text-base">·</p>
                    {
                        storyData.categories.map((category) => (
                            <CategoryBadge category={category}/>
                        ))
                    }
                </div>
                <article className="h-fit py-3.5 lg:py-6">
                    <p className="text-sm md:text-base">{storyData.story}</p>
                </article>
                <hr />
                <section className="py-4 lg:py-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-1.5">
                            <h2 className="font-semibold text-sm md:text-base">Reactions:</h2>
                            <ReactionCard id={id} reactions={storyData.reactions}/>
                        </div>
                    </div>
                    <form onSubmit={submitComment} className="w-full pt-8 pb-4 lg:pt-6 lg:pb-2">
                        <h2 className="font-semibold text-sm pb-1.5 md:text-base lg:text-lg">Comments</h2>
                        <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="What do you think about this Story?" className="border rounded-lg w-full text-xs px-2.5 py-2"/>
                        <div className="flex justify-end px-2.5 py-2 w-full gap-x-3 lg:gap-x-6">
                            <button className="font-semibold cursor-pointer text-xs md:text-base">Clear</button>
                            <button type="submit" className="bg-black text-white font-semibold px-4 py-1 rounded-full text-xs cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600 md:text-base">Send</button>
                        </div>
                    </form>
                    <article>
                        {
                            allComments.map((comment, key) => (
                                <div className="flex items-center gap-x-3 pb-6 md:pb-8 lg:pb-10">
                                    <img src={ProfilePicture} alt="Profile Picture" className="h-auto w-[40px] sm:w-[50px] md:w-[60px]"/>
                                    <div className="space-y-0.5">
                                        <h1 className="font-semibold text-gray-400 text-xs md:text-sm lg:text-base">{exposeOrMaskUsername(comment.userId.username, user.username)}</h1>
                                        <p className="text-sm md:text-base">{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </article>
                </section>
            </div>
        </main>
    )
}

export default StoryPage;