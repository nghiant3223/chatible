import React from 'react';
import Modal from 'react-modal';

import { colorThemes } from '../../../configs';

import './ColorThemeModal.css';

const ColorThemeModal = (props) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            zIndex: 2000,
            padding: '15px 20px',
            transform: 'translate(-50%,-50%)'
        },
        overlay: {
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.15)'
        }
    };

    return (
        <Modal
            isOpen={props.modalOpen}
            onRequestClose={props.onCancel}
            style={customStyles} >
            <div className="color-theme-modal">
                <div>Choose color theme</div>
                <div className="color-theme-modal__options">
                    {colorThemes.map((colorTheme, i) => {
                        return (
                            <div className={"color-theme-modal__option" + (colorTheme === props.colorThemeOption ? " color-theme-modal__option--selected" : "")}
                                style={{ background: colorTheme }}
                                onClick={() => props.colorThemeClickedHandler(i)} />
                        );
                    })}
                </div>
                <div className="color-theme-modal__actions">
                    <button onClick={props.onCancel}>Cancel</button>
                    <button onClick={props.onSubmit}>Change</button>
                </div>
            </div>
        </Modal>
    );
}

export default ColorThemeModal;