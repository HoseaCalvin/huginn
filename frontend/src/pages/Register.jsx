import Huginn from "../assets/huginn-with-text-logo.png";
import StarryNight from "../assets/side-pictures/starry-night.jpg";
import Back from "../assets/svgs/back.svg?react";

import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
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
                    <Back className="max-w-[45px] w-full h-auto p-2 sm:max-w-[55px] md:p-3 md:max-w-[65px]"/>
                </Link>
                <div className="max-w-[500px] w-full">
                    <div className="flex justify-center items-center h-full">
                        <img src={Huginn} alt="Huginn" className="w-[60px] h-auto lg:w-[80px]"/>
                    </div>
                    <form onSubmit={handleSubmit} className="px-7">
                        <div className="space-y-0.5 py-1.5 w-full md:py-1.5">
                            <p className="text-xs font-bold py-1 md:text-sm">Username: </p>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-2 border-gray-400 text-xs rounded-sm w-full p-1 md:text-base md:p-1.5"/>
                            <p className={`text-xs p-0.5 ${handleUsername() ? 'text-green-500' : 'text-red-600'}`}>Must be more than 4 characters</p>
                        </div>
                        <div className="space-y-0.5 py-1.5 w-full md:py-1.5">
                            <p className="text-xs font-bold py-1 md:text-sm">Date of Birth: </p>
                            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="border-2 border-gray-400 text-xs rounded-sm w-[45%] p-1 md:text-base md:p-1.5"/>
                        </div>
                        <div className="space-y-0.5 py-1.5 w-full md:py-1.5">
                            <p className="text-xs font-bold py-1 md:text-sm">Password: </p>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-400 text-xs rounded-sm w-full p-1 md:text-base md:p-1.5"/>
                            <p className={`text-xs p-0.5 ${handlePassword() ? 'text-green-500' : 'text-red-600'}`}>Must be more than 7 characters</p>
                        </div>
                        <div className="space-y-0.5 py-1.5 w-full md:py-1.5">
                            <p className="text-xs font-bold py-1 md:text-sm">Retype Password: </p>
                            <input type="text" value={rePassword} onChange={(e) => setRePassword(e.target.value)} className="border-2 border-gray-400 text-xs rounded-sm w-full p-1 md:text-base md:p-1.5"/>
                            <p className={`text-xs p-0.5 ${handleRePassword() ? 'text-green-500' : 'text-red-600'}`}>'Password' and 'Re-Password' must be the same</p>
                        </div>
                    </form>
                    <div>
                        <button type="submit" disabled={isFormValid === false} className={`block mx-auto w-[50%] mt-8 py-2.5 px-9 bg-black text-white text-xs rounded-xl font-bold lg:text-lg ${handlePassword() ? 'cursor-pointer hover:bg-gray-600' : 'opacity-60 cursor-no-drop'}`}>Submit</button>
                        <p className="block mx-auto my-2.5 text-center text-xs md:text-sm md:my-4">Already have an account? Click <Link to='/login' className="underline font-bold cursor-pointer">here</Link> to login!</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register;