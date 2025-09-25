import Edit from "../assets/svgs/edit.svg?react";

import { Link } from "react-router-dom";

import { internationalFormat } from "../../../backend/utils/dateFormats.js";

import { CategoryBadge } from "./Categories.jsx";

export function StoryCard({ thumbnail, title, date, categories, modalFunction }) {
    let limit = 1;

    return(
        <>
            <div className="max-w-[400px] h-fit self-center w-full rounded-xl bg-white shadow-lg mx-3.5 border-[1px] hover:bg-gray-50 cursor-pointer overflow-hidden after:p-3" onClick={modalFunction} tabIndex={0}>
                <section>
                    <img src={`/story-pictures/${thumbnail}`} className="max-h-[100px] w-full h-full block object-cover"/>
                </section>
                <div className="px-1.5 py-2.5">
                    <section className="px-2">
                        <h1 className="font-bold text-center truncate lg:text-xl">{title}</h1>
                    </section>
                    <section className="flex justify-between mt-1.5 px-1 lg:mt-4">
                        <div className="self-center">
                            <p className="text-sm">{internationalFormat(date)}</p>
                        </div>
                        <div className="self-center space-x-2">
                            { categories.slice(0, limit).map((category, index) => (
                                <CategoryBadge key={index} category={category}/>
                            ))}

                            {categories.length > limit && (
                                <span className="border-[1px] py-0.5 px-2 rounded-3xl text-xs text-gray-500 self-center">
                                    +{categories.length - limit}
                                </span>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export function PersonalStoryCard({ id, thumbnail, title, date, categories, modalFunction, editFunction }) {
    return(
        <>
            <div className="max-w-[400px] h-fit self-center w-full rounded-xl bg-white shadow-lg mx-3.5 border-[1px] hover:bg-gray-50 cursor-pointer overflow-hidden relative after:p-3" onClick={modalFunction} tabIndex={0}>
                <section>
                    <img src={`/story-pictures/${thumbnail}`} className="max-h-[100px] w-full h-full block object-cover"/>
                </section>
                <div className="px-1.5 pt-2.5 pb-6">
                    <section className="px-2">
                        <h1 className="font-bold text-center truncate lg:text-xl">{title}</h1>
                    </section>
                    <section className="flex justify-between mt-1.5 px-1 lg:mt-2">
                        <div className="self-center">
                            <p className="text-sm">{internationalFormat(date)}</p>
                        </div>
                        <div className="self-center space-x-2">
                            { categories.slice(0, 1).map((category, index) => (
                                <CategoryBadge key={index} category={category}/>
                            ))}

                            {categories.length > 1 && (
                                <span className="border-[1px] py-0.5 px-2 rounded-3xl text-xs text-gray-500 self-center">
                                    +{categories.length - 1}
                                </span>
                            )}
                        </div>
                    </section>
                </div>
                <div className="absolute bottom-0 right-1.5 rounded-4xl p-1 flex *:flex *:p-1.5 *:cursor-pointer *:hover:bg-gray-200 *:rounded-lg">
                    <Link to={`/story/edit/${id}`} onClick={editFunction}>
                        <Edit width={18} height={18}/>
                    </Link>          
                </div>              
            </div>  
        </>
    )
}

export function SkeletonStoryCard() {
    return(
        <div className="animate-pulse max-w-[400px] h-fit self-center w-full rounded-xl bg-gray-100 shadow-lg overflow-hidden m-3.5 after:p-3">
            <section className="bg-gray-200 h-[100px] w-full block"></section>
            <div className="px-3 py-2.5 w-full mt-1.5 lg:px-4 lg:py-3.5">
                <span className="bg-gray-200 p-2 w-full rounded-md h-[25px] block"></span>
                <section className="flex justify-between mt-2 *:rounded-sm lg:mt-4">
                    <span className="bg-gray-200 w-[75px] h-[20px]"></span>
                    <span className="bg-gray-200 w-[90px] h-[20px]"></span>
                </section>      
            </div>
      
        </div>
    )
}
export default StoryCard;