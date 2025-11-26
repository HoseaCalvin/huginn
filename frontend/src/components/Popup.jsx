import CheckMark from "../assets/svgs/check-mark.svg?react";
import QuestionMark from "../assets/svgs/question-mark.svg?react";
import CrossMark from "../assets/svgs/cross-mark.svg?react";

export function PopupConfirmation({ header, text, onClose, onConfirm }) {
    return(
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400/40 flex justify-center items-center z-[99]">
            <div className="max-w-[250px] w-full h-fit p-3.5 bg-white rounded-xl space-x-5 sm:max-w-[500px] sm:p-5 lg:p-7 lg:max-w-[600px]">
                <div className="flex flex-col justify-between m-0 sm:flex-row">
                    <QuestionMark className="w-[6rem] h-auto p-1.5 self-center md:w-[7rem]"/>
                    <div className="self-center space-y-2 py-2 sm:pl-6">
                        <h1 className="font-semibold text-sm text-center sm:text-left md:text-base lg:text-lg">{header}</h1>
                        <p className="text-xs text-center sm:text-left lg:text-sm">{text}</p>
                    </div>
                </div>
                <hr className="w-full my-3"/>
                <div className="flex flex-col justify-end w-full gap-y-2.5 sm:flex-row sm:gap-x-3.5">
                    <button className="py-1 px-4 mx-5 border-2 border-black bg-black text-white text-xs font-semibold cursor-pointer rounded-lg sm:px-8 sm:mx-0 md:px-14 sm:text-base" onClick={onClose}>No</button>
                    <button className="py-1 px-4 mx-5 border-2 border-black text-xs font-semibold cursor-pointer rounded-lg sm:px-8 sm:mx-0 md:px-14 sm:text-base" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
    // use enum for stricter control.
}


export function PopupPositive() {
    
}
