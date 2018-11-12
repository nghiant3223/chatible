const initialState = null;

const recentContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CONTACTS_SUCCESS':
            action.payload = action.payload.reverse();
            return action.payload;
        
        case 'FETCH_CONTACTS_FAILURE':
            return null;
        
        case 'UPDATE_CONTACT_STATUS__ONLINE': {
            const { lastLogin, username } = action.payload;
            const contacts = state ? [...state] : [];

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].partner && contacts[i].partner.username === username) {
                    contacts[i].partner.lastLogin = lastLogin;
                    break;
                }
            }

            return contacts;
        }
            
        case 'UPDATE_CONTACT_STATUS__OFFLINE': {
            const { lastLogout, username } = action.payload;
            const contacts = [...state];

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].partner && contacts[i].partner.username === username) {
                    contacts[i].partner.lastLogout = lastLogout;
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
            
        case 'UPDATE_CONTACT_FILE': {
            const { roomId, files} = action.payload;
            const contacts = [...state ];

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].roomId === roomId) {
                    contacts[i].files = files;
                    break;
                }
            }
            
            return contacts;
        }
            
        case 'UPDATE_CONTACT_IMAGE': {
            const { roomId, images } = action.payload;
            const contacts = [ ...state ];

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].roomId === roomId) {
                    contacts[i].images = images;
                    break;
                }
            }
            
            return contacts;
        }
            
        case 'UPDATE_CONTACT_LAST_MESSAGE': {
            const { type, time, from, content, roomId, peopleSeen } = action.payload;
            const contacts = [ ...state ];

            for (let i = 0; i < contacts.length; i++) {
                if (contacts[i].roomId === roomId) {
                    contacts[i].lastMessage = { type, time, from, content, peopleSeen };
                    break;
                }
            }
            
            return contacts;
        }   
            
        case 'HOIST_CONTACT': {
            const { roomId } = action.payload;
            let contacts = [...state];
            const hoistedContact = contacts.find(contact => contact.roomId === roomId);
            contacts = contacts.filter(contact => contact.roomId !== roomId);
            contacts.unshift(hoistedContact);
            return contacts;
        }
            
        case 'ADD_CONTACT': {
            const { roomInfo } = action.payload;
            let existingRoom = state.find(room => room.roomId === roomInfo.roomId);
            if (existingRoom) return state;
            return [roomInfo, ...state];
        }
            
        case 'CLEAR':
            return initialState;
            
        default:
            return state;
    }
}

export default recentContactReducer;