import React, { Component, Fragment } from 'react';

import './ThumbUp.css';

class ThumbUp extends Component {
    render() {
        return (
            <Fragment>
                <div className="message-thumbup">
                   <svg aria-labelledby="js_ge" height="100%" role="img" version="1.1" viewBox="0 0 256 256" width="100%" x="0px" y="0px"><title id="js_ge">Thumbs Up Sign</title><g><g><polyline fill="transparent" points="256,0 258,256 2,258 "></polyline><path d="M254,147.1c0-12.7-4.4-16.4-9-20.1c2.6-4.2,5.1-10.2,5.1-18c0-15.8-12.3-25.7-32-25.7h-52c-0.5,0-1-0.5-0.9-1 c1.4-8.6,3-24,3-31.7c0-16.7-4-37.5-19.3-45.7c-4.5-2.4-8.3-3.7-14.1-3.7c-8.8,0-14.6,3.6-16.7,5.9c-1.3,1.4-1.9,3.3-1.8,5.2 l1.3,34.6c0.2,2.8-0.3,5.4-1.6,7.7l-24,47.8c-1.7,3.5-4.2,6.6-7.6,8.5c-3.5,2-6.5,5.9-6.5,9.5v94.8C78,230,94,238,112.3,238h86.1 c13.5,0,22.4-4.5,27.2-13.5c4.4-8.2,3.2-15.8,1.4-21.5c7.4-2.3,14.8-8,16.9-18.3c1.3-6.6-0.7-12.1-2.9-16.2 C247.5,165,254,159.8,254,147.1z" fill={this.props.fillColor} stroke="transparent" strokeLinecap="round" strokeWidth="5%"></path><path fill={this.props.fillColor} d="M56.2,100H13.8C7.3,100,2,105.3,2,111.8v128.5c0,6.5,5.3,11.8,11.8,11.8h42.4c6.5,0,11.8-5.3,11.8-11.8V111.8 C68,105.3,62.7,100,56.2,100z"></path></g></g></svg>
                </div>
            </Fragment>
        );
    }
}

export default ThumbUp;