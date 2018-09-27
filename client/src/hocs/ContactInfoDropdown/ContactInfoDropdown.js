import React, { Component } from 'react';

import './ContactInfoDropdown.css';

class ContactInfoDropdown extends Component {
    state = {
        childrenVisible: true
    }

    titleClickedHandler = () => {
        this.setState(prevState => ({childrenVisible: !prevState.childrenVisible}));
    }

    render() {
        let className = "contact-info__dropdown";
        return (
            <div className={className}>
                <div className="contact-info__dropdown__title" onClick={this.titleClickedHandler}>
                    <a>{this.props.title}</a>
                    <div className="contact-info__dropdown__title__indicator" style={{transform: this.state.childrenVisible ? "rotate(0deg)" : "rotate(90deg)"}}></div>
                </div>
                {this.state.childrenVisible && this.props.children}
            </div>
        );
    }
}

export default ContactInfoDropdown;