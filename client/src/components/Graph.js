import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import { connect } from 'react-redux';
import * as actions from '../actions';

class Graph extends Component {
constructor(props) {
  super(props);
  this.state = {
    labels: [],
    portfolioValues: []
  }
}
componentDidMount(){
  this.addDateLabels()
  this.createPortfolioValuesArray();
}

collectGraphData() {
let graphData = {
  labels: this.state.labels,
datasets: [
  {
    label: "Portfolio Value",
    data: this.state.portfolioValues,
    fill: true,
    backgroundColor: "rgba(75,192,192,0.2)",
    borderColor: "rgba(75,192,192,1)"
  },
  {
    label: "Second dataset",
    data: [0,0,0,0,0,0,0,0,0,33, 25, 35, 51, 54, 76],
    fill: false,
    borderColor: "#742774"
  }
],
responsive: true
}
//returns object of all needed information for chart
return graphData
}

//fill in total portfolio values
createPortfolioValuesArray() {
  let portfolioValues = []
  //if no history add zeros and current day's portfolio value
  if(this.props.portfolio && !this.props.portfolio[0].pastData){
    portfolioValues = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    portfolioValues.push(this.getPortfolioValue())
  }
  // *** function needed ****
  //if pastData exists, fill portfolioValues with last 13 days then append current day's portfolio value

  //update the graph data in state
  this.setState({ portfolioValues: portfolioValues })
}

//generate last 14 dates
addDateLabels() {
  let labels = []
  for(let i= 14; i > -1; i--){
    let d = new Date();
    d.setDate(d.getDate()-i)
    labels.push(d.toLocaleDateString())

  }
  this.setState({
    labels: labels
  })
}

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
          <div className="container graph">
            <Line data={this.collectGraphData()} />
          </div>
            
        );
    }
}

const mapStateToProps= (state) => ({
  portfolio: state.portfolio,
  coins: state.coins
});

export default connect(mapStateToProps, actions)(Graph);