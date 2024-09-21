import userImagePlaceholder from '../../assets/images/user-placeholder.jpeg';
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useUsersApi } from '../../services/useUsersApi';
import { compressImage } from '../../utils/compressImage';

const AddUser = ({ show, handleClose }) => {
    const { addUser } = useUsersApi(); // Function to handle adding a new user
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: '',
        email: '',
        profilePicture: userImagePlaceholder,
        userType: 'Customer', // Defaulting to 'Customer'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const compressedImage = await compressImage(400, 400, file);
            setUserDetails((prev) => ({ ...prev, profilePicture: compressedImage }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(userDetails); // Send the user details to the API
            handleClose(); // Close the modal upon success
            console.log('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={userDetails.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formUserType">
                        <Form.Label>User Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="userType"
                            value={userDetails.userType}
                            onChange={handleChange}
                            required
                        >
                            <option value="Customer">Customer</option>
                            <option value="Admin">Admin</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formProfilePicture">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <img
                            src={userDetails.profilePicture}
                            alt="Profile Preview"
                            style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add User
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddUser;
