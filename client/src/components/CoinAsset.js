import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CoinAsset extends Component {
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

    sortedCoinList() {
        //returns option list of coins that have not yet been added to user portfolio
        let coinsInUse = [];
        let coins = [];
        this.props.portfolio[0].presentData.coinData.forEach(element => {
            coinsInUse.push(element.id);
        });
        let unusedCoins = [];
        this.props.coins.forEach(element =>{
            coins.push(element.id);
        });
        coins = coins.filter(val => !coinsInUse.includes(val));
        unusedCoins = this.props.coins.filter(el =>{
            return coins.includes(el.id);
        })
        return unusedCoins;
    }

    getImageUrl() {
        //search "coins" in redux store for this.state.coinSelected
        const currentCoin = this.state.coinSelected;
        const found = this.props.coins.find(obj =>{
            return obj.id === currentCoin;
        })
        //return matching coin's url to img element
        return found.image
        
    }  

    renderContent() {
        let portfolio = this.props.portfolio;
            if(portfolio && portfolio.length > 0) {
                return (
                <div>
                        <p>Use update</p>
                        <form onSubmit={(event) => {
                           event.preventDefault()
                         console.log('Create port fired!')
                         let amount = 0;
                         this.props.addPortfolioCoin(this.state.coinSelected,amount,this.props.portfolio);    
                         }}>
                        <label>Coin
                            <select value={this.state.coinSelected} onChange={this.handleChange}>
                                {this.sortedCoinList().map((coin)=> {
                                    return <option value={coin.id} key={coin.id}>{coin.name} </option>
                                    })}
                                
                            </select> 
                     {/* <select value={this.state.coinSelected} onChange={this.handleChange}>
                         <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                     </select> */}
                            </label>
                            {/* {this.getImageUrl()}     */}
                     <img className="coin-logo" src={this.getImageUrl()} alt="coin-logo"/>
                     <button className="form btn">Submit</button>
                     </form>
                 </div>
                )
            } else{
                if(portfolio == null || portfolio.length <= 0) {
                    return (
                    <div>
                        <p>No portoflio yet use createportfolio</p>
                        <form onSubmit={(event) => {
                           event.preventDefault()
                         console.log('Update port fired!')
                         let amount = 0;
                         this.props.createPortfolio(this.state.coinSelected,amount,this.props.portfolio);    
                         }}>
                        <label>Coin
                            <select value={this.state.coinSelected} onChange={this.handleChange}>
                                {this.props.coins.map((coin)=> {
                                    return <option value={coin.id} key={coin.id}>{coin.name} </option>
                                })}
                            </select> 
                     {/* <select value={this.state.coinSelected} onChange={this.handleChange}>
                         <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                     </select> */}
                            </label> 
                     <img className="coin-logo" src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="coin-logo"/>
                     <button className="form btn">Submit</button>
                     </form>
                 </div>
                    )
                }
                if(portfolio.length <= 0) {
                    return (
                    <p>portfolio - empty </p>
                        
                    ) 
                }
                console.log("Loading error: " + portfolio)
                return (<p>loading error </p>)
            }
    } 

    render() {
        return (
            <div>
                <h4>Add New Asset</h4>
                {this.props.coins? this.renderContent() : "Loading"}
            </div>
        );
    }
}

const mapStateToProps= (state) => ({
    coins: state.coins,
    portfolio: state.portfolio
});

export default connect(mapStateToProps, actions)(CoinAsset);

