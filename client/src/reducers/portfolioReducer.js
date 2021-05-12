const initialState = null

export const portfolioReducer = (state=initialState, action) => {
    console.log(action)
    switch(action.type){
        case 'CREATE_PORTFOLIO':
            return  action.payload;
            
        default:
            return state;    
    }
};