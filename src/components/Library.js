import React, { Component } from 'react';
import axios from 'axios';

class Library extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }

  componentDidMount() {
    const LIBRARY_URL = 'http://localhost:3000' + '/movies';
    axios.get(LIBRARY_URL)
      .then((response) => {
        let updatedMovies = []
        response.data.map((movie) => {
          updatedMovies.push(movie);
        });
        this.setState({
          movies: updatedMovies
        });
      })
      .catch();
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

export default Library;
