import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CoinAsset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coinSelected: ''
        };
    
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
        if(currentCoin === '') {
            return null;
        }
        const found = this.props.coins.find(obj =>{
            return obj.id === currentCoin;
        })
        //return matching coin's url to img element
        return found.image
        
    }

    getCoinName() {
        //search "coins" in redux store for this.state.coinSelected
        const currentCoin = this.state.coinSelected;
        if(currentCoin === '') {
            return null;
        }
        const found = this.props.coins.find(obj =>{
            return obj.id === currentCoin;
        })
        //return matching coin's url to img element
        return found.name
    }

    handleSubmit (event) {
        event.preventDefault()
        if(this.state.coinSelected === '') {
            alert("Please select a coin to add.");
            return;
        }
        let name = this.getCoinName();
        let amount = 0;
        this.props.addPortfolioCoin(this.state.coinSelected,name, amount,this.props.portfolio);
        //re render assets in portfolio
        this.forceUpdate();
        //update drop down list
        this.setState({ coinSelected: '' });
    }

    renderContent() {
        let portfolio = this.props.portfolio;
            if(portfolio && portfolio.length > 0) {
                return (
                <div>
                        <p>Use update</p>
                        <form onSubmit={(event) =>{
                            this.handleSubmit(event);
                        }}>
                        <label>Coin
                            <select value={this.state.coinSelected} onChange={this.handleChange}>
                                <option value='' disabled defaultValue>Choose a Coin</option>
                                {this.props.portfolio.length > 0 ? this.sortedCoinList().map((coin)=> {
                                    return <option value={coin.id} key={coin.id}>{coin.name} </option>
                                    }) : null}
                                
                            </select> 
                     
                            </label>
                            {this.props.portfolio.length > 0  && this.props.coins && this.state.coinSelected !== '' ? <img className="coin-logo" src={this.getImageUrl()} alt="coin-logo"/> : null}
                     <button className="form btn">Add Asset</button>
                     </form>
                 </div>
                )
            } else{
                if(portfolio == null || portfolio.length <= 0) {
                    return (
                    <div>
                        <p>No portoflio yet use createportfolio</p>
                        <form onSubmit={(event) => {
                            if(this.state.coinSelected === '') {
                                alert("Please select a coin to add.");
                                return;
                            }
                           event.preventDefault()
                         let amount = 0;
                         this.props.createPortfolio(this.state.coinSelected,this.getCoinName(), amount,this.props.portfolio,);
                         //update drop down list
                        this.setState({ coinSelected: '' });    
                         }}>
                        <label>Coin
                            <select value={this.state.coinSelected} onChange={this.handleChange}>
                                <option value='' disabled defaultValue>Choose a Coin</option>
                                {this.props.coins.map((coin)=> {
                                    return <option value={coin.id} key={coin.id}>{coin.name} </option>
                                })}
                            </select> 
                     {/* <select value={this.state.coinSelected} onChange={this.handleChange}>
                         <option value="bitcoin">Bitcoin</option>
                        <option value="ethereum">Ethereum</option>
                     </select> */}
                            </label> 
                            {this.state.coinSelected ? <img className="coin-logo" src={this.getImageUrl()} alt="coin-logo"/> : null}
                     {/* <img className="coin-logo" src={this.getImageUrl()} alt="coin-logo"/> */}
                     <button className="form btn">Add Asset</button>
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

