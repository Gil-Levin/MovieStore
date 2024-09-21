import React, { useContext } from 'react';
import { Table, Container, Button, Alert } from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import CartItemsContext from '../../context/CartItemsContext';
import MoviesContext from '../../context/MoviesContext';
import Loading from '../common/Loading';
import { sortItems } from '../../utils/sortItems';

const CartTable = () => {
    const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'ascending' });
    const { cartItems, isLoading: cartLoading } = useContext(CartItemsContext);
    const { movies, isLoading: moviesLoading } = useContext(MoviesContext);
    const history = useHistory();

    const sortCart = (key) => {
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

    const sortedCartItems = sortItems(cartItems, sortConfig);
    const matchingMovies = sortedCartItems.map(cartItem => ({
        ...cartItem,
        movie: movies.find(movie => movie.productId === cartItem.productId)
    }));

    const validItems = matchingMovies.filter(item => item.movie); // Filter only valid items

    if (cartLoading || moviesLoading) {
        return <Loading />;
    }

    return (
        <Container>
            {validItems.length === 0 ? (
                <Alert variant="warning" className="text-center">
                    <h3>There are no items in your cart!</h3>
                    <Button variant="warning" onClick={() => history.push('/movies')}>
                        Browse Movies
                    </Button>
                </Alert>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th onClick={() => sortCart('name')}>
                                Name {getSortIcon('name')}
                            </th>
                            <th onClick={() => sortCart('price')}>
                                Price {getSortIcon('price')}
                            </th>
                            <th onClick={() => sortCart('quantity')}>
                                Quantity {getSortIcon('quantity')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {validItems.map((item) => (
                            <tr key={item.productId}>
                                <td>
                                    <img
                                        src={item.movie?.image}
                                        alt={item.movie?.name}
                                        style={{ width: '20px', height: '30px' }}
                                    />
                                </td>
                                <td>{item.movie?.name}</td>
                                <td>${item.movie?.price}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default CartTable;
