import { Component } from 'react';
import css from '../components/App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { getImages } from './services/images.service';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    totalHits: 0,
    page: 1,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    console.log(query);
    // console.log(prevState.query);
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { hits, totalHits } = await getImages(query, page);
        // console.log(totalHits);
        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],

          totalHits:
            page === 1
              ? totalHits - hits.length
              : totalHits - [...prevState.images, ...hits].length,
        }));
        this.setState({ isLoading: false });
      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
    }
  }

  handleQuerySubmit = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, isLoading, totalHits } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.handleQuerySubmit} />
        <ImageGallery images={images} />
        {!!totalHits && <Button onLoadMore={this.handleLoadMore} />}
        {isLoading && <Loader />}
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}
