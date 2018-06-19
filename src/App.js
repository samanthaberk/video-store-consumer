import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Library from './components/Library';
import Search from './components/Search';
import CustomerList from './components/CustomerList';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      customerName: "",
      customerId: 0,
      movieTitle: "",
      movieId: 0,
    }
  }

  displayCurrentCustomer = (name) => {
    this.setState({
      customerName: name
    });
  }

  updateCurrentCustomer = (id) => {
    this.setState({
      customerId: id
    });
  }

  updateCurrentMovie = (id) => {
    this.setState({
      movieId: id
    });
  }

  displayCurrentMovie = (title) => {
    this.setState({
      movieTitle: title
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Link to="/search">Search </Link>
          <Link to="/library">Library </Link>
          <Link to="/customers">Customers </Link>

          <p>Current Customer: {this.state.customerName}</p>
          <p>Current Movie: {this.state.movieTitle}</p>

          <Route path="/search" component={Search}/>
          <Route
            path="/library"
            render={()=> <Library
              updateCurrentMovieCallback={this.updateCurrentMovie}
              displayCurrentMovieCallback={this.displayCurrentMovie}/>}
          />
          <Route
            path="/customers"
            render={() => <CustomerList
            updateCurrentCustomerCallback={this.updateCurrentCustomer}
            displayCurrentCustomerCallback={this.displayCurrentCustomer}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;
