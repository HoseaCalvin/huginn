import Huginn from "/src/assets/huginn-with-text-logo.png";
import ProfilePicture from "../assets/profile-picture.png";
import Home from "../assets/svgs/home.svg?react";
import Upload from "../assets/svgs/upload.svg?react";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../hooks/AuthContext.jsx";

function Sidebar() {
    const { user } = useAuth();
    const location = useLocation();

    const isNavigated = (path) => location.pathname === path;

    return(
        <>
            <nav className={`hidden fixed flex-col justify-between py-4 px-2 min-h-screen navbar-set-width duration-500 drop-shadow-lg bg-[#FBFBFB] z-10 lg:translate-x-0 lg:flex`}>
                <figure className="flex justify-center mt-6 mx-3 lg:p-2 lg:mt-0">
                    <img src={Huginn} alt="Huginn Logo" className="w-[65px] lg:w-[95px] h-auto"/>
                </figure>
                <section className="flex justify-center">
                    <ul className="flex flex-col">
                        <Link to="/home" onClick={() => setIsMenuOpen(false)} className={`list-item ${isNavigated('/home') ? 'font-bold' : ''}`}>
                            <Home width="100%" height="100%" strokeWidth={`${isNavigated('/home') ? 2 : 1.3 }`} className="w-3.5 md:w-4 lg:w-6 h-auto"/>                                
                            Home
                        </Link>
                        <Link to="/story/create" onClick={() => setIsMenuOpen(false)} className={`list-item ${isNavigated('/story/create') ? 'font-bold' : ''}`}>
                            <Upload width="100%" height="100%" strokeWidth={`${isNavigated('/story/create') ? 2 : 1.3 }`}  className="w-3.5 md:w-4 lg:w-6 h-auto"/>
                            Create
                        </Link>
                    </ul>
                </section>
                <section>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)} className={`flex justify-center items-center gap-x-2 lg:gap-x-3.5 ${isNavigated('/profile') ? 'font-bold' : ''}`}>
                        <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-[35px] h-auto lg:w-[55px]"/>
                        <p className="text-base lg:text-lg">{user.username}</p>
                    </Link>
                </section>
            </nav>
        </>
    )
}

export default Sidebar;