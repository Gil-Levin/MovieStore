import React, { useContext, useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import OrdersContext from '../../context/OrdersContext';
import Loading from '../common/Loading';

const UserOrders = () => {
  const { orders, isLoading } = useContext(OrdersContext);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const userId = user.userId;
      const excludedOrderIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, userId];
      const userOrders = orders.filter(
        (order) => order.userId === userId && !excludedOrderIds.includes(order.orderId)
      );
      setFilteredOrders(userOrders);
    }
  }, [orders]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Card >
      <Card.Header>
        <h4>
          <FaShoppingCart /> Your Orders
        </h4>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">No Orders Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default UserOrders;
