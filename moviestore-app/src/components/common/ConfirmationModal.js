import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ConfirmationModal = ({ show, setShow, handleConfirm, title, bodyText }) => {
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyText}</Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button variant="warning" onClick={handleConfirm}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
