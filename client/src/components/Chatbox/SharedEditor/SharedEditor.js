import React, { Component, Fragment } from 'react';

import socketGetter from '../../../socket';

import './SharedEditor.css';

class SharedEditor extends Component {
    state = {
        content: '',
        isVisible: false
    }
    
    componentWillReceiveProps = (nextProps, nextState) => {
        if (this.props.content !== nextProps.content) {
            this.setState({ content: nextProps.content });
        }
    }

    componentDidMount = () => {
        socketGetter.getInstance().on('aUserEdits', data => { 
            if (data.roomId === this.props.roomId) {
                this.setState({ content: data.content, from: 'that' });
            }
        });
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.content !== prevState.content && this.state.from !== 'this') {
            this.sharedEditor.selectionStart = this.state.content ? this.state.content.length : 0;
        }
    }
    

    sharedEditorChangedHandler = (e) => {
        socketGetter.getInstance().emit('thisUserEdits', { content: e.target.value, roomId: this.props.roomId });
        this.setState({ content: e.target.value, from: 'this' });
    }

    render() {
        return (
            <Fragment>
<<<<<<< HEAD
                <div className="share-editor--toggle" onClick={() => this.setState(prevState => ({ isVisible: !prevState.isVisible }))}></div>
                
                <textarea ref={el => this.sharedEditor = el}
                    style={this.state.isVisible ? { width: '100%', height: '25%', minHeight: '15px' } : { width: '15px', height: '15px' }}
                    className={`shared-editor shared-editor--${this.state.isVisible ? 'open' : 'close'}`}
                    onChange={this.sharedEditorChangedHandler}
                    value={this.state.content}
                    onChange={this.sharedEditorChangedHandler}></textarea>
=======
                <div className="share-editor--toggle" onClick={() => this.setState(prevState => ({isVisible: !prevState.isVisible}))}></div>
                
                <textarea ref={el => this.sharedEditor = el}
                    style={this.state.isVisible ? {width: '100%', height: '25%', minHeight: '15px'} : {width: '15px', height: '15px'}}
                    className={`shared-editor shared-editor--${this.state.isVisible ? 'open' : 'close'}` }
                onChange={this.sharedEditorChangedHandler}
                value={this.state.content}
                onChange={this.sharedEditorChangedHandler}></textarea>
>>>>>>> 5f848efce32a6a6f225fffe20140554cc45a699a
            </Fragment>
        );
    }
}

export default SharedEditor;