import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({tags, largeImageURL, webformatURL}) => {
  return (
    <li className={css.imageGalleryItem}>
      <img className={css.imageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  )
};
