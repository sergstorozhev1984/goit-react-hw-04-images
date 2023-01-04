import { Component } from 'react';
export class SearchBar extends Component {
  state = {
    query: '',
  }

  handleChange = e => {
    const {value} = e.target;
    console.log(e.target.value);
    this.setState({query: value})
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  }
  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className="input"
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
