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

export const createPortfolio = (coinId, amount) => async dispatch => {
      const porfolioData = {
          date: Date.now(),
          id: coinId,
          amount: amount
      }
    const res = await axios.post('/api/portfolio', porfolioData);

    dispatch({ type: 'CREATE_PORTFOLIO', payload: res.data })
}