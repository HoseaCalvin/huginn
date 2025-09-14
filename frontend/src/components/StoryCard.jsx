import { useEffect, useState } from "react";

import { CategoryBadge } from "./Categories.jsx";

function StoryCard({ title, categories, story, modalFunction }) {
    let limit = 1;

    return(
        <>
            <div className="max-w-[350px] self-center w-full h-full rounded-xl bg-white shadow-lg py-2.5 px-3 mx-3.5 border-[1px] hover:bg-gray-50 cursor-pointer relative after:p-3" onClick={modalFunction} tabIndex={0}>
                <div className="px-2">
                    <h1 className="font-bold text-center truncate lg:text-xl">{title}</h1>
                </div>
                <div className="mt-1.5 px-2 lg:mt-2.5">
                    <div className="flex justify-end gap-2">
                        { categories.slice(0, limit).map((category, index) => (
                            <CategoryBadge key={index} category={category}/>
                        ))}

                        {categories.length > limit && (
                            <span className="border-[1px] py-0.5 px-2 rounded-3xl text-xs text-gray-500 self-center">
                                +{categories.length - limit}
                            </span>
                        )}
                    </div>
                </div>
                <div className="mt-3.5 lg:mt-4">
                    <p className="text-gray-300 text-xs line-clamp-4 sm:text-sm md:line-clamp-3">{story}</p>
                </div>
            </div>
        </>
    )
}

export default StoryCard;