import React from 'react';

class NewCustomerForm extends React.Component {
  render () {
    return (
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
          />
        </div>
        <div>
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
          />
        </div>
        <div>
          <label htmlFor="postal-code">Postal Code</label>
          <input
            type="text"
            name="postal-code"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
          />
        </div>
        <div>
          <label htmlFor="account-credit">Account Credit</label>
          <input
            type="text"
            name="account-credit"
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
