import React from 'react';

import Dropdown from '../../../hocs/ContactInfoDropdown/ContactInfoDropdown';

import './SharedFileList.css';

const SharedFileList = ({ files }) => (
    <Dropdown title="Shared files">
        <ul className="contact-info__main__files">

            {files.map(file => (
                <li key={file._id}>
                    <i></i>
                    <a href={"/uploads/" + file.hashedName} download>{file.originalName}</a>
                </li>
            ))}
        </ul>
    </Dropdown>
);


export default SharedFileList;