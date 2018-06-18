import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Library from './components/Library';
import Search from './components/Search';
import CustomerList from './components/CustomerList';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/search">Search </Link>
          <Link to="/library">Library </Link>
          <Link to="/customers">Customers </Link>
          <Route path="/search" component={Search}/>
          <Route path="/library" component={Library}/>
          <Route path="/customers" component={CustomerList}/>
        </div>
      </Router>
    );
  }
}

export default App;
