import Edit from "../assets/svgs/edit.svg?react";

import { Link } from "react-router-dom";

import { internationalFormat } from "../../../backend/utils/dateFormats.js";

import { CategoryBadge } from "./Categories.jsx";

export function StoryCard({ id, thumbnail, title, date, categories }) {
    let limit = 1;

    return(
        <>
            <Link to={`/story/get/${id}`} className="story-card" tabIndex={0}>
                <section>
                    <img src={`/story-pictures/${thumbnail}`} className="max-h-[100px] w-full h-full block object-cover"/>
                </section>
                <div className="px-1.5 py-2.5">
                    <section className="px-2">
                        <h1 className="font-bold text-center truncate lg:text-xl">{title}</h1>
                    </section>
                    <section className="flex justify-between mt-1.5 px-1 lg:mt-4">
                        <div className="self-center">
                            <p className="text-gray-400 text-xs">{internationalFormat(date)}</p>
                        </div>
                        <div className="self-center space-x-1">
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
            </Link>
        </>
    )
}

export function PersonalStoryCard({ id, thumbnail, title, date, categories, editFunction }) {
    return(
        <>
            <Link to={`/story/get/${id}`} className="relative story-card" tabIndex={0}>
                <section>
                    <img src={`/story-pictures/${thumbnail}`} className="max-h-[100px] w-full h-full block object-cover"/>
                </section>
                <div className="px-1.5 pt-2.5 pb-3.5">
                    <section className="px-2">
                        <h1 className="font-bold text-center truncate lg:text-xl">{title}</h1>
                    </section>
                    <section className="flex justify-between mt-1.5 px-1 lg:mt-2">
                        <div className="self-center">
                            <p className="text-gray-400 text-xs">{internationalFormat(date)}</p>
                        </div>
                        <div className="self-center space-x-1">
                            { categories.slice(0, 1).map((category, index) => (
                                <CategoryBadge key={index} category={category}/>
                            ))}

                            {categories.length > 1 && (
                                <span className="border px-2 rounded-3xl text-sm text-gray-500 self-center sm:py-0.5 sm:text-[11px]">
                                    +{categories.length - 1}
                                </span>
                            )}
                        </div>
                    </section>
                </div>
                <div className="absolute bottom-0 right-1.5 rounded-4xl p-1 flex *:flex *:p-1 *:cursor-pointer *:hover:bg-gray-200 *:rounded-lg
                                dark:*:hover:bg-[#3d434f]">
                    <Link to={`/story/edit/${id}`} onClick={editFunction}>
                        <Edit width={18} height={18} className="dark:text-[#94A3B8]"/>
                    </Link>          
                </div>              
            </Link>  
        </>
    )
}

export function SkeletonStoryCard() {
    return(
        <div className="animate-pulse max-w-[400px] h-fit self-center w-full rounded-xl bg-gray-100 shadow-lg overflow-hidden mx-3.5 after:p-3 xl:max-w-[500px]
                        dark:bg-[#111418]">
            <section className="bg-gray-200 h-[100px] w-full block
                                dark:bg-[#272B33]"></section>
            <div className="px-3 py-2.5 w-full mt-1.5 lg:px-4 lg:py-3.5">
                <span className="bg-gray-200 p-2 w-full rounded-md h-[25px] block
                                    dark:bg-[#272B33]"></span>
                <section className="flex justify-between mt-2 *:rounded-sm lg:mt-4">
                    <span className="bg-gray-200 w-[75px] h-[20px]
                                    dark:bg-[#272B33]"></span>
                    <span className="bg-gray-200 w-[90px] h-[20px]
                                    dark:bg-[#272B33]"></span>
                </section>      
            </div>
      
        </div>
    )
}
export default StoryCard;