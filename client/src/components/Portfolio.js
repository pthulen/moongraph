import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CoinAsset from './CoinAsset';
import CoinUpdate from './CoinUpdate';

class Portfolio extends Component {
    componentDidMount() {
            this.props.fetchPortfolio();
            //this.props.addPortfolioCoin("ethereum","4");
    }
    getPortfolioValue() {
        if(this.props.portfolio && this.props.portfolio.length > 0){
            const portfolio= this.props.portfolio;
            let values= [];
            portfolio[0].presentData.coinData.forEach(coin => values.push(coin.currentValue))
            let totalValue = values.reduce((acc, currentValue) => acc + currentValue);
            return totalValue;
        }
    }
    render() {
        return (
            <div>
                <h4>Logged In!</h4>
                <h5>Portfolio Value: ${this.getPortfolioValue()}</h5>
                <CoinAsset />
                <CoinUpdate />
            </div>
        );
    }
}
const mapStateToProps= (state) => ({
    portfolio: state.portfolio
});

export default connect(mapStateToProps, actions)(Portfolio);