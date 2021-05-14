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
export const createPortfolio = (coinId, amount) => async dispatch => {
      const porfolioData = {
          date: Date.now(),
          id: coinId,
          amount: amount
      }
    const res = await axios.post('/api/portfolio', porfolioData);

    //send the new portfolio data back in an array 
    let data = [res.data]
    dispatch({ type: 'CREATE_PORTFOLIO', payload: data })
}

export const addPortfolioCoin = (coinId, amount) => async dispatch => {
    const newCoinData = {
        id: coinId,
        amount: amount
    }
  const res = await axios.put('/api/portfolio', newCoinData);

  dispatch({ type: 'ADD_PORTFOLIO_COIN', payload: res.data })
}