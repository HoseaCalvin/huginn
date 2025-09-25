function ThumbnailList({ selectedPicture, setSelectedPicture }) {
    const allThumbnails = [
        'art-1.jpg',
        'art-2.jpg',
        'art-3.jpg'
    ]

    return(
        <div className="flex flex-wrap gap-2 py-1.5 md:gap-3">
            { 
                allThumbnails.map((image) => (
                    <img key={image} src={`/story-pictures/${image}`} onClick={() => setSelectedPicture(image)} className={`${selectedPicture === image ? 'opacity-100' : 'opacity-30'} w-[60px] h-[45px] object-cover rounded-lg cursor-pointer md:w-[80px] md:h-[50px]`}/>
                ))
            }
        </div>
    )
}

export default ThumbnailList;