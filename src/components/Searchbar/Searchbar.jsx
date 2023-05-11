import React from 'react';
import '../../Styles/styles.css';

export class Searchbar extends React.Component {
  state = {
    query: '',
  };

  handleChange = ({ target: { value: query } }) => {
    this.setState({ query });
  };

  handleSubmitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    const { query } = this.state;
    return (
      <header className="Searchbar">
        <form
          className="SearchForm"
          onChange={this.handleChange}
          onSubmit={this.handleSubmitForm}
        >
          <button type="submit" className="SearchForm-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
          />
        </form>
      </header>
    );
  }
}
