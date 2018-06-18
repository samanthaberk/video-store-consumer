import React, { Component } from 'react';
import axios from 'axios';

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    }
  }

  componentDidMount() {
    const CUSTOMERS_URL = 'http://localhost:3000' + '/customers';
    axios.get(CUSTOMERS_URL)
      .then((response) => {
        // console.log(response);
        let updatedCustomers = []; response.data.map((customer) => {
          updatedCustomers.push(customer);
        });
        this.setState({
          customers: updatedCustomers
        });
      })
      .catch();
  }

  render() {
    const customers = this.state.customers.map((customer) => {
      return (<p>{customer.name}</p>);
    });
    return (
      <div>
      <h1>CustomerList!</h1>
      {customers}
      </div>
    );
  }
}

export default CustomerList;
