import React, { Component } from 'react';

import { getOfflineTime } from '../../../utils';

class OfflineTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayTime: getOfflineTime(props.offlineDate)
        }
    }

    componentDidMount = () => {
        this.interval = setInterval(() => {
            this.setState({ displayTime: getOfflineTime(this.props.offlineDate) });
        }, 5000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    render() {
        return <span>{this.state.displayTime}</span>
    }
}

export default OfflineTimer;