import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import NewCustomerForm from './NewCustomerForm';
import './CustomerList.css'

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      displayNewCustomerForm: false
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

  toggleNewCustomerForm = () => {
    this.setState({
      displayNewCustomerForm: !this.state.displayNewCustomerForm
    });
  }

  render() {
    let form = null;
    if (this.state.displayNewCustomerForm) {
      form =
      <section>
        <NewCustomerForm />
      </section>;
    }

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
        <h1>CustomerList!</h1>
        <button onClick={this.toggleNewCustomerForm}>Create New Customer</button>
        {form}
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
