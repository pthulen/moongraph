const initialState = null

export const portfolioReducer = (state=initialState, action) => {
    console.log(action)
    switch(action.type){
        case 'UPDATE_PORTFOLIO':
            return  action.payload;
            
        default:
            return state;    
    }
};