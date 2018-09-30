import React from 'react';

import Dropdown from '../../../hocs/ContactInfoDropdown/ContactInfoDropdown';

import './OptionList.css';

const OptionList = (props) => (
    <Dropdown title="Options">
        <ul className="contact-info__main__options">
            <li onClick={props.changeColorThemeClickedHandler}>
                <div>
                    <svg viewBox="-1 -1 47 47">
                        <title>colors@2x</title>
                        <path d="M912,1569a3,3,0,1,1-3,3A3,3,0,0,1,912,1569Z" fill={props.colorTheme}
                            transform="translate(-895.5 -1561.5)"></path>
                        <path d="M924,1569a3,3,0,1,1-3,3A3,3,0,0,1,924,1569Z" fill={props.colorTheme}
                            transform="translate(-895.5 -1561.5)"></path>
                        <path d="M931,1579a3,3,0,1,1-3,3A3,3,0,0,1,931,1579Z" fill={props.colorTheme}
                            transform="translate(-895.5 -1561.5)"></path>
                        <path d="M905,1579a3,3,0,1,1-3,3A3,3,0,0,1,905,1579Z" fill={props.colorTheme}
                            transform="translate(-895.5 -1561.5)"></path>
                        <path d="M918,1562a22,22,0,0,0,0,44,3.67,3.67,0,0,0,2.71-6.14,3.65,3.65,0,0,1,2.74-6.09h4.33A12.23,12.23,0,0,0,940,1581.56C940,1570.75,930.15,1562,918,1562Z"
                            fill="transparent" stroke={props.colorTheme} strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth="4%" transform="translate(-895.5 -1561.5)"></path>
                    </svg>
                </div>
                <a> Change color theme </a>
            </li>
        </ul>
    </Dropdown>
);


export default OptionList;