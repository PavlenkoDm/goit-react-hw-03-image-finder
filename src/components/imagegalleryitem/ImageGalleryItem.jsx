export const ImageGalleryItem = ({ imageItem, clickOnImage }) => {
    const { webformatURL, tags, largeImageURL } = imageItem;

    return (
        <li className="ImageGalleryItem" onClick={() => clickOnImage({urlBigImage: largeImageURL, alt: tags})}>
            <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
        </li>
    );
};
