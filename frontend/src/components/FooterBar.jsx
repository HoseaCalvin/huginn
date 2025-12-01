import Home from "../assets/svgs/home.svg?react";
import Upload from "../assets/svgs/upload.svg?react";
import Profile from "../assets/svgs/profile.svg?react";

import { useAuth } from "../hooks/AuthContext.jsx";
import { Link, useLocation } from "react-router-dom";

function FooterBar() {
    const { user } = useAuth();
    const location = useLocation();

    const isNavigated = (path) => location.pathname === path;

    return(
        <footer className="fixed bottom-0 left-0 bg-[#FBFBFB] rounded-t-lg border-t border-t-gray-400 w-screen h-[60px] p-2 flex justify-around items-center lg:hidden
                            dark:bg-[#111418] dark:text-[#F1F5F9]">
            <Link to="/home" className="p-1.5 w-fit">
                <Home strokeWidth={`${isNavigated('/home') ? 2 : 1.3}`} className="w-6 h-auto mx-auto"/>
                <h1 className={`text-center text-xs ${isNavigated('/home') ? "font-bold" : ""}`}>Home</h1>
            </Link>
            <Link to="/story/create" className="p-1.5 w-fit">
                <Upload strokeWidth={`${isNavigated('/story/create') ? 2 : 1.3}`} className="w-6 h-auto mx-auto"/>
                <h1 className={`text-center text-xs ${isNavigated('/story/create') ? "font-bold" : ""}`}>Upload</h1>
            </Link>
            <Link to="/profile" className="p-1.5 w-fit">
                <Profile strokeWidth={`${isNavigated('/profile') ? 2 : 1.3}`} className="w-6 h-auto mx-auto"/>
                <h1 className={`text-center text-xs ${isNavigated('/profile') ? "font-bold" : ""}`}>{user.username}</h1>
            </Link>
        </footer>
    )
}

export default FooterBar;