import Huginn from "../assets/huginn-logo.png";
import DarkModeHuginnWithText from "../assets/white-huginn-with-text-logo.png";
import Communication from "../assets/side-pictures/communication.jpg";

import Shield from "../assets/svgs/shield.svg?react";
import Phone from "../assets/svgs/phone.svg?react";
import Lock from "../assets/svgs/lock.svg?react";
import ProfilePicture from "../assets/svgs/profile.svg?react";
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

            <article ref={aboutRef} className="flex flex-col-reverse justify-center items-center h-screen shadow-sm pt-[7.5rem] pb-[5rem] sm:pb-0 md:flex-row lg:pt-[9rem]">
                <section className="w-full space-y-2.5 mx-1 px-6 md:px-2 md:w-1/2 md:mx-12 md:space-y-3.5 lg:mx-16 lg:space-y-5">
                    <div className="space-y-1 md:space-y-0">
                        <p className="font-semibold text-xs sm:text-base">Huginn - Share Your Stories</p>
                        <h1 className="font-bold text-lg p-0 m-0 sm:text-2xl md:text-3xl lg:text-5xl">Incognito Storytelling</h1>
                    </div>
                    <p className="text-sm text-gray-500 md:text-base lg:text-xl">
                        If you're looking to share stories, whether personal or controversial, without getting yourself exposed, don't worry! Huginn provides the comfortable space you need.
                    </p>
                    <Link to="/register" className="max-w-[120px] w-full inline-block my-3 bg-black hover:bg-gray-600 text-white text-xs text-center cursor-pointer py-2.5 px-2 font-bold rounded-xl md:max-w-[130px] md:px-3 md:text-base lg:max-w-[170px] lg:my-2.5 lg:py-2.5 lg:px-3 lg:text-xl">Sign Up</Link>
                </section>
                <figure className="w-full flex justify-center items-center md:w-1/2">
                    <img src={Communication} alt="" className="max-h-[45vh] h-full w-auto object-cover md:max-h-[60vh] lg:max-h-[75vh]"/>
                </figure>
            </article>

            <article ref={featuresRef} className="bg-gray-100 pt-4 pb-5 md:pb-20">
                <div className="py-5 lg:py-10">
                    <h1 className="text-center font-bold w-full text-2xl lg:text-3xl">About Huginn</h1>
                </div>
                <div className="flex flex-col justify-center items-center h-full my-5 mx-2 md:flex-row md:mx-9 lg:mx-14">
                    <div className="w-2/3 pt-3.5 pb-8 md:py-0 md:w-1/2">
                        <img src={Huginn} alt="Huginn" draggable={false} className="max-w-[200px] w-full h-auto bg-white mx-auto shadow-xl border-2 p-4 rounded-3xl md:min-w-[250px] md:p-5 lg:max-w-[350px] lg:p-7"/>
                    </div>
                    <div className="w-full px-4 py-5 md:py-0 md:pl-12 md:pr-3.5 lg:p-0 lg:w-1/2">
                        <p className="text-justify lg:py-4 lg:text-lg">
                            Dive into Huginn, your personal space where storytelling is simple, free, and anonymous.
                            Don't overthink about strangers or even friends finding out who you are — your presence is a secret!
                            What are you waiting for? Go spill the beans!
                        </p>
                        <p className="font-bold text-base pt-8 pb-2 lg:px-0 lg:py-2.5 lg:text-xl">Why Huginn?</p>
                        <div className="space-y-4 md:mx-0">
                            <WhyListItem icon={Shield} title="Protected Identity" description="Don't worry about your username as it's masked throughout the session!"/>
                            <WhyListItem icon={Lock} title="Better Accessibility" description="Whether you're an adolescent or a grown-up, you can still use Huginn with little effort."/>
                            <WhyListItem icon={Phone} title="Responsive" description="Huginn works on all devices — mobile, tablet, and desktop!"/>
                        </div>
                    </div>
                </div>
            </article>

            <article ref={testimoniesRef} className="pt-4 pb-15 md:pb-20">
                <div className="py-5 lg:py-10">
                    <h1 className="text-center font-bold w-full text-2xl lg:text-3xl">Testimonies</h1>
                </div>
                <div className="py-1.5 px-4 lg:py-2">
                    <p className="text-base w-full text-center md:text-lg lg:text-xl">Still having lingering doubts? Here are top testimonies gracefully sent by our users below!</p>
                </div>
                <div className="mt-5">
                    <Marquee>
                        <TestimonyCard name="R*** S******" testimony="With Huginn, I can safely share my quirks without revealing who I am."/>
                        <TestimonyCard name="L**** A****" testimony="I don't fear expressing my thoughts anymore with Huginn. It helps me cope as well."/>
                        <TestimonyCard name="A*****" testimony="Who could've thought of this innovation? Simply a 10/10 web app."/>
                        <TestimonyCard name="B** L***" testimony="I can't find any application that allows full expression without getting criticized."/>
                    </Marquee>
                </div>
            </article>

            <footer className="bg-gray-900 p-5 lg:px-14 lg:py-10">
                <div className="flex flex-col justify-center items-center w-full p-1.5 sm:flex-row">
                    <div className="w-full rounded-xl flex justify-center md:w-1/2">
                        <img src={DarkModeHuginnWithText} alt="Huginn with Text" className="max-w-[100px] w-full h-auto p-4 sm:max-w-[130px] md:max-w-[150px]"/>
                    </div>
                    <div className="text-white flex flex-col justify-center w-full h-full px-3 *:text-left md:w-1/3 md:px-0">
                        <h2 className="text-base font-bold py-1 md:text-xl">Sections</h2>
                        <ul className="*:text-sm *:cursor-pointer space-y-1.5 py-3 *:hover:font-semibold duration-500 md:*:text-base md:py-3">
                            <li onClick={() => scrollToSection(aboutRef)}>About</li>
                            <li onClick={() => scrollToSection(featuresRef)}>Features</li>
                            <li onClick={() => scrollToSection(testimoniesRef)}>Testimonies</li>
                        </ul>
                    </div>
                </div>
                <hr className="text-white w-full my-3"/>
                <div className="flex justify-between items-center text-white">
                    <div>
                        <a href="https://github.com/HoseaCalvin/huginn" target="_blank">
                            <GitHub className="w-[25px] h-auto p-0.5 md:w-[30px]"/>
                        </a>
                    </div>
                    <div>
                        <p className="text-white text-xs md:text-base">Developed with passion!</p>
                    </div>
                    <span className="block"></span>
                </div>
            </footer>
        </>
    )
}

