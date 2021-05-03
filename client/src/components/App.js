import React, { Component } from 'react';
import CoinInput from './CoinInput';
import '../App.css';

class App extends Component {
  render() {
    return (
    <div className="App">
          <header className="App-header">
            Moon Graph
          </header>
      <div className="container graph">
            <p>Graph</p>
      </div>
      <div className="container main">
         <CoinInput /> 
      </div>


    </div>
    );
  }
}

export default App;

