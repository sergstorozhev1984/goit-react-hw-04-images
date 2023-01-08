import { Component } from 'react';
import css from '../components/App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { getImages } from './services/images.service';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';


export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    tags: '',
    totalHits: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { hits, totalHits } = await getImages(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits:
            page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.images, ...hits].length,
        }));
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
      finally {
        this.setState({isLoading: false})
      }
    }
  }

  onChangeQuery = query => {
    this.setState({
      query: query,
      page: 1,
      images: [],
    })
  }

  onModal = (largeImageURL, tags ) => {
    this.setState({
      largeImageURL: largeImageURL,
      tags: tags,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, showModal, largeImageURL, tags, totalHits } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.onChangeQuery} /> 
        <ImageGallery images={images} onClick={this.onModal}/>
        {(images.length > 0 && !!totalHits) && <Button onClick={this.handleLoadMore}/>}
        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt={tags} className={css.modalImg} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
