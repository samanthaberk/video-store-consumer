import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './CustomerList.css'

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
    this.props.updateStatusCallback('Loading customers...', 'success');
    const CUSTOMERS_URL = 'http://localhost:3000' + '/customers';
    axios.get(CUSTOMERS_URL)
      .then((response) => {
        let updatedCustomers = []; response.data.map((customer) => {
          updatedCustomers.push(customer);
        });
        this.props.updateStatusCallback(`${updatedCustomers.length} customers successfully loaded`, 'success');
        this.setState({
          customers: updatedCustomers
        });
      })
      .catch((error) => {
        this.props.updateStatusCallback(`Something went wrong: ${error.message}`, 'error');
      });
  }

  render() {
    const customers = this.state.customers.map((customer) => {
      return (
        <div key={customer.id} className="customerContent">
          <p className="customer">{customer.name} </p>
          <button className="selectCustomer" onClick={this.onCustomerSelect} name={customer.name} value={customer.id}>Select</button>
        </div>
      );
    });
    return (
      <div className='customerContainer'>
      {customers}
      </div>
    );
  }
}

CustomerList.propTypes = {
  updateCurrentCustomerCallback: PropTypes.func.isRequired,
  displayCurrentCustomerCallback: PropTypes.func.isRequired,
  updateStatusCallback: PropTypes.func.isRequired
};

export default CustomerList;
