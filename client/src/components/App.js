import React, { Component } from 'react';
import CoinInput from './CoinInput';
import Graph from './Graph';
import CoinValue from './CoinValue';
import '../App.css';

class App extends Component {
  render() {
    return (
    <div className="App">
          <header className="App-header">
            Moon Graph
          </header>
      <div className="container graph">
            <Graph />
      </div>
      <div className="container main">
        <CoinValue />
        <CoinInput /> 
      </div>


    </div>
    );
  }
}

export default App;

