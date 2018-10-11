import React, {Component} from 'react';

import './Sticker.css';

class Sticker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bkgrPos: props.positions[0],
            isPlaying: false
        }
    }
    
    stickerHoveredHandler = () => {
        const { positions, interval } = this.props;
        if (!this.state.isPlaying) {
            this.setState({ isPlaying: true });
            for (let i = 0; i < positions.length; i++) {
                ((delay, i) => setTimeout(() => {
                    if (i === positions.length - 1) this.setState({
                        bkgrPos: this.props.positions[i],
                        isPlaying: false
                    });

                    else this.setState({
                        bkgrPos: positions[i]
                    });
                }, delay))(i * interval, i);
            }
        }
 
    }

    render() {
        return (
            <div
                onClick={this.props.onClick}
                onMouseEnter={this.stickerHoveredHandler}
                className={`sticker--${this.props.name}${this.props.small ? '--small' : ''}`}
                style={{ backgroundPosition: `${this.state.bkgrPos[0]}px ${this.state.bkgrPos[1]}px` }}></div>
        );
    }
}

export default Sticker;