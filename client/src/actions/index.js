import axios from 'axios';
import socketGetter from '../socket';

export const fetchUserAndRecentContact = () => {
    return async dispatch => {
        try {
            const meRes = await axios.get('/api/user/me', { headers: { 'x-access-token': localStorage.getItem("x-access-token") } });
            socketGetter.getInstance().emit('thisUserGoesOnline', { username: meRes.data.username });
            console.log('after this');
            const contactRes = await axios.get('/api/room', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
            dispatch(fetchRecentContactSuccess(contactRes.data));
            dispatch(fetchUserSuccess(meRes.data));
            dispatch(setInitialActiveContact(contactRes.data[0]));
        } catch (e) {
            console.log(e);
            dispatch(fetchUserFailure());
            dispatch(fetchRecentContactFailure());
        }
    }
}



// THIS USER

export const fetchUserSuccess = (user) => ({
    type: 'FETCH_USER_SUCCESS',
    payload: user
});

export const fetchUserFailure = () => ({
    type: 'FETCH_USER_FAILURE'
});



// RECENT CONTACTS




export const unfetchRecentContact = () => ({
    type: 'UNFETCH_CONTACTS'
});

export const fetchRecentContactSuccess = (user) => ({
    type: 'FETCH_CONTACTS_SUCCESS',
    payload: user
});

export const fetchRecentContactFailure = () => ({
    type: 'FETCH_CONTACTS_FAILURE',
    payload: false
});

export const updateContactStatusOnline = (username, lastLogin) => ({
    type: 'UPDATE_CONTACT_STATUS__ONLINE',
    payload: { username, lastLogin }
});

export const updateContactStatusOffline = (username, lastLogout) => ({
    type: 'UPDATE_CONTACT_STATUS__OFFLINE', 
    payload: { username, lastLogout }
});


// ACTIVE CONTACT

export const setInitialActiveContact = (contact) => ({
    type: 'SET_ACTIVE_CONTACT',
    payload: contact
});

export const setActiveContact = (roomId) => {
    return (dispatch, getState) => {
        const { recentContacts } = getState();
        const activeContact = recentContacts.find(contact => contact.roomId === roomId);
        dispatch({ type: 'SET_ACTIVE_CONTACT', payload: { ...activeContact } });
    }
}

export const changeColorTheme = (roomId, colorTheme) => ({
    type: 'CHANGE_COLOR_THEME',
    payload: { roomId, colorTheme }
});