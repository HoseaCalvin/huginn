import Huginn from "../../assets/huginn-with-text-logo.png";
import HuginnDark from "../../assets/white-huginn-with-text-logo.png";
import StarryNight from "../../assets/side-pictures/starry-night.jpg";
import Back from "../../assets/svgs/back.svg?react";

import { useDark } from "../../hooks/ThemeContext.jsx";

import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const { isDarkMode } = useDark();

    const [username, setUsername] = useState('');
    const [dob, setDob] = useState(null);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState(null);
    const [error, setError] = useState(false);

    const handleUsername = () => {
        if(username.length <= 4) {
            return false;
        }

        return true;
    }

    const handlePassword = () => {
        if(!password || password.length <= 7) {
            return false;
        }

        return true;
    }

    const handleRePassword = () => {
        if(rePassword !== password || !rePassword) {
            return false;
        }

        return true;
    }

    const isFormValid = handleUsername() && handlePassword() && handleRePassword();

    const handleSubmit = async () => {
        const data = {
            username: username,
            dob: dob,
            password: password
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
        } catch (error) {
            setError(true);            
        }
    }

    return(
        <div className="flex justify-center items-center h-screen">
            <div className="hidden w-[45%] h-screen lg:block">
                <img src={StarryNight} alt="Starry Night" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1 flex justify-center items-center h-full relative py-4">
                <Link to="/" className="absolute top-0.5 left-1">
                    <Back className="max-w-[45px] w-full h-auto p-2 sm:max-w-[55px] md:p-3 md:max-w-[65px]
                                    dark:text-[#F1F5F9]"/>
                </Link>
                <div className="max-w-[500px] w-full">
                    <div className="flex justify-center items-center h-full">
                        { 
                            isDarkMode ? (
                                <img src={HuginnDark} alt="Dark Huginn with Text" className="w-[60px] h-auto lg:w-[80px]"/>
                            ) : (
                                <img src={Huginn} alt="Huginn with Text" className="w-[60px] h-auto lg:w-[80px]"/>
                            )
                        }
                    </div>
                    <form onSubmit={handleSubmit} className="px-7">
                        <div className="space-y-0.5 py-1.5 w-full md:py-1.5">
                            <p className="text-xs font-bold py-1 md:text-sm
                                        dark:text-[#CBD5E1]">Username: </p>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-2 border-gray-400 text-xs rounded-sm w-full p-1 md:text-base md:p-1.5
                                                                                                                        dark:text-[#F1F5F9]"/>
                            <p className={`text-xs p-0.5 ${handleUsername() ? 'text-green-500' : 'text-red-600'}`}>Must be more than 4 characters</p>
                        </div>
                        <div className="space-y-0.5 py-1.5 w-full md:py-1.5">
                            <p className="text-xs font-bold py-1 md:text-sm
                                        dark:text-[#CBD5E1]">Date of Birth: </p>
                            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="border-2 border-gray-400 text-xs rounded-sm w-[45%] p-1 md:text-base md:p-1.5
                                                                                                                dark:text-[#F1F5F9]"/>
                        </div>
                        <div className="space-y-0.5 py-1.5 w-full md:py-1.5">
                            <p className="text-xs font-bold py-1 md:text-sm
                                        dark:text-[#CBD5E1]">Password: </p>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-400 text-xs rounded-sm w-full p-1 md:text-base md:p-1.5
                                                                                                                        dark:text-[#F1F5F9]"/>
                            <p className={`text-xs p-0.5 ${handlePassword() ? 'text-green-500' : 'text-red-600'}`}>Must be more than 7 characters</p>
                        </div>
                        <div className="space-y-0.5 py-1.5 w-full md:py-1.5">
                            <p className="text-xs font-bold py-1 md:text-sm
                                        dark:text-[#CBD5E1]">Retype Password: </p>
                            <input type="text" value={rePassword} onChange={(e) => setRePassword(e.target.value)} className="border-2 border-gray-400 text-xs rounded-sm w-full p-1 md:text-base md:p-1.5
                                                                                                                            dark:text-[#F1F5F9]"/>
                            <p className={`text-xs p-0.5 ${handleRePassword() ? 'text-green-500' : 'text-red-600'}`}>'Password' and 'Re-Password' must be the same</p>
                        </div>
                    </form>
                    <div>
                        <button type="submit" disabled={isFormValid === false} className={`block mx-auto w-[50%] mt-8 py-2.5 px-9 bg-black text-white text-xs rounded-xl font-bold lg:text-lg ${handlePassword() ? 'cursor-pointer hover:bg-gray-600' : 'opacity-60 cursor-no-drop'}
                                                                                            dark:bg-white dark:text-black dark:hover:bg-gray-300`}>Submit</button>
                        <p className="block mx-auto my-2.5 text-center text-xs md:text-sm md:my-4
                                    dark:text-[#F1F5F9]">Already have an account? Click <Link to='/login' className="underline font-bold cursor-pointer">here</Link> to login!</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register;