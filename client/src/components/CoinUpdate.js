import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CoinUpdate extends Component {
    //pull coin name and current amount from props passed down from parent component
    //onclick, update portfolio with new coin amount
    renderContent() {
        if(this.props.portfolio){
            if(this.props.portfolio.length > 0){
                let portfolio = this.props.portfolio[0].presentData.coinData;
            return portfolio.map(coin =>{
                return (
                    <div key={coin.id}>
                        <p>{coin.id}</p>
                        <input type="text" placeholder={coin.currentAmount}></input>
                        <button>Update Amount</button>
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
    portfolio: state.portfolio
});

export default connect(mapStateToProps, actions)(CoinUpdate);
