import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ""
    }
  }

  onInputChange = (event) => {
    let updatedSearchTerm = {}
    updatedSearchTerm['searchTerm'] = event.target.value;
    this.setState(updatedSearchTerm);
  }

  render() {
    console.log(this.state.searchTerm);
    return (
      <section>
        <form>
          <input
            onChange={this.onInputChange}
            type="text"
            value={this.state.searchTerm}
          />
          <input type="submit" />
        </form>
      </section>
    );
  }
}

export default Search;
