import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Library extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }

  onMovieSelect = (event) => {
    this.props.displayCurrentMovieCallback(event.target.name);
    this.props.updateCurrentMovieCallback(event.target.value);
  }

  componentDidMount() {
    const LIBRARY_URL = 'http://localhost:3000' + '/movies';
    this.props.updateStatusCallback('loading movies...', 'success');
    axios.get(LIBRARY_URL)
      .then((response) => {
        let updatedMovies = []
        response.data.map((movie) => {
          updatedMovies.push(movie);
        });
        this.props.updateStatusCallback(`${updatedMovies.length} movies successfully loaded`, 'success')
        this.setState({
          movies: updatedMovies
        });
      })
      .catch((error) => {
        this.props.updateStatusCallback(`Something went wrong: ${error.message}`, 'error')
      });
  }

  render() {
    const movies = this.state.movies.map((movie) => {
      return (
        <div key={movie.id}>
          <p>
            <img src={movie.image_url} />
            {movie.title}
            <button
              value={movie.id}
              name={movie.title}
              onClick={this.onMovieSelect}
            >Select Movie</button>
          </p>
        </div>
      );
    });
    return (
      <div>
        <h1>Library!</h1>
        {movies}
      </div>
    );
  }
}

Library.propTypes = {
  updateCurrentMovieCallback: PropTypes.func.isRequired,
  displayCurrentMovieCallback: PropTypes.func.isRequired,
  updateStatusCallback: PropTypes.func.isRequired
}

export default Library;
