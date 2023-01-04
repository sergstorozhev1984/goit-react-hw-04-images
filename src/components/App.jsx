import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import axios from 'axios';
// import { getImages } from './services/images.service';
const BASE_URL = 'https://pixabay.com/api/';
const key = '31736182-1e49e5184d5967b35aa45da96';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
  };
  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    console.log(query);
    // if (prevState.query !== this.state.query){
    //   const images = await getImages(query, page);
    //   console.log(images);
    //   this.setState({images})
    // }
    if (prevState.query !== query) {
      try {
        const response = await axios.get(
          `${BASE_URL}?q=${query}&page=${page}&key=${key}&image_type='photo'&orientation='horizontal'&per_page=12`
        );
        console.log(response.data);
        this.setState({ images: response.data.hits });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  // searchImg() {

  // }

  handleQuerySubmit = query => {
    this.setState({ query, page: 1 });
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        <SearchBar onSubmit={this.handleQuerySubmit} />
        <ImageGallery images={images} />
        <Button />
      </div>
    );
  }
}
