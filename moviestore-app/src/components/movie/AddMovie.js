import movieImagePlaceholder from '../../images/movie-placeholder.jpeg';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useMoviesApi } from '../../services/useMoviesApi';
import { compressImage } from '../../utils/compressImage';

const AddMovie = ({ show, handleClose }) => {
    const { addMovie } = useMoviesApi();
    const [movieDetails, setMovieDetails] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        image: movieImagePlaceholder,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const compressedImage = await compressImage(400, 600, file);
            setMovieDetails((prev) => ({ ...prev, image: compressedImage }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addMovie(movieDetails);
            handleClose();
            console.log('Movie added successfully');
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={movieDetails.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={movieDetails.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={movieDetails.category}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={movieDetails.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        <img
                            src={movieDetails.image}
                            alt="Movie Preview"
                            style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Movie
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddMovie;
