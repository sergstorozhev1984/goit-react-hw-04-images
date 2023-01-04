import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({images}) => {
  return (
    <ul className="gallery">
      {images.map(({id, webformatURL, largeImageURL, tags}) => (
        <ImageGalleryItem key={id} id={id} webformatURL={webformatURL} tags={tags} largeImageURL={largeImageURL} />
      ))}
        
    </ul>
  )
};
