const initialState = null

export const portfolioReducer = (state=initialState, action) => {
    console.log(action)
    switch(action.type){
        case 'CREATE_PORTFOLIO':
            return  action.payload;
        case 'FETCH_PORTFOLIO':
            return  action.payload; 
        case 'ADD_PORTFOLIO_COIN':
            return  action.payload; 
        case 'UPDATE_PORTFOLIO_COIN':
            return  action.payload;            
        default:
            return state;    
    }
};