import Huginn from "../assets/huginn-logo.png";

import { replace, useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return(
        <div className="flex flex-col justify-center items-center h-screen gap-y-3 px-4">
            <img src={Huginn} alt="Huginn" className="max-w-[220px] w-[100px] h-auto sm:w-[140px] md:w-[170px] lg:w-[200px]"/>
            <p className="font-semibold text-center text-sm md:text-lg lg:py-1 lg:text-xl">Looks like Huginn wants you back home..</p>
            <span className="bg-black hover:bg-gray-700 text-white text-sm py-1.5 px-3 rounded-md font-bold cursor-pointer md:text-base md:rounded-lg md:py-2.5 md:px-3.5 lg:py-3 lg:px-4 lg:rounded-xl lg:text-lg" onClick={() => navigate('/home', replace)}>Return Home</span>
        </div>
    )
}

export default NotFound;