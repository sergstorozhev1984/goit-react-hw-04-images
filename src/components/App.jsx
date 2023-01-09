import { Component } from 'react';
import css from '../components/App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { getImages } from '../services/images.service';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    totalHits: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const { hits, totalHits } = await getImages(query, page);
        if (totalHits === 0) {
          toast.error('Nothing was found for your request');
          this.setState({ isLoading: false });
          return;
        }
        this.setState(prevState => ({
          images: page === 1 ? hits : [...prevState.images, ...hits],
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

  handleSubmit = query => {
    this.setState({
      query: query,
      page: 1,
    })
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, totalHits } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.handleSubmit} /> 
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {(images.length > 0 && !!totalHits) && <Button onClick={this.handleLoadMore}/>}
        
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
