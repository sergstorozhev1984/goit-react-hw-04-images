import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export class SearchBar extends Component {
  state = {
    query: '',
  }

  handleInputChange = e => {
    const {value} = e.target;
    this.setState({query: value.toLowerCase()})
  }

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    const { onSubmit } = this.props;
    if (query.trim() === '') {
      toast.error('Please enter a search value');
      return;
    }
    onSubmit(query);
    this.setState({ query: '' });
  }
  
  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton} >
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleInputChange}
            className={css.searchFormInput}
            type="text"
            value={this.state.query}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}