import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/search">Search </Link>
          <Link to="/library">Library </Link>
          <Link to="/customers">Customers </Link>
        </div>
      </Router>
    );
  }
}

export default App;
