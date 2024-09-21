import React from 'react';
import { Button, Form } from 'react-bootstrap';

const EditMovieForm = ({ editedMovie, handleInputChange, handleImageChange, handleSave, handleCancel }) => {
    return (
        <>
            <Form>
                <Form.Group controlId="formMovieName">
                    <Form.Label>Movie Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={editedMovie.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMovieCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={editedMovie.category}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMoviePrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={editedMovie.price}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMovieDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={editedMovie.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formMovieImage">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>
            </Form>
            <Button variant="warning" className="me-2" onClick={handleSave}>
                Save
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
                Cancel
            </Button>
        </>
    );
};

export default EditMovieForm;