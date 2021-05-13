import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

class CoinValue extends Component {
    findCoinValue(name, amount) {
            console.log(name);
        let coinList = this.props.coins;
        let coinIndex = this.props.coins.findIndex(x => x.id === this.props.portfolio.presentData.coinData[0].id)
        let currentPrice = coinList[coinIndex].current_price;
        const value = currentPrice * amount;
        return value;
    }
    
    renderContent() {
        if(this.props.portfolio) {
            return (<p>Portfolio value: {this.findCoinValue('update later', this.props.portfolio.presentData.coinData[0].currentAmount)}</p>)
        } else {
            return (<p>Portfolio value: 0</p>)
        }
    }

    render() {
        return (
            <div>
                {/* {this.renderContent()} */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    coins: state.coins,
    portfolio: state.portfolio
})

export default connect(mapStateToProps, actions)(CoinValue);