const initialState = null;

const recentContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CONTACTS_SUCCESS':
            action.payload = action.payload.reverse();
            return action.payload;
        
        case 'FETCH_CONTACTS_FAILURE':
            return false;
        
        case 'UPDATE_CONTACT_STATUS__ONLINE': {
            const { lastLogin, username } = action.payload;
            const contacts = [...state];

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].counterpart && contacts[i].counterpart.username === username) {
                    contacts[i].counterpart.lastLogin = lastLogin;
                    break;
                }
            }

            return contacts;
        }
            
        case 'UPDATE_CONTACT_STATUS__OFFLINE': {
            const { lastLogout, username } = action.payload;
            const contacts = [...state];

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].counterpart && contacts[i].counterpart.username === username) {
                    contacts[i].counterpart.lastLogout = lastLogout;
                    break;
                }
            }

            return contacts;
        }
            
        case 'CHANGE_COLOR_THEME': {
            const { colorTheme, roomId } = action.payload;
            const contacts = [...state];

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].roomId === roomId) {
                    contacts[i].colorTheme = colorTheme;
                    break;
                }
            }

            return contacts;
        }
            
        case 'CLEAR':
            return initialState;
            
        default:
            return state;
    }
}

export default recentContactReducer;