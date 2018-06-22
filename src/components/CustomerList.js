import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import NewCustomerForm from './NewCustomerForm';
import EditCustomerForm from './EditCustomerForm';
import './CustomerList.css'

class CustomerList extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      displayNewCustomerForm: false,
      editCustomerId: 0
    }
  }

  onCustomerSelect = (event) => {
    this.props.displayCurrentCustomerCallback(event.target.name);
    this.props.updateCurrentCustomerCallback(event.target.value);
  }

  onCustomerEditSelect = (event) => {
    this.setState({
      editCustomerId: event.target.value
    });
    // console.log(event.target.value);
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
    console.log(this.state.editCustomerId);

    let newCustomerForm = null;
    if (this.state.displayNewCustomerForm) {
      newCustomerForm =
      <section>
        <h3>New Customer!</h3>
        <NewCustomerForm />
      </section>;
    }

    let editCustomerForm = null;
    if (this.state.editCustomerId !== 0) {
      editCustomerForm =
      <section>
        <h3>Edit Customer!</h3>
        <EditCustomerForm customerId={this.state.editCustomerId} />
      </section>;
    }

    const customers = this.state.customers.map((customer) => {
      return (
        <div key={customer.id} className="customerContent">
          <p className="customer">{customer.name} </p>
          <button className="selectCustomer" onClick={this.onCustomerSelect} name={customer.name} value={customer.id}>Select</button>
          <button className="selectCustomer" onClick={this.onCustomerEditSelect} name={customer.name} value={customer.id}>Edit</button>
        </div>
      );
    });

    return (
      <div className='customerContainer'>
        <h1>CustomerList!</h1>
        <button onClick={this.toggleNewCustomerForm}>Create New Customer</button>
        {newCustomerForm}
        {editCustomerForm}
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
