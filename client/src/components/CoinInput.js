import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';


class CoinInput extends Component {
    constructor(props) {
        super(props);
        this.state = {coinSelected: 'bitcoin'};
    
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.props.fetchCoins();
    }
    handleChange(event) {
        this.setState({coinSelected: event.target.value});
      }

    //run on user submit
    // updateCoinAmount(coinId, amount) {
    //     this.props.updatePortfolio(coinId,amount)
    // }
    render() {
        return (
            <div>
                <form onSubmit={(event) => {
                        event.preventDefault()
                        let amount = event.target.userInput.value;
                        this.props.updatePortfolio(this.state.coinSelected,amount);    
                        console.log(`amount entered: ${amount}`);
                        
                        }}>
                    <label>Coin
                    <select value={this.state.coinSelected} onChange={this.handleChange}>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                    </select>
                    </label>      
                    <input type="text" placeholder="amount" name="userInput" />
                    <button className="form btn">Submit</button>
                    </form>
            </div>
        );
    }
}
const mapStateToProps= (state) => ({
    coins: state.coins
});

export default connect(mapStateToProps, actions)(CoinInput)