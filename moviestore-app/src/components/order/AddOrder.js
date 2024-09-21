import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useOrdersApi } from '../../services/useOrdersApi';

const AddOrder = ({ show, handleClose }) => {
    const { addOrder } = useOrdersApi();
    const [orderDetails, setOrderDetails] = useState({
        userId: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderToSubmit = {
                ...orderDetails,
                orderDate: new Date(), // Automatically set the current date
            };
            await addOrder(orderToSubmit);
            handleClose();
            console.log('Order added successfully');
        } catch (error) {
            console.error('Error adding order:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUserId">
                        <Form.Label>User ID</Form.Label>
                        <Form.Control
                            type="number"
                            name="userId"
                            value={orderDetails.userId}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Order
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddOrder;
