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
    
    renderOptions() {
        switch (this.props.coins) {
            case null:
                return (<option value="bitcoin">Bitcoin</option>);
            case false: 
                return (<option value="bitcoin">Bitcoin</option>);    
            default:
                return (
                    <select value={this.state.coinSelected} onChange={this.handleChange}>
                        {this.props.coins.map((coin)=> {
                            return <option value={coin.id} key={coin.id}>{coin.name} </option>
                        })}

                    </select>
                );

        }
    }  

    render() {
        return (
            <div>
                <form onSubmit={(event) => {
                        event.preventDefault()
                        let amount = event.target.userInput.value;
                        this.props.createPortfolio(this.state.coinSelected,amount,this.props.portfolio);    
                        }}>
                    <label>Coin
                    {this.renderOptions()}    
                    {/* <select value={this.state.coinSelected} onChange={this.handleChange}>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                    </select> */}
                    </label>      
                    <input type="text" placeholder="amount" name="userInput" />
                    <button className="form btn">Submit</button>
                    </form>
            </div>
        );
    }
}
const mapStateToProps= (state) => ({
    coins: state.coins,
    portfolio: state.portfolio
});

export default connect(mapStateToProps, actions)(CoinInput)