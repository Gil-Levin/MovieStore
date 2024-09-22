import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useCartItemsApi } from '../../services/useCartItemsApi';

const QuantityChangeModal = ({ show, onHide, cartItem }) => {
  const [quantity, setQuantity] = useState(1);
  const { updateItem } = useCartItemsApi();

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const handleSave = async () => {
    if (cartItem) {
      const updatedItem = {
        itemID: cartItem.itemID,
        cartId: cartItem.cartId,
        productID: cartItem.productID,
        quantity: quantity,
      };
      await updateItem(updatedItem);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Change Quantity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuantityChangeModal;
