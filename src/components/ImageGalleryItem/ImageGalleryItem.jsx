import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  }
  toggleModal = () => {
    this.setState(prevState => ({showModal: !prevState.showModal}))
  }

  render() {
    const { webformatURL, tags, largeImageURL} = this.props;
    const {showModal} = this.state;
    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {showModal && (
          <Modal
            modalImg={largeImageURL}
            tags={tags}
            closeModal={this.toggleModal}
          />
        )}
      </li>
    );
  }
}
