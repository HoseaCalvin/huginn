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
            <div className={`fixed top-[135px] left-0 right-0 z-30 mx-5 transition-all duration-300 ease-out md:hidden ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'}`}>
                <ul className="bg-white border py-2 rounded-2xl shadow-xl flex flex-col justify-center m-0 *:text-center *:px-3.5 *:py-3 *:font-semibold">
                    <li onClick={() => onClickClose(scrollIntoAbout)}>About</li>
                    <li onClick={() => onClickClose(scrollIntoFeatures)}>Features</li>
                    <li onClick={() => onClickClose(scrollIntoTestimonies)}>Testimonies</li>
                </ul>
            </div>

            <div className="fixed w-full z-20">
                <div className="bg-white border my-7 mx-5 flex justify-between items-center p-4 rounded-2xl shadow-lg md:my-8 md:mx-12 md:rounded-4xl">
                    <div className="px-1 md:px-5">
                        <img src={Huginn} alt="Huginn" className="max-w-[60px] w-full h-auto"/>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex space-x-2 *:px-3.5 *:py-2.5 *:cursor-pointer *:font-semibold *:hover:bg-gray-100 *:rounded-2xl">
                            <li onClick={scrollIntoAbout}>About</li>
                            <li onClick={scrollIntoFeatures}>Features</li>
                            <li onClick={scrollIntoTestimonies}>Testimonies</li>
                        </ul>
                    </div>
                    <div className="md:hidden">
                        <div onClick={() => setIsMenuOpen(true)} className="w-[43px] px-1.5 h-full *:block *:bg-black *:w-full *:h-[4.5px] *:my-1 *:rounded-lg">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="hidden mx-5 md:block">
                        <Link to="/login" className="py-2 px-6 text-white font-bold bg-black hover:bg-gray-600 cursor-pointer rounded-3xl">Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Topbar;