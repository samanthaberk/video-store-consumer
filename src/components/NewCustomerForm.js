import React from 'react';
import axios from 'axios';

class NewCustomerForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      phone: '',
      accountCredit: ''
    }
  }

  onInputChange = (event) => {
    const updatedState = {}
    updatedState[event.target.name] = event.target.value;
    this.setState(updatedState);
  }

  onNewCustomerFormSubmit = (event) => {
    event.preventDefault();
    const NEW_CUSTOMER_URL = 'http://localhost:3000/customers/';
    const newCustomer = this.state;
    console.log(typeof newCustomer.accountCredit);
    axios.post(NEW_CUSTOMER_URL, this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render () {
    return (
      <form onSubmit={this.onNewCustomerFormSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            value={this.state.state}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={this.state.postalCode}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="accountCredit">Account Credit</label>
          <input
            type="text"
            name="accountCredit"
            value={this.state.accountCredit}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
    );
  }
}

export default NewCustomerForm;
