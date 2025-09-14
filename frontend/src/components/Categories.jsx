export function Category({ name, selected, onClick }) {
    return(
        <div className={`${selected ? 'opacity-30' : ''} cursor-pointer px-1 py-1`} onClick={() => onClick()}>
            <CategoryBadge category={name}/>
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
        <span key={index} className={`border-[1px] py-0.5 px-2 rounded-full text-xs self-center ${categoryColors[category] || ''} lg:px-5`}>
            {category}
        </span>
    )
}
