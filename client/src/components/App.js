import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Graph from './Graph';
import Footer from './Footer';


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
            <Route exact path="/" component={Landing} />
            <Route exact path="/portfolio" component={Graph} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Footer className="footer" />    
        </div>
      
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  quote: state.quote
})
export default connect(mapStateToProps, actions)(App);


