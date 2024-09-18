import { Row, Col, Container, Form, Pagination } from 'react-bootstrap';
import React, { useContext, useState } from 'react';

// Components
import MoviesContext from '../../context/MoviesContext';
import MovieCard from '../../components/movie/MovieCard';
import Loading from '../common/Loading';

// Style
import './movies-page.css';

const MoviesPage = () => {
    const { movies, isLoading } = useContext(MoviesContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    
    if (isLoading) {
        document.title = "Movie Store - Loading...";
        return <Loading />;
    }

    document.title = "Movie Store - Discover";

    // Filter movies based on search query
    const filteredMovies = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort movies based on selected order
    const sortedMovies = filteredMovies.sort((a, b) => {
        if (sortOrder === 'priceLowToHigh') {
            return a.price - b.price;
        } else if (sortOrder === 'priceHighToLow') {
            return b.price - a.price;
        } else if (sortOrder === 'nameAsc') {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === 'nameDesc') {
            return b.name.localeCompare(a.name);
        }
        return 0; // Default order (no sorting)
    });

    // Paginate movies
    const totalPages = Math.ceil(sortedMovies.length / itemsPerPage);
    const currentMovies = sortedMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container fluid>
            {/* Search Section */}
            <Row className="justify-content-center">
                <Col className="search-section text-center py-5 bg-warning m-4 rounded">
                    <h1 className="display-4">Search for any movies!</h1>
                    <hr />
                    <Row className="justify-content-center">
                        <Col xs={12} sm={8} md={8} lg={9} xl={10}>
                            <Form.Control
                                type="text"
                                placeholder="Search by name, category, or description"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </Col>
                        <Col xs={12} sm={4} md={4} lg={3} xl={2}>
                            <Form.Control
                                as="select"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="default">No Sorting</option>
                                <option value="priceLowToHigh">Price: Low to High</option>
                                <option value="priceHighToLow">Price: High to Low</option>
                                <option value="nameAsc">Name: A to Z</option>
                                <option value="nameDesc">Name: Z to A</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Movie Cards Section */}
            <Row className="justify-content-center">
                {currentMovies.length > 0 ? (
                    currentMovies.map((movie, index) => (
                        <Col
                            key={index}
                            xs={6} sm={6} md={4} lg={3} xl={2}
                            className="d-flex justify-content-center mb-4"
                        >
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                ) : (
                    <Col xs={12} className="text-center">
                        <h2>Sorry, Couldn't find any movies to show.</h2>
                    </Col>
                )}
            </Row>

            {/* Pagination Controls */}
            <Row className="justify-content-center">
                <Col xs={12} className="text-center my-4">
                    <Pagination className="pagination-warning">
                        <Pagination.Prev
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        />
                        {[...Array(totalPages).keys()].map(pageNumber => (
                            <Pagination.Item
                                key={pageNumber + 1}
                                active={pageNumber + 1 === currentPage}
                                onClick={() => handlePageChange(pageNumber + 1)}
                            >
                                {pageNumber + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        />
                    </Pagination>

                </Col>
            </Row>
        </Container>
    );
};

export default MoviesPage;
