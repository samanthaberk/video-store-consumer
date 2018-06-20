import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import axios from 'axios';
import Library from './components/Library';
import Search from './components/Search';
import CustomerList from './components/CustomerList';
import Status from './components/Status';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      customerName: "",
      customerId: 0,
      movieTitle: "",
      movieId: 0,
      status: {
        message: "",
        type: 'success'
      }
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

  createNewRental = () => {
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    dueDate = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, "0")}-${String(dueDate.getDate()).padStart(2, "0")}`;

    const NEW_RENTAL_URL = `http://localhost:3000/rentals/${this.state.movieTitle}/check-out`;
    console.log(dueDate);
    axios.post(NEW_RENTAL_URL, {
      due_date: dueDate,
      customer_id: this.state.customerId
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
          <button
            onClick={this.createNewRental}
          >
            Check Out
          </button>

          <Status type={this.state.status.type} message={this.state.status.message}/>

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
