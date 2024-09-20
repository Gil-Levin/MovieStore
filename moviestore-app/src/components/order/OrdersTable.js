import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

import OrdersContext from '../../context/OrdersContext';
import Loading from '../common/Loading';
import { sortItems } from '../../utils/sortItems'; // You can reuse your sortItems function

const OrdersTable = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const { orders, isLoading } = useContext(OrdersContext);

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

    const sortedOrders = sortItems(orders, sortConfig);

    const history = useHistory();

    return (
        <>
            {isLoading ? <Loading /> :
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
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map((order) => (
                            <tr key={order.orderId}
                            style={{ cursor: 'pointer' }}
                            onClick={() => history.push(`/orders/${order.orderId}`)}
                            >
                                <td>{order.orderId}</td>
                                <td>{order.userId}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </>
    );
};

export default OrdersTable;
