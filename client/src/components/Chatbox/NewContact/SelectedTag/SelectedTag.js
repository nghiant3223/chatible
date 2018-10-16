import React from 'react';

import './SelectedTag.css';

const SelectedTag = ({ username, onClick }) => (
    <div className="new-contact__box__selected-tag">
        <div className="new-contact__box__selected-tag__name">{username}</div>
        <div className="new-contact__box__selected-tag__remove" onClick={onClick}></div>
    </div>
);

export default SelectedTag;