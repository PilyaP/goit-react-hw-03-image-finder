import React from 'react';

import { ImageGallery } from './ImageGallery/ImageGallery';

import { Loader } from './Loader/Loader';
import { pixabayApi } from '../data/pixabayApi';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends React.Component {
  state = {
    images: [],
    query: '',
    page: 1,
    totalHits: 0,
    isLoading: false,
  };

  handleSubmitForm = query => {
    this.setState({ query, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      pixabayApi(query, page)
        .then(data => {
          this.setState(prev => ({
            images: page === 1 ? data.hits : [...prev.images, ...data.hits],
            totalHits:
              page === 1
                ? data.totalHits - data.hits.length
                : data.totalHits - [...prev.images, ...data.hits].length,
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery images={this.state.images} />
        {!!this.state.totalHits &&
          (!this.state.isLoading ? (
            <ButtonLoadMore onLoadMore={this.handleLoadMore} />
          ) : (
            <Loader />
          ))}
      </>
    );
  }
}
