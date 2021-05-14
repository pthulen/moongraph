import React, { Component } from 'react';

class CoinUpdate extends Component {
    //pull coin name and current amount from props passed down from parent component
    //onclick, update portfolio with new coin amount

    render() {
        return (
            <div>
                <p>Coin Name</p>
                <input type="text" placeholder="0"></input>
                <button>Update Amount</button>
            </div>
        );
    }
}

export default CoinUpdate;