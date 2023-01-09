import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  }

  onToggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };
  render() {
    const {webformatURL, tags, largeImageURL} = this.props;
    const {isModalOpen} = this.state;
    return (
      <li className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItemImage}
          src={webformatURL}
          alt={tags}
          onClick={() => this.onToggleModal(largeImageURL, tags)}
        />
        {isModalOpen && (
          <Modal onClose={this.onToggleModal}>
            <img src={largeImageURL} alt={tags} className={css.modalImg} />
          </Modal>
        )}
      </li>
    )
  }
  
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
