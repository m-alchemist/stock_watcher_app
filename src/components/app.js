import React, { Component } from 'react';
import SearchBar from './search_bar';
import Chart from './chart';
import io from 'socket.io-client';

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
