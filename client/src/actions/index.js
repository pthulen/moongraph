import axios from 'axios';

//fetch current user
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
     
    dispatch({ type: 'FETCH_USER', payload: res.data });
 };

export const fetchCoins = () => async dispatch => {
    const res = await axios.get('api/coins')

    dispatch({ type: 'FETCH_COINS', payload: res.data})
}

export const fetchPortfolio = () => async dispatch => {
    const res = await axios.get('/api/portfolio');
 
    dispatch({ type: 'FETCH_PORTFOLIO', payload: res.data });
 };
export const createPortfolio = (coinId, name, amount, date) => async dispatch => {
    // let d = new Date();
    // d.setDate(d.getDate());
      const porfolioData = {
          date: date,
          id: coinId,
          name: name,
          amount: amount
      }
    const res = await axios.post('/api/portfolio', porfolioData);

    //send the new portfolio data back in an array 
    let data = [res.data]
    dispatch({ type: 'CREATE_PORTFOLIO', payload: data })
}

export const addPortfolioCoin = (coinId, name, amount) => async dispatch => {
    const newCoinData = {
        id: coinId,
        name: name,
        amount: amount
    }
  const res = await axios.put('/api/portfolio', newCoinData);

  dispatch({ type: 'ADD_PORTFOLIO_COIN', payload: res.data })
}

export const updatePortfolioCoin = (coinId, amount, currentPrice, currentValue) => async dispatch => {
    const updateCoinData = {
        id: coinId,
        amount: amount,
        currentPrice: currentPrice,
        currentValue: currentValue
    }
  const res = await axios.put('/api/portfolio/:id', updateCoinData);

  dispatch({ type: 'UPDATE_PORTFOLIO_COIN', payload: [res.data] })
}