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
    // getPortfolioValue() {
    //     if(this.props.portfolio && this.props.portfolio.length > 0){
    //         const portfolio= this.props.portfolio;
    //         let values= [];
    //         portfolio[0].presentData.coinData.forEach(coin => values.push(coin.currentValue))
    //         let totalValue = values.reduce((acc, currentValue) => acc + currentValue);
    //         return totalValue.toFixed(2);
    //     }
    // }
    getPortfolioValue() {
            if(this.props.portfolio && this.props.portfolio.length > 0 && this.props.coins){
                const portfolio= this.props.portfolio[0].presentData.coinData;
                //map over portfolio to gather current coin ids and their amounts
                let idsAndAmounts = [];
                portfolio.forEach(coin =>{
                    idsAndAmounts.push({ 
                        id: coin.id,
                        currentAmount: coin.currentAmount
                    })
                })
                //find current price by id and multiply by amount, return values to an array
                let values= [];
                idsAndAmounts.forEach(coin => {
                    let coinList = this.props.coins;
                    const found = coinList.find(obj =>{
                    return obj.id === coin.id;
                    })
                    if(found){
                    const price = found.current_price;
                    values.push(price * coin.currentAmount);
                    }
                })
                //reduce values array for total portfolio value
                let totalValue = values.reduce((acc, currentValue) => acc + currentValue);
                return totalValue.toFixed(2);
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
    portfolio: state.portfolio,
    coins: state.coins
});

export default connect(mapStateToProps, actions)(Portfolio);