const initialState = [];

const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_USER':
            return [ ...action.payload ];
        
        case 'CLEAR':
            return initialState;
        
        case 'ADD_CONTACT': {
            const { roomInfo: { counterpart } } = action.payload;
            if (state.map(user => user.username).indexOf(counterpart.username) === -1)
                return [counterpart, ...state];
            return state;
        }

        
        default:
            return state;
    }
}

export default allUsersReducer;