import CheckMark from "../assets/svgs/check-mark.svg?react";
import QuestionMark from "../assets/svgs/question-mark.svg?react";
import CrossMark from "../assets/svgs/cross-mark.svg?react";

function Popup({ text, type, onClose, onConfirm }) {
    return(
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400/40 flex justify-center items-center z-[99]">
            <div className="max-w-[230px] w-full max-h-[300px] h-full p-2 bg-white rounded-xl flex flex-col justify-center items-center gap-y-3 sm:max-w-[400px] lg:p-7 lg:max-w-[450px]">
                <div className="mx-3">
                    <h1 className="font-semibold text-center text-sm md:text-base lg:text-lg">{text}</h1>
                </div>
                <div className="h-fit w-fit my-2">
                    { type === "confirmation" && <QuestionMark className="w-[6rem] h-auto p-1.5 lg:w-[7.5rem]"/>}
                    { type === "affirmative" && <CheckMark className="w-[6rem] h-auto p-1.5 lg:w-[7.5rem]"/>}
                    { type === "negative" && <CrossMark className="w-[6rem] h-auto p-1.5 lg:w-[7.5rem]"/>}
                </div>
                <div className="flex flex-col justify-center w-full gap-x-1 sm:flex-row sm:gap-x-3.5">
                    { type === "confirmation" && <button className="py-1.5 px-5 my-1 mx-5 bg-black text-white text-xs font-semibold cursor-pointer rounded-lg sm:mx-0 sm:px-16 sm:text-base lg:text-lg" onClick={onClose}>No</button> }
                    <button className="py-1.5 px-5 my-1 mx-5 bg-black text-white text-xs font-semibold cursor-pointer rounded-lg sm:mx-0 sm:px-16 sm:text-base lg:text-lg" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default Popup;