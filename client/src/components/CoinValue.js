import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'; 

class CoinValue extends Component {
    
    renderContent() {
        if(this.props.portfolio) {
            return (<p>Portfolio value: 1000</p>)
        } else {
            return (<p>Portfolio value: 0</p>)
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

const mapStateToProps = (state) => ({
    coins: state.coins,
    portfolio: state.portfolio
})

export default connect(mapStateToProps, actions)(CoinValue);