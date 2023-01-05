import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import axios from 'axios';
import { getImages } from './services/images.service';

import css from '../components/App.module.css'
const BASE_URL = 'https://pixabay.com/api/';
const key = '31736182-1e49e5184d5967b35aa45da96';

export class App extends Component {
  state = {
    images: [],
    query: '',
    totalHits: 0,
    page: 1,
  };
  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    console.log(query);
    if (prevState.query !== this.state.query || prevState.page !== page){
      const images = await getImages(query, page);
      console.log(images);
      this.setState({images: [...this.state.images, ...images.hits], totalHits: images.total})
    }
  //   if (prevState.query !== query || prevState.page !== page) {
  //     try {
  //       const {data} = await axios.get(
  //         `${BASE_URL}?q=${query}&page=${page}&key=${key}&image_type='photo'&orientation='horizontal'&per_page=12`
  //       );
  //       this.setState({ images: data.hits});
  //       // console.log(data.totalHits);
        
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }
   }

  handleQuerySubmit = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prev => ({page: prev.page + 1}))
  }

  render() {
    const { images } = this.state;
    // console.log(images.length);
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.handleQuerySubmit} />
        <ImageGallery images={images} />
        {(images.length !== 0 || images.length !== this.state.totalHits) && <Button onLoadMore={this.handleLoadMore}/>}
        
      </div>
    );
  }
}
