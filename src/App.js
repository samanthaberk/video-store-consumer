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
      currentMovie: null
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

  render() {
    return (
      <Router>
        <div>
          <Link to="/search">Search </Link>
          <Link to="/library">Library </Link>
          <Link to="/customers">Customers </Link>

          <p>Current Customer: {this.state.customerName}</p>

          <Route path="/search" component={Search}/>
          <Route path="/library" component={Library}/>
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