function TestimonyCard({ name, testimony }) {
    return(
        <div className="max-w-[500px] w-[250px] min-h-[200px] h-[230px] mx-3.5 my-1 shrink-0  bg-white drop-shadow-xl rounded-xl border border-gray-500 overflow-hidden md:mx-5 md:w-[350px] lg:w-[400px]">
            <section className="bg-black flex items-center pl-5 p-4.5 space-x-2">
                <ProfilePicture alt="Profile Picture" draggable={false} className="text-white max-h-[40px] w-[30px] md:h-full"/>
                <h1 className="font-bold px-2 text-white text-base md:text-lg lg:text-xl">{name}</h1>
            </section>
            <section className="py-2 px-5 space-y-1.5">
                <figure style={{ color: "gold" }} className="w-full text-[1.4rem] lg:text-[2rem]">
                    {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                    ))}
                </figure>
                <p className="text-gray-500 text-[14px] md:text-[15px] lg:text-[17px]">{testimony}</p>
            </section>
        </div>
    )
}

function WhyListItem({ icon: Icon, title, description }) {
    return(
        <div className="w-full flex">
            <div className="self-center">
                <Icon className="max-w-[35px] w-full h-auto p-0.5 md:p-1.5 md:max-w-[50px]"/>
            </div>
            <div className="px-3 space-y-0.5 w-full">
                <h1 className="text-base font-semibold m-0 lg:text-lg">{title}</h1>
                <p className="text-xs lg:text-base">{description}</p>
            </div>
        </div>
    )
}

export default Landing;