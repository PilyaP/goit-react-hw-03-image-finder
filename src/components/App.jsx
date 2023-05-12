import React, { Component } from 'react';
import { pixabayApi } from '../data/pixabayApi';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ButtonLoadMore } from './ButtonLoadMore/ButtonLoadMore';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      query: '',
      page: 1,
      totalHits: 0,
      isLoading: false,
    };
  }

  handleSubmitForm = query => {
    this.setState({
      query,
      page: 1,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  fetchData = async () => {
    const { query, page } = this.state;
    this.setState({
      isLoading: true,
    });

    try {
      const data = await pixabayApi(query, page);
      this.setState(prevState => ({
        images: page === 1 ? data.hits : [...prevState.images, ...data.hits],
        totalHits:
          page === 1
            ? data.totalHits - data.hits.length
            : data.totalHits - prevState.images.length - data.hits.length,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error:', error);
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.fetchData();
    }
  }

  render() {
    const { images, totalHits, isLoading } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmitForm} />
        <ImageGallery images={images} />
        {!!totalHits && (
          <>
            {isLoading ? (
              <Loader />
            ) : (
              <ButtonLoadMore onLoadMore={this.handleLoadMore} />
            )}
          </>
        )}
      </>
    );
  }
}
