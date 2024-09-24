import React, { useContext, useState } from 'react';
import { Table, Container, Button, Alert } from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaSort, FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import CartItemsContext from '../../context/CartItemsContext';
import Loading from '../common/Loading';
import { useCartItemsApi } from '../../services/useCartItemsApi';
import { sortItems } from '../../utils/sortItems';
import QuantityChangeModal from './QuantityChangeModal';
import PurchaseButton from './PurchaseButton';

const CartTable = () => {
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'ascending' });
    const { cartItems, isLoading: cartLoading } = useContext(CartItemsContext);
    const history = useHistory();
    const { deleteItem } = useCartItemsApi();
    const [modalShow, setModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const sortCart = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'ascending' ? 'descending' : 'ascending',
        }));
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <FaSort />;
        return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    };

    const handleDelete = async (itemId) => {
        try {
            await deleteItem(itemId);
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const handleChangeQuantity = (item) => {
        setSelectedItem(item);
        setModalShow(true);
    };

    const sortedCartItems = sortItems(cartItems, sortConfig);

    if (cartLoading) return <Loading />;

    return (
        <Container>
            {sortedCartItems.length === 0 ? (
                <Alert variant="warning" className="text-center">
                    <h3>Your cart is empty!</h3>
                    <Button variant="warning" onClick={() => history.push('/movies')}>
                        Browse Movies
                    </Button>
                </Alert>
            ) : (
                <>
                    <PurchaseButton />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th onClick={() => sortCart('productName')}>
                                    Name {getSortIcon('productName')}
                                </th>
                                <th onClick={() => sortCart('productPrice')}>
                                    Price {getSortIcon('productPrice')}
                                </th>
                                <th onClick={() => sortCart('quantity')}>
                                    Quantity {getSortIcon('quantity')}
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedCartItems.map((item) => (
                                <tr key={item.itemID}>
                                    <td>
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            style={{ width: '50px', height: '75px' }}
                                        />
                                    </td>
                                    <td>{item.productName}</td>
                                        <td>
                                            {item.quantity > 1 
                                                ? `$${(item.productPrice * item.quantity).toFixed(2)} ($${item.productPrice.toFixed(2)})`
                                                : `$${item.productPrice.toFixed(2)}`
                                            }
                                        </td>
                                    <td>
                                        <Button variant="secondary" onClick={() => handleChangeQuantity(item)}>
                                            {item.quantity} <FaEdit style={{ marginLeft: '8px' }} />
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => history.push(`/movies/${item.productID}`)}
                                        >
                                            <FaEye style={{ marginRight: '5px' }} /> View
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(item.itemID)}
                                        >
                                            <FaTrash style={{ marginRight: '5px' }} /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
            <QuantityChangeModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                cartItem={selectedItem}
            />
        </Container>
    );
};

export default CartTable;
