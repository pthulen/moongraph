import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CoinAsset from './CoinAsset';

class Portfolio extends Component {
    componentDidMount() {
            this.props.fetchPortfolio();
            //this.props.addPortfolioCoin("ethereum","4");
    }
    render() {
        return (
            <div>
                <h4>Logged In!</h4>
                <CoinAsset />
            </div>
        );
    }
}
const mapStateToProps= (state) => ({
    portfolio: state.portfolio
});

export default connect(mapStateToProps, actions)(Portfolio);