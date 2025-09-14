import Huginn from "../assets/huginn-with-text-logo.png";
import Cascade from "../assets/side-pictures/cascade.jpg";
import Back from "../assets/svgs/back.svg?react";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../hooks/AuthContext.jsx";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const success = await login(username, password);
        
            if(success) {
                navigate('/home', { replace: true });
            } else {
                setInvalid(true);
            }

        } catch (error) {
            setError(true);
            console.error("Error: ", error);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="flex justify-around items-center h-screen">
            <div className="w-[45%] h-screen hidden md:block">
                <img src={Cascade} alt="Cascade" className="w-full h-full object-cover"/>
            </div>
            <div className="flex-1 flex items-center justify-center h-full relative">
                <Link to="/" className="absolute top-0.5 left-1">
                    <Back className="max-w-[45px] w-full h-auto p-2 sm:max-w-[55px] md:p-3 md:max-w-[65px]"/>
                </Link>
                <div className="max-w-[500px] w-full">
                    <div className="flex justify-center">
                        <img src={Huginn} alt="Huginn with Text" className="w-[65px] h-auto sm:w-[70px] md:w-[80px] lg:w-[120px]"/>
                    </div>
                    <form onSubmit={handleSubmit} className="mx-11">
                        <div className="space-y-0.5 py-2 w-full md:py-3">
                            <p className="text-xs font-bold py-1 md:text-sm">Username:</p>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="border-2 border-gray-400 rounded-sm w-full text-xs p-1 md:text-base md:p-1.5"/>
                        </div>
                        <div className="space-y-0.5 py-2 w-full md:py-3">
                            <p className="text-xs font-bold py-1 md:text-sm">Password:</p>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-400 rounded-sm w-full text-xs p-1 md:text-base md:p-1.5"/>
                        </div>
                        <div>
                            <p className={`${invalid ? 'opacity-100' : 'opacity-0'} text-red-500 text-xs font-semibold text-center py-1 md:py-2.5 md:text-sm`}>Your credentials do not match!</p>
                            <button type="submit" disabled={loading} className="block mx-auto w-[70%] cursor-pointer mt-5 py-3 px-3 bg-black hover:bg-gray-600 text-white text-xs rounded-xl font-bold sm:w-[60%] md:mt-9 md:w-[50%] md:text-sm lg:py-2.5 lg:px-9 lg:text-lg">Login</button>
                            <p className="block mx-auto my-2.5 text-center text-xs md:text-sm md:my-4">Not registered yet? Click <Link to='/register' className="underline font-bold cursor-pointer">here</Link> to register!</p>
                        </div>
                    </form>

                </div>
            </div>

        </div>

    )
}

export default Login;