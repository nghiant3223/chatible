import React from 'react';

import Dropdown from '../../../hocs/ContactInfoDropdown/ContactInfoDropdown';

import './SharedImageList.css';

const SharedImageList = (props) => (
    <Dropdown title="Shared images">
        <div className="contact-info__main__images">
            <div><img src="upload1.jpg" alt="Upload" /></div>
            <div><img src="upload2.jpg" alt="Upload" /></div>
            <div><img src="upload3.jpg" alt="Upload" /></div>
            <div><img src="upload4.jpg" alt="Upload" /></div>
            <div><img src="upload3.jpg" alt="Upload" /></div>
            <div><img src="upload4.jpg" alt="Upload" /></div>
            <div><img src="upload1.jpg" alt="Upload" /></div>
            <div><img src="upload2.jpg" alt="Upload" /></div>
            <div><img src="upload3.jpg" alt="Upload" /></div>
            <div><img src="upload3.jpg" alt="Upload" /></div>
            <div><img src="upload4.jpg" alt="Upload" /></div>
            <div><img src="upload4.jpg" alt="Upload" /></div>
            <div><img src="upload1.jpg" alt="Upload" /></div>
            <div><img src="upload2.jpg" alt="Upload" /></div>
            <div><img src="upload3.jpg" alt="Upload" /></div>
            <div><img src="upload3.jpg" alt="Upload" /></div>
            <div><img src="upload4.jpg" alt="Upload" /></div>
        </div>
    </Dropdown>
);


export default SharedImageList;