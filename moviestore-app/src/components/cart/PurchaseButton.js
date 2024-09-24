import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import axios from 'axios';
import CartItemsContext from '../../context/CartItemsContext';
import OrdersContext from '../../context/OrdersContext';

const PurchaseButton = () => {
    const [showModal, setShowModal] = useState(false);
    const { setCartItems } = useContext(CartItemsContext);
    const { refreshOrders } = useContext(OrdersContext);

    const handlePurchase = async () => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            console.error("User not found");
            return;
        }

        const userId = JSON.parse(storedUser).userId;

        try {
            const response = await axios.post(`http://localhost:7178/api/Orders?cartId=${userId}`, {});
            console.log("Order placed:", response.data);
            setShowModal(false);
            setCartItems([]);
            refreshOrders();
        } catch (error) {
            console.error("Failed to place order:", error);
        }
    };

    return (
        <>
            <Button variant="primary" className="mt-3" onClick={() => setShowModal(true)}>
                <AiOutlineShoppingCart className="me-2" /> Purchase
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to purchase all items in the cart?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handlePurchase}>
                        Purchase
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PurchaseButton;