import React from 'react';

import './Seen.css';

const Seen = ({ peopleSeen, thisUser }) => {
    return (
        <div className="chatbox__message-container__people-seen">
            {peopleSeen.map(one => one.username !== thisUser.username ? <img key={one.username} src={'/images/profile_image.png'} title={`${one.username} saw at ${one.time}`} /> : null)}
        </div>
    );
}

export default Seen;