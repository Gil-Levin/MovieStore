import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// React Bootstrap imports
import { Container, Row, Col, Image, Button, Alert, Form } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';

// Internal imports
import UsersContext from '../../context/UsersContext';
import { useUsersApi } from '../../services/useUsersApi';
import Loading from '../common/Loading';
import ConfirmationModal from '../common/ConfirmationModal';
import { compressImage } from '../../utils/compressImage';

// CSS import
import './user-page.css';

const UserPage = () => {
    const history = useHistory();
    const { userId } = useParams();
    const { users, isLoading, refreshUsers } = useContext(UsersContext);
    const { updateUser, deleteUser } = useUsersApi();
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(null);
    const [editedUser, setEditedUser] = useState({
        userId: '',
        username: '',
        email: '',
        profilePicture: '',
        userType: ''
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const selectedUser = users.find(u => u.userId === parseInt(userId));
        if (selectedUser) {
            setUser(selectedUser);
            setEditedUser({
                userId: selectedUser.userId,
                username: selectedUser.username,
                email: selectedUser.email,
                profilePicture: selectedUser.profilePicture,
                userType: selectedUser.userType
            });
            setImagePreview(selectedUser.profilePicture);
        }
    }, [users, userId]);

    if (isLoading) {
        document.title = "Movie Store - Loading...";
        return <Loading />;
    }

    if (!user) {
        document.title = "Movie Store - User not found!";
        return (
            <Container className="user-page">
                <Alert variant="danger">User not found!</Alert>
            </Container>
        );
    }

    const { username, email, userType } = user;
    document.title = `Movie Store - ${username}`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            compressImage(400, 400, file)
                .then((compressedImage) => {
                    setImagePreview(compressedImage);
                    setEditedUser({ ...editedUser, profilePicture: compressedImage });
                })
                .catch((error) => {
                    console.error('Error compressing image:', error);
                });
        }
    };

    const handleSave = async () => {
        try {
            const userToUpdate = {
                ...editedUser,
                password: editedUser.password || user.password
            };
            await updateUser(userToUpdate);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating the user:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser({
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            userType: user.userType
        });
        setImagePreview(user.profilePicture);
    };

    const handleDelete = async () => {
        try {
            await deleteUser(user.userId);
            history.goBack();
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setShowModal(false);
        }
    };

    return (
        <Container className="user-page">
            <Row className='py-4 user-page-row'>
                <Col xs={12} sm={12} md={7} lg={6} xl={5} xxl={4}>
                    <Image src={imagePreview || user.profilePicture} alt={username} fluid className="user-page-img" />
                </Col>
                <Col xs={12} sm={12} md={5} lg={6} xl={7} xxl={8}>
                    {isEditing ? (
                        <>
                            <Form>
                                <Form.Group controlId="formUserName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={editedUser.username}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formUserEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={editedUser.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formUserType">
                                    <Form.Label>User Type</Form.Label>
                                    <Form.Select
                                        name="userType"
                                        value={editedUser.userType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Customer">Customer</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="formUserImage">
                                    <Form.Label>Upload Profile Picture</Form.Label>
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
                    ) : (
                        <>
                            <hr />
                            <h2>{username}</h2>
                            <hr />
                            <h5 className="text-muted">{email}</h5>
                            <p><strong>User Type: </strong>{userType}</p>
                            <hr />
                            <div className="button-group">
                                <Button variant="primary" className="me-2" onClick={() => setIsEditing(true)}>
                                <FaEdit className="me-1" /> Edit
                                </Button>
                                <Button variant="danger" onClick={() => setShowModal(true)}><FaTrashAlt className="me-1" /> Delete</Button>
                                <Button variant="secondary" onClick={() => history.goBack()} className="float-end">
                                    <FaArrowLeft className="me-1" /> Back
                                </Button>
                                <ConfirmationModal
                                    show={showModal}
                                    setShow={setShowModal}
                                    handleConfirm={handleDelete}
                                    title="Deleting a User"
                                    bodyText={`Are you sure you want to delete ${username} from the database?`}
                                />
                            </div>
                            <div>
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default UserPage;