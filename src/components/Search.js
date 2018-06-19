import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      results: []
    }
  }

  onInputChange = (event) => {
    let updatedSearchTerm = {}
    updatedSearchTerm['searchTerm'] = event.target.value;
    this.setState(updatedSearchTerm);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    const SEARCH_URL = `http://localhost:3000/movies?query=${this.state.searchTerm}`;
    axios.get(SEARCH_URL)
    .then((response) => {
      let updatedResults = [];
      response.data.map((result) => {
        updatedResults.push(result)
      });
      this.setState({
        results: updatedResults,
        searchTerm: ""
      });
    })
    .catch();
  }

  render() {
    console.log(this.state.searchTerm);
    const results = this.state.results.map((movie) => {
      return(
        <div key={movie.external_id}>
          <p>
            <img src={movie.image_url} />
            {movie.title}
            <button
              value={movie.external_id}
              name={movie.title}
            >Add Movie to Library</button>
          </p>
        </div>
      );
    });
    return (
      <section>
        <form onSubmit={this.onFormSubmit}>
          <input
            onChange={this.onInputChange}
            type="text"
            value={this.state.searchTerm}
          />
          <input type="submit" />
        </form>

        <div className='result'>
          {results}
        </div>

      </section>
    );
  }
}

export default Search;
