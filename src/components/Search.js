import React, { Component } from 'react';
import axios from 'axios';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      results: [],
      selectedMovie: {
        title: '',
        overview: '',
        release_date: '',
        image_url: '',
        external_id: 0
      }
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

  addToLibrary = (movie) => {
    const NEW_MOVIE_URL = 'http://localhost:3000/movies';
    axios.post(NEW_MOVIE_URL, movie)
      .then((response) => {
        console.log(response);
      })
      .catch();
  }

  // addMovie = () => {
  //   let movie = {
  //
  //   }
  //   this.addToLibrary(movie);
  // }

  render() {
    console.log(this.state.searchTerm);
    const results = this.state.results.map((movie) => {

      const addMovie = () => {
        const updatedMovie = {
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          image_url: movie.image_url,
          external_id: movie.external_id
        }
        this.setState({selectedMovie: updatedMovie});
        this.addToLibrary(this.state.selectedMovie);
      }

      return(
        <div key={movie.external_id}>
          <p>
            <img src={movie.image_url} />
            {movie.title}
            <button
              value={movie.external_id}
              name={movie.title}
              onClick={addMovie}
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
