const initialState = null;

const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_USER':
            return [ ...action.payload ];
        
        case 'CLEAR':
            return initialState;
        
        default:
            return state;
    }
}

export default allUsersReducer;