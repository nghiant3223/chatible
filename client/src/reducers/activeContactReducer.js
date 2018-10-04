const initialState = null;

const activeContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CONTACT':
            return action.payload;
        case 'UPDATE_CONTACT_STATUS__ONLINE': {
            const { lastLogin, username } = action.payload;
            const activeContact = { ...state };

            if (state.username == username) {
                activeContact.lastLogin = lastLogin;
            }
            return activeContact;
        }
            
        case 'UPDATE_CONTACT_STATUS__OFFLINE': {
            console.log('active fire')
            const { lastLogout, username } = action.payload;
            const activeContact = { ...state };

            if (state.username == username) {
                activeContact.lastLogout = lastLogout;
            }
            return activeContact;
        }
            
        case 'CLEAR':
            return initialState;

        default:
            return state;
    }
}

export default activeContactReducer;