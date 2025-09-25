import Huginn from '/src/assets/huginn-with-text-logo.png';
import ProfilePicture from '../assets/profile-picture.png';
import Home from '../assets/svgs/home.svg?react';
import Upload from '../assets/svgs/upload.svg?react';

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from "../hooks/AuthContext.jsx";

function Navbar() {
    const { user } = useAuth();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isNavigated = (path) => location.pathname === path;

    return(
        <>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="fixed top-2.5 left-2 z-20 flex flex-col justify-between w-[2.2rem] bg-[#FBFBFB] h-7 p-1.5 rounded-sm lg:hidden group" aria-label="Toggle menu">
                <span className="block h-[3.5px] w-full bg-black rounded transition-all duration-300 group-hover:w-7"></span>
                <span className="block h-[3.5px] w-full bg-black rounded transition-all duration-300 group-hover:w-7"></span>
                <span className="block h-[3.5px] w-full bg-black rounded transition-all duration-300 group-hover:w-7"></span>
            </button>
            <div className={`flex flex-col justify-between py-4 px-2 h-screen navbar-set-width ${isMenuOpen ? 'translate-x-0' : 'translate-x-[-50rem]'} duration-500 fixed drop-shadow-lg bg-[#FBFBFB] z-10 lg:translate-x-0 `}>
                <div className="flex justify-center mt-6 mx-3 lg:p-2 lg:mt-0 ">
                    <img src={Huginn} alt="Huginn Logo" className="w-[65px] lg:w-[95px] h-auto"/>
                </div>
                <div className="flex justify-center">
                    <ul className="flex flex-col">
                        <Link to='/home' onClick={() => setIsMenuOpen(false)} className={`list-item ${isNavigated('/home') ? 'font-bold' : ''}`}>
                            <Home width="100%" height="100%" strokeWidth={`${isNavigated('/home') ? 2 : 1.3 }`} className="w-3.5 md:w-4 lg:w-6 h-auto"/>                                
                            Home
                        </Link>
                        <Link to='/story/create' onClick={() => setIsMenuOpen(false)} className={`list-item ${isNavigated('/story/create') ? 'font-bold' : ''}`}>
                            <Upload width="100%" height="100%" strokeWidth={`${isNavigated('/story/create') ? 2 : 1.3 }`}  className="w-3.5 md:w-4 lg:w-6 h-auto"/>
                            Create
                        </Link>
                    </ul>
                </div>
                <div>
                    <Link to='/profile' onClick={() => setIsMenuOpen(false)} className={`flex justify-center items-center gap-x-2 lg:gap-x-3.5 ${isNavigated('/profile') ? 'font-bold' : ''}`}>
                        <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-[35px] h-auto lg:w-[55px]"/>
                        <p className="text-base lg:text-lg">{user.username}</p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;