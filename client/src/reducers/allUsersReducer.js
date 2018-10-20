const initialState = [];

const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_USER':
            return [ ...action.payload ];
        
        case 'CLEAR':
            return initialState;
        
        case 'ADD_CONTACT': {
            const { roomInfo, roomInfo: { counterpart } } = action.payload;
            if (counterpart && state.map(user => user.username).indexOf(counterpart.username) === -1)
                return [counterpart, ...state];
            else return [roomInfo, ...state];
        }

        
        default:
            return state;
    }
}

export default allUsersReducer;