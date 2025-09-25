import ProfilePicture from "../assets/profile-picture.png";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { dateOfBirthFormat } from "../../../backend/utils/dateFormats.js";

import { useAuth } from "../hooks/AuthContext.jsx";

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
        <div className="page-spacer">
            <div className="flex items-center profile-background h-[150px] relative p-3">
            </div>
            <div className="flex items-center gap-x-1.5 bg-gray-50 px-3 py-0.5 sm:gap-x-3.5 sm:px-5 lg:px-7">
                <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-[100px] h-auto p-1.5 sm:p-2 sm:w-[130px] lg:p-3 lg:w-[170px]"/>
                <div className="space-y-1 sm:space-y-2">
                    <p className="font-semibold text-xl sm:text-2xl lg:text-3xl">{username}</p>
                    <p className="text-sm sm:text-base lg:text-xl">{dateOfBirthFormat(dob)}</p>
                </div>
            </div>
            <div className="space-y-5 px-8 py-6 sm:px-14 md:px-20 lg:px-24">
                <div>
                    <p className="text-xs py-1 font-semibold md:text-sm">Username</p>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-1 border text-xs border-gray-500 rounded-sm md:text-sm lg:text-base"/>
                </div>
                <div>
                    <p className="text-xs py-1 font-semibold md:text-sm">Password</p>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className=" w-full p-1 border text-xs border-gray-500 rounded-sm md:text-sm lg:text-base"/>
                </div>
                <div>
                    <p className="text-xs py-1 font-semibold md:text-sm">Date of Birth</p>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="p-1 border text-xs border-gray-500 rounded-sm md:text-sm lg:text-base"/>
                </div>
            </div>
            <div className="px-8 py-12 w-full h-fit text-center">
                <button disabled={validateForm() === false} className={`primary-button hover:bg-gray-500 ${validateForm() ? 'cursor-pointer' : 'opacity-60 cursor-no-drop'}`} onClick={() => handleUpdate()}>Update</button>
            </div>
        </div>
    )
}

export default EditProfile;