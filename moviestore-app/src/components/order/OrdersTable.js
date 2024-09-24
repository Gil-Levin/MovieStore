import React, { useState, useContext } from 'react';
import { Button, Container, Table, } from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

import OrdersContext from '../../context/OrdersContext';
import Loading from '../common/Loading';
import { sortItems } from '../../utils/sortItems';
import { useOrdersApi } from '../../services/useOrdersApi';

const OrdersTable = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const { orders, isLoading } = useContext(OrdersContext);
    const { deleteOrder } = useOrdersApi();

    const sortOrders = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return <FaSort />;
        }
        return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    };

    const handleDelete = async (orderId) => {
        try {
            await deleteOrder(orderId);
            // Optionally refresh the orders list or handle state updates here
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const sortedOrders = sortItems(orders, sortConfig);

    return (
        <>
            {isLoading ? <Loading /> :
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th onClick={() => sortOrders('orderId')}>
                                    Order ID {getSortIcon('orderId')}
                                </th>
                                <th onClick={() => sortOrders('userId')}>
                                    User ID {getSortIcon('userId')}
                                </th>
                                <th onClick={() => sortOrders('orderDate')}>
                                    Order Date {getSortIcon('orderDate')}
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedOrders.map((order) => (
                                <tr
                                    key={order.orderId}
                                >
                                    <td>{order.orderId}</td>
                                    <td>{order.userId}</td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(order.orderId)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            }
        </>
    );
};

export default OrdersTable;