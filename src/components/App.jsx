import React, { useState, useEffect } from 'react';
import { pixabayApi } from '../data/pixabayApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = query => {
    setQuery(query);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await pixabayApi(query, page);
        setImages(prevImages =>
          page === 1 ? data.hits : [...prevImages, ...data.hits]
        );
        setTotalHits(prevTotalHits =>
          page === 1
            ? data.totalHits - data.hits.length
            : data.totalHits - images.length - data.hits.length
        );
      } catch (error) {
        console.error('Error:', error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [query, page]);

  return (
    <>
      <Searchbar onSubmit={handleSubmitForm} />
      <ImageGallery images={images} />
      {!!totalHits && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <ButtonLoadMore onLoadMore={handleLoadMore} />
          )}
        </>
      )}
    </>
  );
};
