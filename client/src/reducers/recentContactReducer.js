// const initialState = {
//     activeContact: null,
//     contacts: []
// }

// const recentContactReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FETCH_CONTACT': {
//             action.payload = action.payload.reverse();

//             return {
//                 ...state,
//                 contacts: action.payload,
//                 activeContact: action.payload[0]
//             };
//         }
        
//         case 'HOIST_CONTACT': {
//             let tempContacts = [...state.contacts];
//             tempContacts = tempContacts.filter(item => item !== action.payload);
//             tempContacts.unshift(action.payload);

//             return {
//                 ...state,
//                 contacts: tempContacts
//             };
//         }
        
//         case 'MAKE_CONTACT_ACTIVE': {
//             const roomId = action.payload;
//             const activeContact = state.contacts.find(contact => contact.roomId === roomId);

//             return {
//                 ...state,
//                 activeContact
//             };
//         }
        
//         case 'CHANGE_CONTACT_COLOR': {
//             const { roomId, colorTheme } = action.payload;
//             const activeContact = { ...state.activeContact };
//             const contacts = [...state.contacts];

//             activeContact.colorTheme = colorTheme;
//             for (let i = 0; i < contacts.length; i++) {
//                 if (contacts[i].roomId === roomId) {
//                     contacts[i].colorTheme = colorTheme;
//                     break;
//                 }
//             }

//             return {
//                 ...state,
//                 activeContact,
//                 contacts
//             };
//         }
            
//         case 'UPDATE_CONTACT_STATUS__ONLINE': {
//             const { lastLogin, username } = action.payload;
//             const contacts = [...state.contacts];
//             const activeContact = { ...state.activeContact };
       
//             for (let i = 0; i < contacts.length; i++) {
//                 if (contacts[i].counterpart && contacts[i].counterpart.username === username) {
//                     contacts[i].counterpart.lastLogin = lastLogin;
//                     break;
//                 }
//             }

//             if (activeContact.counterpart) {
//                 activeContact.counterpart.lastLogin = lastLogin;
//             }
        
//             return {
//                 ...state,
//                 contacts,
//                 activeContact
//             };
//         }
            
//         case 'UPDATE_CONTACT_STATUS__OFFLINE': {
//             const { lastLogout, username } = action.payload;
//             const contacts = [...state.contacts];
//             const activeContact = { ...state.activeContact };
// // 
//             for (let i = 0; i < contacts.length; i++) {
//                 if (contacts[i].counterpart && contacts[i].counterpart.username === username) {
//                     contacts[i].counterpart.lastLogout = lastLogout;
//                     break;
//                 }
//             }

//             if (activeContact.counterpart) {
//                 activeContact.counterpart.lastLogout = lastLogout;
//             }

//             return {
//                 ...state,
//                 contacts,
//                 activeContact
//             };
//         }
        
//         default:
//             return state;
//     }
// }

// export default recentContactReducer;const initialState = {
//     activeContact: null,
//     contacts: []
// }

// const recentContactReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'FETCH_CONTACT': {
//             action.payload = action.payload.reverse();

//             return {
//                 ...state,
//                 contacts: action.payload,
//                 activeContact: action.payload[0]
//             };
//         }
        
//         case 'HOIST_CONTACT': {
//             let tempContacts = [...state.contacts];
//             tempContacts = tempContacts.filter(item => item !== action.payload);
//             tempContacts.unshift(action.payload);

//             return {
//                 ...state,
//                 contacts: tempContacts
//             };
//         }
        
//         case 'MAKE_CONTACT_ACTIVE': {
//             const roomId = action.payload;
//             const activeContact = state.contacts.find(contact => contact.roomId === roomId);

//             return {
//                 ...state,
//                 activeContact
//             };
//         }
        
//         case 'CHANGE_CONTACT_COLOR': {
//             const { roomId, colorTheme } = action.payload;
//             const activeContact = { ...state.activeContact };
//             const contacts = [...state.contacts];

//             activeContact.colorTheme = colorTheme;
//             for (let i = 0; i < contacts.length; i++) {
//                 if (contacts[i].roomId === roomId) {
//                     contacts[i].colorTheme = colorTheme;
//                     break;
//                 }
//             }

//             return {
//                 ...state,
//                 activeContact,
//                 contacts
//             };
//         }
            
//         case 'UPDATE_CONTACT_STATUS__ONLINE': {
//             const { lastLogin, username } = action.payload;
//             const contacts = [...state.contacts];
//             const activeContact = { ...state.activeContact };
       
//             for (let i = 0; i < contacts.length; i++) {
//                 if (contacts[i].counterpart && contacts[i].counterpart.username === username) {
//                     contacts[i].counterpart.lastLogin = lastLogin;
//                     break;
//                 }
//             }

//             if (activeContact.counterpart) {
//                 activeContact.counterpart.lastLogin = lastLogin;
//             }
        
//             return {
//                 ...state,
//                 contacts,
//                 activeContact
//             };
//         }
            
//         case 'UPDATE_CONTACT_STATUS__OFFLINE': {
//             const { lastLogout, username } = action.payload;
//             const contacts = [...state.contacts];
//             const activeContact = { ...state.activeContact };
// // 
//             for (let i = 0; i < contacts.length; i++) {
//                 if (contacts[i].counterpart && contacts[i].counterpart.username === username) {
//                     contacts[i].counterpart.lastLogout = lastLogout;
//                     break;
//                 }
//             }

//             if (activeContact.counterpart) {
//                 activeContact.counterpart.lastLogout = lastLogout;
//             }

//             return {
//                 ...state,
//                 contacts,
//                 activeContact
//             };
//         }
        
//         default:
//             return state;
//     }
// }

// export default recentContactReducer;

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
                if (contacts[i].roomId = roomId) {
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