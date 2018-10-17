const initialState = null;

const activeContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_CONTACT':
            return action.payload;
        
        case 'UPDATE_CONTACT_STATUS__ONLINE': {
            if (state === 'new') return state;

            const { lastLogin, username } = action.payload;
            const activeContact = { ...state };

            if (activeContact.username === username) activeContact.lastLogin = lastLogin;
            
            return activeContact;
        }
            
        case 'UPDATE_CONTACT_STATUS__OFFLINE': {
            if (state === 'new') return state;
            
            const { lastLogout, username } = action.payload;
            const activeContact = { ...state };

            if (activeContact.username === username) activeContact.lastLogout = lastLogout;
            
            return activeContact;
        }
            
        case 'CHANGE_COLOR_THEME': {
            const { colorTheme, roomId } = action.payload;
            const activeContact = { ...state };

            if (activeContact.roomId === roomId) activeContact.colorTheme = colorTheme;
            
            return activeContact;
        }
            
        case 'UPDATE_CONTACT_FILE': {
            const { roomId, files } = action.payload;
            const activeContact = { ...state };

            if (activeContact.roomId === roomId) activeContact.files = files;
            
            return activeContact;
        }
            
        case 'UPDATE_CONTACT_IMAGE': {
            const { roomId, images } = action.payload;
            const activeContact = { ...state };

            if (activeContact.roomId === roomId) activeContact.images = images;
            
            return activeContact;
        }
        
        case 'UPDATE_CONTACT_LAST_MESSAGE': {
            const { type, time, from, content, roomId,peopleSeen } = action.payload;
            const activeContact = { ...state };

            if (activeContact.roomId === roomId)  activeContact.lastMessage = { type, time, from, content, peopleSeen };
            
            return activeContact;
        }    
        
        case 'CLEAR':
            return initialState;
        
        case 'NEW_CONTACT':
            return 'new';

        default:
            return state;
    }
}

export default activeContactReducer;