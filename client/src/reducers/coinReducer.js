const initialState = null;

export const coinReducer = (state=initialState, action) => {
    switch(action.type){
        case 'FETCH_COINS':
            return action.payload;    
        default:
            return state;    
    }
};