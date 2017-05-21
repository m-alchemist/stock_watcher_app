import React, { Component } from 'react';
import SearchBar from './search_bar';
import Chart from './chart';
import io from 'socket.io-client';

export default class App extends Component {

  render() {

    return (
      <div>
        <h1 className='title'> Stock Market App</h1>

        <Chart />
        <SearchBar />

      </div>

    );
  }
}
