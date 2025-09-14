import Huginn from "../assets/huginn-logo.png";
import DarkModeHuginnWithText from "../assets/white-huginn-with-text-logo.png";
import Communication from "../assets/side-pictures/communication.jpg";
import ProfilePicture from "../assets/profile-picture.png";

import Shield from "../assets/svgs/shield.svg?react";
import Phone from "../assets/svgs/phone.svg?react";
import Lock from "../assets/svgs/lock.svg?react";
import GitHub from "../assets/svgs/github.svg?react";

import { useRef } from "react";
import { Link } from "react-router-dom";

import Topbar from "../components/Topbar.jsx";
import Marquee from "react-fast-marquee";

function Landing() {
    const aboutRef = useRef(null);
    const featuresRef = useRef(null);
    const testimoniesRef = useRef(null);

    const scrollToSection = (sectionRef) => {
        sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    return(
        <>
            <Topbar 
                scrollIntoAbout={() => scrollToSection(aboutRef)}
                scrollIntoFeatures={() => scrollToSection(featuresRef)}
                scrollIntoTestimonies={() => scrollToSection(testimoniesRef)}
            />
            <div ref={aboutRef} className="flex flex-col-reverse justify-center items-center h-screen shadow-sm pt-[3.5rem] md:flex-row lg:pt-[9rem]">
                <div className="w-full space-y-3.5 mx-1 px-6 md:px-2 md:w-1/2 md:mx-12 md:space-y-3.5 lg:mx-16 lg:space-y-5">
                    <div>
                        <p className="font-semibold text-xs md:text-base">Huginn - Share Your Stories</p>
                        <h1 className="font-bold text-lg md:text-3xl lg:text-5xl">Incognito Storytelling</h1>
                    </div>
                    <p className="text-sm text-gray-500 md:text-base lg:text-xl">
                        If you're looking to share stories, whether personal or controversial, without getting yourself exposed, don't worry! Huginn provides the comfortable space you need.
                    </p>
                    <Link to="/register" className="max-w-[120px] w-full inline-block my-1 bg-black hover:bg-gray-600 text-white text-xs text-center cursor-pointer py-2 px-2 font-bold rounded-full md:max-w-[130px] md:px-3 md:text-base lg:max-w-[190px] lg:my-2.5 lg:py-3.5 lg:px-4 lg:text-xl">Sign Up</Link>
                </div>
                <div className="w-full flex justify-center items-center md:w-1/2">
                    <img src={Communication} alt="" className="max-h-[45vh] h-full w-auto object-cover md:max-h-[50vh] lg:max-h-[75vh]"/>
                </div>
            </div>
            <div ref={featuresRef} className="bg-gray-100 py-4">
                <div className="py-5 lg:py-10">
                    <h1 className="text-center font-bold w-full text-lg md:text-2xl lg:text-3xl">Why Huginn?</h1>
                </div>
                <div className="flex flex-col justify-center items-center h-full mt-5 mb-14 mx-2 md:flex-row md:mx-9 lg:mx-14">
                    <div className="w-2/3 pt-3.5 pb-8 md:py-0 md:w-1/2">
                        <img src={Huginn} alt="Huginn" draggable={false} className="max-w-[200px] w-full h-auto bg-white mx-auto shadow-xl border-2 p-4 rounded-3xl md:min-w-[250px] md:p-5 lg:max-w-[400px] lg:p-7"/>
                    </div>
                    <div className="w-full mx-2.5 md:mx-5 lg:w-1/2">
                        <p className="font-bold text-base px-4 py-2.5 lg:px-0 lg:py-5 lg:text-xl">Here are top reasons why you should use Huginn:</p>
                        <div className="space-y-4 px-4 md:mx-0">
                            <WhyListItem icon={Shield} title="Protected Identity" description="Don't worry about your username as it's masked throughout the session!"/>
                            <WhyListItem icon={Lock} title="Better Accessibility" description="Whether you're an adolescent or a grown-up, you can still use Huginn with little effort."/>
                            <WhyListItem icon={Phone} title="Responsive" description="Huginn works on all devices."/>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={testimoniesRef} className="py-4">
                <div className="py-5 lg:py-10">
                    <h1 className="text-center font-bold w-full text-lg md:text-2xl lg:text-3xl">Testimonies</h1>
                </div>
                <div className="py-1.5 px-4 lg:py-3">
                    <p className="text-base font-semibold w-full text-center md:text-lg lg:text-xl">We ensure safe storytelling by delivering the best privacy!</p>
                </div>
                <div className="my-7 md:my-10 lg:my-20">
                    <Marquee>
                        <TestimonyCard name="R*** S******" testimony="With Huginn, I can safely share my quirks without revealing my name."/>
                        <TestimonyCard name="L**** A****" testimony="I don't fear expressing myself anymore with Huginn. It has been a comfy experience using this app."/>
                        <TestimonyCard name="A*****" testimony="Simply a 10/10 web app."/>
                        <TestimonyCard name="B** L***" testimony="I can't find any application that allows full expression without getting criticized."/>
                    </Marquee>
                </div>
            </div>
            <div className="bg-gray-900 p-5 lg:p-14">
                <div className="flex flex-col justify-center w-full md:flex-row">
                    <div className="w-full p-3 rounded-xl flex justify-center md:w-1/2">
                        <img src={DarkModeHuginnWithText} alt="Huginn with Text" className="max-w-[120px] w-full h-auto p-4 md:max-w-[250px]"/>
                    </div>
                    <div className="text-white flex flex-col justify-center w-full h-full px-3.5 *:text-left md:*:text-left md:w-1/3 md:px-0">
                        <h2 className="text-2xl font-bold md:py-5">Sections</h2>
                        <ul className="*:text-lg *:cursor-pointer space-y-2 py-5 *:hover:font-semibold duration-500 md:*:text-xl md:py-3">
                            <li onClick={() => scrollToSection(aboutRef)}>About</li>
                            <li onClick={() => scrollToSection(featuresRef)}>Features</li>
                            <li onClick={() => scrollToSection(testimoniesRef)}>Testimonies</li>
                        </ul>
                    </div>
                </div>
                <hr className="text-white w-full my-3"/>
                <div className="flex justify-start text-white">
                    <div>
                        <a href="https://github.com/HoseaCalvin/huginn" target="_blank"><GitHub className="w-[30px] h-auto p-0.5 md:w-[45px] md:p-1"/></a>
                    </div>
                </div>
            </div>
        </>
    )
}

function TestimonyCard({ name, testimony }) {
    return(
        <div className="max-w-[350px] mx-4.5 my-1 shrink-0 w-[250px] min-h-[300px] h-[370px] bg-white drop-shadow-xl rounded-xl border border-gray-500 md:mx-7 md:w-[290px] md:h-[380px] lg:w-[350px] lg:min-h-[350px]">
            <div className="flex justify-center items-center p-5">
                <img src={ProfilePicture} alt="Profile Picture" draggable={false} className="w-auto max-h-[100px] h-full"/>
            </div>
            <hr className="mx-4 text-gray-300 md:mx-8 lg:mx-11"/>
            <div className="py-5 px-2">
                <div>
                    <h1 className="font-bold px-2 pt-2 pb-3.5 text-center text-base lg:text-lg">{name}</h1>
                </div>
                <div style={{ color: "gold" }} className="w-full text-center text-[1.4rem] lg:text-[2.1rem]">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                    ))}
                </div>
                <div className="p-2.5 self-end">
                    <p className="text-center text-[14px] lg:text-base">{testimony}</p>
                </div>
            </div>
        </div>
    )
}

function WhyListItem({ icon: Icon, title, description }) {
    return(
        <div className="w-full flex">
            <div className="self-center">
                <Icon className="max-w-[35px] w-full h-auto p-0.5 md:p-1.5 md:max-w-[50px]"/>
            </div>
            <div className="px-3 space-y-1 w-full">
                <h1 className="text-base font-semibold m-0e lg:text-lg">{title}</h1>
                <p className="text-xs lg:text-base">{description}</p>
            </div>
        </div>
    )
}

export default Landing;