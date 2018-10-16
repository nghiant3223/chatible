import React from 'react';

import './Seen.css';

const Seen = ({ peopleSeen, thisUser, counterpartAvatarUrl }) => {
    return (
        <div className="chatbox__message-container__people-seen">
            {peopleSeen.map(one => one.username !== thisUser.username ? <img key={one.username} src={counterpartAvatarUrl} title={`${one.username} saw at ${one.time}`} /> : null)}
        </div>
    );
}

export default Seen;