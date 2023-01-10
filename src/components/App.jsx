import css from '../components/App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { getImages } from '../services/images.service';
import { Loader } from './Loader/Loader';
import { useState, useEffect } from 'react';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(()=> {
    if (!query) {
      return;
    }
    setIsLoading(true);
    
    const fetchImages = async () => {
      try {
        const { hits, totalHits } = await getImages(query, page);
        if (totalHits === 0) {
          toast.error('Nothing was found for your request');
          setIsLoading(false);
          return;
        }
        setImages(prev => (
          page === 1 ? hits : [...prev, ...hits]))
        setTotalHits(prev => page === 1 ? totalHits - hits.length : prev - hits.length);

      } catch (error) {
        toast.error(`Oops! Something went wrong! ${error}`);
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchImages()
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
  }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1 );
  };

    return (
      <div className={css.app}>
        <SearchBar onSubmit={handleSubmit} /> 
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {(images.length > 0 && !!totalHits) && <Button onClick={handleLoadMore}/>}  
        <ToastContainer autoClose={3000} />
      </div>
    );
  
}
