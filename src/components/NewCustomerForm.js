import React from 'react';
import axios from 'axios';

import './Search.css';
import './NewCustomerForm.css';

class NewCustomerForm extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      postal_code: '',
      phone: '',
      account_credit: ''
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
      this.setState({
        name: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        phone: '',
        account_credit: ''
      });
  }

  render () {
    return (
      <form onSubmit={this.onNewCustomerFormSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input className="searchInput"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input className="searchInput"
            type="text"
            name="address"
            value={this.state.address}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input className="searchInput"
            type="text"
            name="city"
            value={this.state.city}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input className="searchInput"
            type="text"
            name="state"
            value={this.state.state}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="postal_code">Postal Code</label>
          <input className="searchInput"
            type="text"
            name="postal_code"
            value={this.state.postal_code}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input className="searchInput"
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <label htmlFor="account_credit">Account Credit</label>
          <input className="searchInput"
            type="text"
            name="account_credit"
            value={this.state.account_credit}
            onChange={this.onInputChange}
          />
        </div>
        <div>
          <input className="searchBtn" type="submit" />
        </div>
      </form>
    );
  }
}

export default NewCustomerForm;
