import React from 'react';

import './Emoji.css';

const emoji = (props) => {
    let className = `em em--${props.code}` + (props.small ? " em--small" : "");
    return <i className={className} onClick={props.onClick} style={props.style}></i>;
}

export default emoji;