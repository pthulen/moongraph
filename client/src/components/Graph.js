import React, { Component } from 'react';
import { Line } from "react-chartjs-2";
import { connect } from 'react-redux';
import * as actions from '../actions';

function getPortfolioValue() {
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
//let portfolioValue = getPortfolioValue();
let data = {
  labels: [],
  datasets: [
    {
      label: "First dataset",
      data: [0,0,0,0,0,0,0,0,0,33, 53, 85, 41, 2000, 3829.02],
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
};

//generate last 14 dates
function addDateLabels() {
  for(let i= 14; i > -1; i--){
    let d = new Date();
    d.setDate(d.getDate()-i)
    data.labels.push(d.toLocaleDateString())

  }
}
addDateLabels();



class Graph extends Component {

    render() {
        return (
                <Line data={data} />
        );
    }
}

const mapStateToProps= (state) => ({
  portfolio: state.portfolio,
  coins: state.coins
});

export default connect(mapStateToProps, actions)(Graph);