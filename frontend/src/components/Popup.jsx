import CheckMark from "../assets/svgs/check-mark.svg?react";
import QuestionMark from "../assets/svgs/question-mark.svg?react";
import CrossMark from "../assets/svgs/cross-mark.svg?react";

export function PopupConfirmation({ header, text, onClose, onConfirm }) {
    return(
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400/40 flex justify-center items-center z-[99]
                        dark:bg-black/40">
            <div className="max-w-[250px] w-full h-fit p-3.5 bg-white rounded-xl space-x-5 sm:max-w-[500px] sm:p-6 lg:max-w-[580px]
                            dark:bg-[#1E1F25] dark:border-[#2C313A] dark:border-2">
                <div className="flex flex-col justify-between m-0 sm:flex-row">
                    <QuestionMark className="w-[6rem] h-auto p-1.5 mb-3 self-center sm:mb-0 md:w-[7rem]"/>
                    <div className="self-center space-y-2 sm:pl-6">
                        <h1 className="font-semibold text-sm text-center sm:text-left md:text-base lg:text-lg
                                         dark:text-[#F1F5F9]">{header}</h1>
                        <p className="text-xs text-center sm:text-left lg:text-sm
                                    dark:text-[#CBD5E1]">{text}</p>
                    </div>
                </div>
                <hr className="w-full my-3.5 sm:my-4
                                dark:border-[#323843]"/>
                <div className="flex flex-col justify-end w-full gap-y-2.5 sm:flex-row sm:gap-x-3.5">
                    <button className="py-1 px-4 mx-12 border-2 border-black bg-black text-white text-xs font-semibold cursor-pointer rounded-lg transition-all ease-in-out duration-300 hover:bg-gray-600 sm:px-8 sm:mx-0 md:px-14 sm:text-base
                                        dark:border-0 dark:bg-white dark:text-black dark:hover:bg-gray-300" onClick={onClose}>No</button>
                    <button className="py-1 px-4 mx-12 border-2 border-black text-xs font-semibold cursor-pointer rounded-lg transition-all ease-in-out duration-300 hover:bg-black hover:text-white sm:px-8 sm:mx-0 md:px-14 sm:text-base
                                        dark:bg-[#1E1F25] dark:text-white dark:hover:bg-[#3d434f] dark:border-[#454950]" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    )
    // use enum for stricter control.
}

