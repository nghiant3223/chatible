import React, { Component } from 'react';
import socketGetter from '../../../../socket';
import './SharedEditor.css';

class SharedEditor extends Component {
    state = {
        caretPosition: -1,
        content: ''
    }
    
    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.props.content !== nextProps.content) {
            this.setState({ content: nextProps.content });
        }
    }

    componentDidMount = () => {
        socketGetter.getInstance().on('aUserEdits', data => { 
            if (data.roomId === this.props.roomId) {
                console.log('....', data.content);
                this.setState({ content: data.content });
            }
        });
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.content !== prevState.content) {
            this.setState({ caretPosition: prevState.caretPosition });
        }
        this.sharedEditor.selectionStart = this.state.caretPosition;
    }
    

    sharedEditorChangedHandler = () => {
        console.log('change');
        this.setState({ content: this.sharedEditor.value });
        socketGetter.getInstance().emit('thisUserEdits', { content: this.sharedEditor.value, roomId: this.props.roomId });
    }

    render() {
        return (
            <textarea ref={el => this.sharedEditor = el}
                className="shared-editor"
                onMouseUp={() => this.setState({ caretPosition: this.sharedEditor.selectionStart })}
                onKeyUp={() => this.setState({ caretPosition: this.sharedEditor.selectionStart })}
                value={this.state.content}
                onChange={this.sharedEditorChangedHandler}></textarea>
        );
    }
}

export default SharedEditor;