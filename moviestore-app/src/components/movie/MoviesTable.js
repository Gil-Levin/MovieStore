import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

import MoviesContext from '../../context/MoviesContext';
import Loading from '../common/Loading';
import { sortItems } from '../../utils/sortItems';
import AddMovie from './AddMovie';

const MoviesTable = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const { movies, isLoading } = useContext(MoviesContext);
    const [showModal, setShowModal] = useState(false);

    const sortMovies = (key) => {
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

    const sortedMovies = sortItems(movies, sortConfig);
    const history = useHistory();

    return (
        <>
            {isLoading ? <Loading /> :
                <Container>
                    <Row className="mb-3 justify-content-center">
                        <Col xs="auto">
                            <Button variant="warning" onClick={() => setShowModal(true)}>
                                Add New Movie
                            </Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th onClick={() => sortMovies('productId')}>
                                    ID {getSortIcon('productId')}
                                </th>
                                <th>Image</th>
                                <th onClick={() => sortMovies('name')}>
                                    Name {getSortIcon('name')}
                                </th>
                                <th onClick={() => sortMovies('category')}>
                                    Category {getSortIcon('category')}
                                </th>
                                <th onClick={() => sortMovies('price')}>
                                    Price {getSortIcon('price')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMovies.map((movie) => (
                                <tr
                                    key={movie.productId}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => history.push(`/movies/${movie.productId}`)}
                                >
                                    <td>{movie.productId}</td>
                                    <td>
                                        <img
                                            src={movie.image}
                                            alt={movie.name}
                                            style={{ width: '20px', height: '30px' }}
                                        />
                                    </td>
                                    <td>{movie.name}</td>
                                    <td>{movie.category}</td>
                                    <td>${movie.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Add Movie Modal */}
                    <AddMovie show={showModal} handleClose={() => setShowModal(false)} />
                </Container>
            }
        </>
    );
};

export default MoviesTable;
