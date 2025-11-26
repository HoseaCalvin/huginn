export function CategoryList({ categoryList, onToggle }) {
    const allCategories = [
        "Mythology",
        "Dark",
        "Politics",
        "Hilarious",
        "Controversial",
        "History",
        "Heartbreaking"
    ];


    return(
        <div className="flex flex-wrap items-center gap-2">
            {allCategories.map((category, index) => (
                <div key={index} className={`${categoryList.includes(category) ? "opacity-100" : "opacity-30"} cursor-pointer`} onClick={() => onToggle(category)}>
                    <CategoryBadge category={category} />
                </div>
            ))}
        </div>
    )
}

export function CategoryBadge({ index, category }) {
    const categoryColors = {
        Mythology: 'text-[#006DC7] border-[#006DC7]',
        Dark: 'text-[#7E7E7E] border-[#7E7E7E]',
        Politics: 'text-[#7500E2] border-[#7500E2]',
        Hilarious: 'text-[#02A712] border-[#02A712]',
        Controversial: 'text-[#E20000] border-[#E20000]',
        History: 'text-[#CA9100] border-[#CA9100]',
        Heartbreaking: 'text-[#E93187] border-[#E93187]',
    }

    return(
        <span key={index} className={`border-[1px] px-3.5 rounded-full text-[10px] self-center ${categoryColors[category] || ''} sm:py-0.5 sm:text-xs lg:px-5`}>
            {category}
        </span>
    )
}
