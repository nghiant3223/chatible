import React from 'react';

import { connect } from 'react-redux';

import './Seen.css';

const seen = ({ peopleSeen, thisUser, counterpartAvatarUrl, allUsers }) => {
    return (
        <div className="chatbox__message-container__people-seen">
            {peopleSeen.map(one => one.username !== thisUser.username ? <img key={one.username} src={allUsers.find(user => user.username === one.username).avatarUrl} title={`${one.username} saw at ${one.time}`} /> : null)}
        </div>
    );
}

const mapStateToProps = ({ allUsers }) => ({ allUsers });

export default connect(mapStateToProps)(seen);