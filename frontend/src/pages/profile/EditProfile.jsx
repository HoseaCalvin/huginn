import ProfilePicture from "../../assets/profile-picture.png";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { dateOfBirthFormat } from "../../../../backend/utils/dateFormats.js";

import { useAuth } from "../../hooks/AuthContext.jsx";

import { toast } from "react-toastify";

function EditProfile() {
    const { id } = useParams();
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/get/${id}`);
                
                setUsername(response.data.data.username);
                setPassword(response.data.data.password);
                setDob(new Date(response.data.data.dob).toISOString().split("T")[0]);
            } catch (error) {
                console.error("Error in fetching a User!", error);
            }
        }

        fetchUser();
    }, []);

    const validateForm = () => {
        let isUsernameValid = true;
        let isPasswordValid = true;

        if(!username) {
            isUsernameValid = false;
        }

        if(!password) {
            isPasswordValid = false;
        }
        
        return isUsernameValid && isPasswordValid
    }

    const handleUpdate = async () => {
        const data = {
            username: username,
            password: password,
            dob: new Date(dob).toISOString()
        }

        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/user/update/${id}`, data);

            setUser(response.data.data);

            toast.success("Profile successfully edited!");
            navigate('/profile');
        } catch (error) {
            toast.error("Failed to update Profile!");
            console.error("Error in updating a User! ", error);
        }
    }

    return(
        <main className="page-spacer">
            <div className="flex items-center profile-background h-[150px] relative p-3"></div>
            <div className="flex items-center gap-x-1.5 bg-gray-50 px-3 py-0.5 sm:gap-x-3.5 sm:px-5 lg:px-7
                            dark:bg-[#111418]">
                <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-[100px] h-auto p-1.5 sm:p-2 sm:w-[130px] lg:p-3 lg:w-[170px]"/>
                <div className="space-y-1 sm:space-y-2">
                    <p className="font-semibold text-xl sm:text-2xl lg:text-3xl
                                dark:text-[#CBD5E1]">{username}</p>
                    <p className="text-sm sm:text-base lg:text-xl
                                dark:text-[#CBD5E1]">{dateOfBirthFormat(dob)}</p>
                </div>
            </div>
            <div className="mx-auto max-w-[1300px]">
                <div className="space-y-5 divide-[#323843] px-8 py-6 sm:px-14 md:px-20 lg:pt-15 lg:space-y-6">
                    <div className="flex justify-between w-full">
                        <p className="section-text-2">Username</p>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="text-right p-1 text-xs outline-none border-0 border-transparent border-b focus:border-gray-500 rounded-sm md:text-sm lg:text-lg
                                                                                                                    dark:text-[#F1F5F9] dark:border-transparent dark:border-b dark:focus:border-b dark:focus:border-[#525a6a]"/>
                    </div>
                    <hr />
                    <div className="flex justify-between w-full">
                        <p className="section-text-2">Password</p>
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="text-right p-1 text-xs outline-none border-0 border-transparent border-b focus:border-gray-500 rounded-sm md:text-sm lg:text-lg
                                                                                                                    dark:text-[#F1F5F9] dark:focus:border-[#525a6a]"/>
                    </div>
                    <hr />
                    <div className="flex justify-between w-full">
                        <p className="section-text-2">Date of Birth</p>
                        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="text-right p-1 text-xs outline-none border-0 border-transparent border-b focus:border-gray-500 rounded-sm md:text-sm lg:text-lg
                                                                                                            dark:text-[#F1F5F9] dark:focus:border-[#525a6a]"/>
                    </div>
                </div>
                <div className="pt-7 pb-20 px-8 w-full h-fit text-center lg:py-12">
                    <button disabled={validateForm() === false} className={`primary-button ${validateForm() ? 'cursor-pointer' : 'opacity-60 pointer-events-none'}`} onClick={() => handleUpdate()}>Update</button>
                </div>
            </div>
        </main>
    )
}

export default EditProfile;