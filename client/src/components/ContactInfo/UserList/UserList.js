import React from 'react';

import './UserList.css';

const UserList = ({ users }) => (
    <div>
        {users.map(username => <div key={username}>{username}</div>)}
    </div>
);

export default UserList;