import axios from 'axios';
import socketGetter from '../socket';

export const fetchUserAndRecentContact = (history) => {
    return dispatch => {
        Promise.all([
            axios.get('/api/user/me', { headers: { 'x-access-token': localStorage.getItem("x-access-token") } }),
            axios.get('/api/room', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } }),
            axios.get('/api/user/')
        ]).then(([meRes, contactRes, allUsersRes]) => {
            socketGetter.getInstance().emit('thisUserGoesOnline', { username: meRes.data.username });
            dispatch(fetchRecentContactSuccess(contactRes.data));
            dispatch(fetchUserSuccess(meRes.data));
            dispatch(setInitialActiveContact(contactRes.data.find(contact => contact.roomId === meRes.data.lastActiveContact) || null));
            dispatch(setAllUsers(allUsersRes.data.map(({ username, fullname, avatarUrl }) => ({username, fullname, avatarUrl}))))
        }).catch(e => {
            console.log(e);
            dispatch(fetchUserFailure());
            dispatch(fetchRecentContactFailure());
            history.replace('/login');
        });
    }
}


export const fetchUserSuccess = (user) => ({
    type: 'FETCH_USER_SUCCESS',
    payload: user
});


export const fetchUserFailure = () => ({
    type: 'FETCH_USER_FAILURE'
});


export const unfetchRecentContact = () => ({
    type: 'UNFETCH_CONTACTS'
});


export const fetchRecentContactSuccess = (user) => ({
    type: 'FETCH_CONTACTS_SUCCESS',
    payload: user
});


export const fetchRecentContactFailure = () => ({
    type: 'FETCH_CONTACTS_FAILURE'
});


export const updateContactStatusOnline = (username, lastLogin) => ({
    type: 'UPDATE_CONTACT_STATUS__ONLINE',
    payload: { username, lastLogin }
});


export const updateContactStatusOffline = (username, lastLogout) => ({
    type: 'UPDATE_CONTACT_STATUS__OFFLINE', 
    payload: { username, lastLogout }
});


export const setInitialActiveContact = (contact) => ({
    type: 'SET_ACTIVE_CONTACT',
    payload: Object.assign({}, contact)
});


export const setActiveContact = (roomId) => {
    axios.post('/api/user/activeroom/' + roomId, {}, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
    return (dispatch, getState) => {
        const { recentContacts } = getState();
        const activeContact = recentContacts.find(contact => contact.roomId === roomId);
        dispatch({ type: 'SET_ACTIVE_CONTACT', payload: Object.assign({}, activeContact) });
    }
}


export const changeColorTheme = (roomId, colorTheme) => ({
    type: 'CHANGE_COLOR_THEME',
    payload: { roomId, colorTheme }
});


export const fetchSharedFiles = (roomId) => {
    return async dispatch => {
        const fileRes = await axios.get('/api/file/' + roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
        dispatch(updateSharedFiles(roomId, fileRes.data));
    }
}

export const updateSharedFiles = (roomId, files) => ({
    type: 'UPDATE_CONTACT_FILE',
    payload: { roomId, files }
});

export const fetchSharedImages = (roomId) => {
    return async dispatch => {
        const imageRes = await axios.get('/api/file/image/' + roomId, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
        dispatch(updateSharedImages(roomId, imageRes.data));
    }
}

export const updateSharedImages = (roomId, images) => ({
    type: 'UPDATE_CONTACT_IMAGE',
    payload: { roomId, images }
});


export const hoistContact = (roomId) => ({
    type: 'HOIST_CONTACT',
    payload: { roomId }
});


export const updateContactLastMessage = (roomId, messageInfo) => {
    return ({
        type: 'UPDATE_CONTACT_LAST_MESSAGE',
        payload: {
            roomId,
            ...messageInfo
        }
    });
};


export const newContact = () => ({
    type: 'NEW_CONTACT'
});

export const createContactAndSetActive = (users, counterpart) => {
    return async dispatch => {
        const roomIdRes = await axios.post('/api/room', { type: users.length == 2 ? 'DUAL' : 'GROUP', users }, { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
        const contactRes = await axios.get('/api/room', { headers: { 'x-access-token': localStorage.getItem('x-access-token') } });
        dispatch(fetchRecentContactSuccess(contactRes.data));

        const roomInfo = contactRes.data.find(contact => contact.roomId === roomIdRes.data);
        dispatch(setActiveContact(roomInfo.roomId));
        console.log('roomInfo', roomInfo);
        socketGetter.getInstance().emit('thisUserCreatesRoom', { users, roomInfo: { ...roomInfo, counterpart, isNew: true } });
        // isNew to make recentContactActive bold.
    }
}

export const addContact = (roomInfo) => ({
    type: 'ADD_CONTACT',
    payload: { roomInfo }
});

export const setAllUsers = (users) => ({
    type: 'SET_ALL_USER',
    payload: users
});