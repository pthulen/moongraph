import React, { Component } from 'react';
//import { connect } from 'react-redux';


class CoinInput extends Component {
    render() {
        return (
            <div>
                <form onSubmit={(event) => {
                        event.preventDefault()

                          //handle inputs
                        }}>
                    <label>Coin</label>
                      <select >
                        <option value="bitcoin">Bitcoin</option>
                      </select>      
                    <input type="text" placeholder="amount" name="userInput" />
                    <button className="form btn">Submit</button>
                    </form>
            </div>
        );
    }
}

export default CoinInput