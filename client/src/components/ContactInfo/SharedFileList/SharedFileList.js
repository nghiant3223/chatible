import React from 'react';

import Dropdown from '../../../hocs/ContactInfoDropdown/ContactInfoDropdown';

import './SharedFileList.css';

const SharedFileList = (props) => (
    <Dropdown title="Shared files">
        <ul className="contact-info__main__files">
            <li>
                <i></i>
                <a>1612212.zip</a>
            </li>
        </ul>
    </Dropdown>
);


export default SharedFileList;