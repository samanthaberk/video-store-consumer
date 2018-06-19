import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    }
  }

  onCustomerSelect = (event) => {
    this.props.displayCurrentCustomerCallback(event.target.name);
    this.props.updateCurrentCustomerCallback(event.target.value);
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
      return (
        <div key={customer.id}>
          <p>{customer.name} <button onClick={this.onCustomerSelect} name={customer.name} value={customer.id}>Select</button></p>
        </div>
      );
    });
    return (
      <div>
      <h1>CustomerList!</h1>
      {customers}
      </div>
    );
  }
}

CustomerList.propTypes = {
  updateCurrentCustomerCallback: PropTypes.func.isRequired,
  displayCurrentCustomerCallback: PropTypes.func.isRequired
};

export default CustomerList;
