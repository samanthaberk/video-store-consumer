import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      results: [],
    }
  }

  onInputChange = (event) => {
    let updatedSearchTerm = {}
    updatedSearchTerm['searchTerm'] = event.target.value;
    this.setState(updatedSearchTerm);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.updateStatusCallback('Searching for movies...', 'success');
    const SEARCH_URL = `http://localhost:3000/movies?query=${this.state.searchTerm}`;
    axios.get(SEARCH_URL)
    .then((response) => {
      let updatedResults = [];
      response.data.map((result) => {
        updatedResults.push(result)
      });

      if(updatedResults.length === 0) {
        this.props.updateStatusCallback('Sorry, no movies were found', 'success');
      } else {
        this.props.updateStatusCallback(`${updatedResults.length} movies were found`, 'success');
      }

      this.setState({
        results: updatedResults,
        searchTerm: ""
      });
    })
    .catch((error) => {
      this.props.updateStatusCallback(`Something went wrong: ${error.message}`, 'error');
    });
  }

  addToLibrary = (movie) => {
    this.props.updateStatusCallback(`Adding ${movie.title} to the library`, 'success');
    const NEW_MOVIE_URL = 'http://localhost:3000/movies';
    let image = movie.image_url.split('w185');
    image = image[1];

    axios.post(NEW_MOVIE_URL, {
      title: movie.title,
      overview: movie.overview,
      release_date: movie.release_date,
      image_url: image,
      external_id: 2
    })
      .then(() => {
        this.props.updateStatusCallback(`Successfully added ${movie.title} to the library`, 'success');
      })
      .catch((error) => {
        this.props.updateStatusCallback(`Something went wrong: ${error.message}`, 'error');
      });
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
              onClick={() => {
                  this.addToLibrary(movie);
                }
              }
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

Search.propTypes = {
  updateStatusCallback: PropTypes.func.isRequired
}

export default Search;
