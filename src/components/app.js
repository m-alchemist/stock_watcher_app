import React, { Component } from 'react';
import SearchBar from './search_bar';
import Chart from './chart';
export default class App extends Component {
  render() {
    return (
      <div>

        <Chart />
        <SearchBar />
      </div>

    );
  }
}
