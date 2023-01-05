import { Component } from 'react';
import css from './Searchbar.module.css';
export class SearchBar extends Component {
  state = {
    query: '',
    
  }

  handleChange = e => {
    const {value} = e.target;
    // console.log(e.target.value);
    this.setState({query: value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  }
  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton} >
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
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
