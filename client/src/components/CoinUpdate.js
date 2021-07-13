import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CoinUpdate extends Component {
//pull coin name and current amount from props passed down from parent component
//onclick, update portfolio with new coin amount

handleCoinUpdate(event, coinId) {
    //once an added asset is given an update the portfolio with the coin's info
    event.preventDefault()
    let currentAmount = event.target[0].value;
    let currentValue = this.findCoinValue(coinId, currentAmount);
    let currentPrice = this.findCoinPriceById(coinId);
    this.props.updatePortfolioCoin(coinId, currentAmount, currentPrice, currentValue);
}
findCoinPriceById(coinId) {
    if(this.props.coins){
        let coinList = this.props.coins;
        const found = coinList.find(obj =>{
            return obj.id === coinId;
        })
        if(found){
            const price = found.current_price;
            return price;
        }
    }
}

findCoinValue(coinId, amount) {
    if(this.props.coins){
    let coinList = this.props.coins;
    const found = coinList.find(obj =>{
        return obj.id === coinId;
    })
    if(found){
        const value = found.current_price * amount;
        return value;
    }
    console.log("found returned: " +found);
    }
    
    // let coinIndex = coinList.findIndex(x => x.id === coinId);
    // let currentPrice = coinList[coinIndex].current_price;
    // const value = currentPrice * amount;
    // return value;
}
renderContent() {
    if(this.props.portfolio){
        if(this.props.portfolio.length > 0){
            let portfolio = this.props.portfolio[0].presentData.coinData;
        return portfolio.map(coin =>{
            console.log(coin);
            return (
                <div key={coin.id}>
                    <form onSubmit={(event) =>{
                        this.handleCoinUpdate(event, coin.id);
                    }}>
                    <p>{coin.name}</p>
                    <input type="number" step="0.0001" name="amount" placeholder={coin.currentAmount}></input>
                    <button>Update Amount</button>
                    </form>
                    <h5>Current Value: {this.findCoinValue(coin.id,coin.currentAmount)}</h5>
                </div>
            );
        })
        }
    } 
}

render() {
    return (
        <div>
            {this.renderContent()}
        </div>
    );
}
}
const mapStateToProps= (state) => ({
    coins: state.coins,
    portfolio: state.portfolio
});

export default connect(mapStateToProps, actions)(CoinUpdate);
