export const ImageGalleryItem = ({id, tags, largeImageURL, webformatURL}) => {
  return (
    <li className="gallery-item">
      <img src={largeImageURL} alt={tags} />
    </li>
  )
};
