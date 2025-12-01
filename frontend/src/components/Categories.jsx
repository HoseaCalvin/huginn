export function CategoryList({ categoryList, onToggle }) {
    const allCategories = [
        "Controversial",
        "Dark",
        "Heartbreaking",
        "Hilarious",
        "History",
        "Mythology",
        "Politics",
    ];


    return(
        <div className="flex flex-wrap items-center gap-2">
            {allCategories.map((category, index) => (
                <div key={index} className={`${categoryList.includes(category) ? "opacity-100" : "opacity-40 dark:opacity-70"} cursor-pointer`} onClick={() => onToggle(category)}>
                    <CategoryBadge category={category} />
                </div>
            ))}
        </div>
    )
}

export function CategoryBadge({ index, category }) {
    return(
        <span key={index} style={{ color: `var(--cat-${category})`, borderColor: `var(--cat-${category})`}} className={`border px-3.5 rounded-full text-[10px] self-center sm:py-0.5 sm:text-xs lg:px-5`}>
            {category}
        </span>
    )
}
