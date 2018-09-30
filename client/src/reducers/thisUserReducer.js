const initialState = null;

const thisUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'UNSET_USER':
            return initialState;
        default:
            return state;
    }
}

export default thisUserReducer;