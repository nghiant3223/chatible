import React from 'react';
import Modal from 'react-modal';

import './StandardModal.css';

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

const StandardModal = ({ isOpen, onRequestClose, children }) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles} >
        {children}
    </Modal>
);

export default StandardModal;