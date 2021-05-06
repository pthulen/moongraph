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

export const updatePortfolio = (coinId, amount) => async dispatch => {
      const data = {
            id: coinId,
            amount: amount
      }
    //const res await axios.put('/api/portfolio', coinId);

    dispatch({ type: 'UPDATE_PORTFOLIO', payload: data })
}