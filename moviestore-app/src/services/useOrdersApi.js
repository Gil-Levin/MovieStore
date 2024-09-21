import axios from 'axios';
import { useContext } from 'react';
import OrdersContext from '../context/OrdersContext';

const API_URL = 'http://localhost:7178/api/orders';
const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const useOrdersApi = () => {
  const { refreshOrders } = useContext(OrdersContext);

  const updateOrder = async (order) => {
    try {
      await axios.put(`${API_URL}/${order.orderId}`, order, { headers: headers() });
      refreshOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/${orderId}`, { headers: headers() });
      refreshOrders();
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const addOrder = async (order) => {
    try {
      await axios.post(API_URL, order, { headers: headers() });
      refreshOrders();
    } catch (error) {
      console.error('Failed to add order:', error);
    }
  };

  return {
    updateOrder,
    deleteOrder,
    addOrder,
  };
};