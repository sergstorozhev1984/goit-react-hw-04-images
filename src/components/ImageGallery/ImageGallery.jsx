import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import css from './ImageGallery.module.css';

export const ImageGallery = ({images}) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(({id, webformatURL, largeImageURL, tags}) => (
        <ImageGalleryItem key={id} id={id} webformatURL={webformatURL} tags={tags} largeImageURL={largeImageURL} />
      ))}
        
    </ul>
  )
};
