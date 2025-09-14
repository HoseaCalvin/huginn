import ProfilePicture from "../assets/profile-picture.png";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

import Popup from "../components/Popup";

function EditProfile() {
    const { id } = useParams();
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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

    const validateUsername = () => {
        if(!username) {
            return false;
        }

        return true;
    }

    const validatePassword = () => {
        if(!password) {
            return false;
        }

        return true;
    }

    const isFormValid = validateUsername() && validatePassword();

    const handleUpdate = async () => {
        const data = {
            username: username,
            password: password,
            dob: new Date(dob).toISOString()
        }

        try {
            const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/user/update/${id}`, data);

            setUser(response.data.data);
            setIsPopupOpen(true);
        } catch (error) {
            console.error("Error in updating a User! ", error);
        }
    }

    const dateOfBirthFormat = (dob) => {
        return new Date(dob).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });        
    }

    return(
        <div className="page-spacer px-7 lg:px-20">
            <div className="flex mt-12 py-2 items-center bg-gray-50 rounded-xl relative lg:py-0 lg:rounded-3xl lg:mt-5">
                <div>
                    <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-[80px] h-auto p-1.5 md:p-2 md:w-[130px] lg:p-3 lg:w-[220px]"/>
                </div>
                <div className="mx-2 md:mx-4 *:py-0.5 md:*:p-1">
                    <p className="text-sm md:text-xl lg:text-3xl">{username}</p>
                    <p className="text-xs md:text-lg lg:text-xl">{dateOfBirthFormat(dob)}</p>
                </div>
            </div>
            <hr className="my-7 text-gray-300 border-[1px]"/>
            <div className="space-y-6 px-4 lg:px-16">
                <div>
                    <p className="text-xs py-1.5 font-bold md:text-sm">Username</p>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-1 border-[1.6px] text-xs border-gray-400 rounded-md md:text-sm lg:text-base"/>
                </div>
                <div>
                    <p className="text-xs py-1.5 font-bold md:text-sm">Password</p>
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className=" w-full p-1 border-[1.6px] text-xs border-gray-400 rounded-md md:text-sm lg:text-base"/>
                </div>
                <div>
                    <p className="text-xs py-1.5 font-bold md:text-sm">Date of Birth</p>
                    <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="p-1 border-[1.6px] text-xs border-gray-400 rounded-md md:text-sm lg:text-base"/>
                </div>
            </div>
            <div className="px-8 py-12 w-full h-fit text-center">
                <button disabled={isFormValid === false} className={`primary-button ${isFormValid ? 'cursor-pointer hover:bg-gray-600' : 'opacity-60 cursor-no-drop'}`} onClick={() => handleUpdate()}>Update</button>
                    { isPopupOpen && 
                        <Popup 
                            text="Profile has been edited successfully!" 
                            type="affirmative"
                            onConfirm={() => {
                                setIsPopupOpen(false);
                                navigate("/profile");
                            }} 
                        />
                    }                
            </div>
        </div>
    )
}

export default EditProfile;