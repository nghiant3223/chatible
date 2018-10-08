const initialState = null;

const activeContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CONTACT':
            return action.payload;
        
        case 'UPDATE_CONTACT_STATUS__ONLINE': {
            const { lastLogin, username } = action.payload;
            const activeContact = { ...state };

            if (state.username === username) {
                activeContact.lastLogin = lastLogin;
            }
            return activeContact;
        }
            
        case 'UPDATE_CONTACT_STATUS__OFFLINE': {
            const { lastLogout, username } = action.payload;
            const activeContact = { ...state };

            if (state.username === username) {
                activeContact.lastLogout = lastLogout;
            }
            return activeContact;
        }
            
        case 'CHANGE_COLOR_THEME': {
            const { colorTheme, roomId } = action.payload;
            const activeContact = { ...state };

            if (state.roomId === roomId) {
                activeContact.colorTheme = colorTheme;
            }
            return activeContact;
        }
            
        case 'UPDATE_CONTACT_FILE': {
            const { fileInfo, roomId } = action.payload;
            const activeContact = { ...state };

            if (state.roomId === roomId) {
                activeContact.files.unshift(fileInfo);
            }
            return activeContact;
        }
            
        case 'UPDATE_CONTACT_IMAGE': {
            const { imageInfo, roomId } = action.payload;
            const activeContact = { ...state };

            if (state.roomId === roomId) {
                activeContact.images.unshift(imageInfo);
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