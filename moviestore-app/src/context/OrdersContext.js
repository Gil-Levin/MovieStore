import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get('http://localhost:7178/api/orders');
            const processedOrders = data.map((order) => ({
                ...order,
                isToggleOn: false,
            }));
            setOrders(processedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <OrdersContext.Provider value={{ orders, isLoading, refreshOrders: fetchOrders }}>
            {children}
        </OrdersContext.Provider>
    );
};

export default OrdersContext;
