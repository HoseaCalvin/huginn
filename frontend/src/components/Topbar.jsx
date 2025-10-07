import Huginn from "../assets/Huginn-with-text-logo.png";

import { useState } from "react";
import { Link } from "react-router-dom";

function Topbar({ scrollIntoAbout, scrollIntoFeatures, scrollIntoTestimonies }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const onClickClose = (refFunction) => {
        refFunction();
        setIsMenuOpen(false);
    }

    return(
        <>
            <div className={`fixed top-[108px] left-0 right-0 z-30 mx-7 transition-all duration-300 ease-out md:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}`}>
                <ul className="bg-white border py-1.5 rounded-2xl shadow-xl flex flex-col justify-center m-0 *:text-xs *:text-center *:px-3.5 *:py-2.5 *:font-semibold sm:*:text-sm">
                    <li onClick={() => onClickClose(scrollIntoAbout)}>About</li>
                    <li onClick={() => onClickClose(scrollIntoFeatures)}>Features</li>
                    <li onClick={() => onClickClose(scrollIntoTestimonies)}>Testimonies</li>
                </ul>
            </div>

            <nav className="fixed w-full z-20">
                <div className="bg-white border my-5 mx-7 flex justify-between items-center p-2.5 rounded-2xl shadow-lg text-sm md:mx-12 md:rounded-2xl">
                    <figure className="px-2.5 md:px-5">
                        <img src={Huginn} alt="Huginn" className="max-w-[60px] w-[40px] h-auto sm:w-[50px] md:w-full"/>
                    </figure>
                    <div className="hidden sm:block">
                        <ul className="flex space-x-2 *:px-3.5 *:py-2.5 *:cursor-pointer *:font-semibold *:hover:text-gray-500 *:duration-300 *:transition-all *:ease-in-out md:*:text-base">
                            <li onClick={scrollIntoAbout}>About</li>
                            <li onClick={scrollIntoFeatures}>Features</li>
                            <li onClick={scrollIntoTestimonies}>Testimonies</li>
                        </ul>
                    </div>
                    <div className="sm:hidden">
                        <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-[38px] px-1.5 h-full *:block *:bg-black *:w-full *:h-[3px] *:my-1 *:rounded-lg">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="hidden mx-3 sm:block md:mx-5">
                        <Link to="/login" className="py-2 px-6 text-white font-bold bg-black hover:bg-gray-600 cursor-pointer rounded-3xl">Login</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Topbar;