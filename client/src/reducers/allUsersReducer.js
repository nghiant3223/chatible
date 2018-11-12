const initialState = [];

const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_USER':
            return [ ...action.payload ];
        
        case 'CLEAR':
            return initialState;
        
        case 'ADD_CONTACT': {
            const { roomInfo, roomInfo: { partner } } = action.payload;
            if (partner && state.map(user => user.username).indexOf(partner.username) === -1)
                return [partner, ...state];
            else return [roomInfo, ...state];
        }

        
        default:
            return state;
    }
}

export default allUsersReducer;