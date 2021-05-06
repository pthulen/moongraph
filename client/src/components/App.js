import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import CoinInput from './CoinInput';
import Graph from './Graph';
import CoinValue from './CoinValue';

import '../App.css';
import Portfolio from './Portfolio';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
              <Header className="App-header" />
          <div className="container graph">
                <Graph />
          </div>
          <div className="container main">
            <CoinValue />
            <CoinInput /> 
          </div>

          <Route exact path="/portfolio" component={Portfolio} />
        </div>
      
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  quote: state.quote
})
export default connect(mapStateToProps, actions)(App);


