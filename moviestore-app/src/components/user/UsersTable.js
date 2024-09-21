import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Table, Row, Col } from 'react-bootstrap';
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

import UsersContext from '../../context/UsersContext';
import Loading from '../common/Loading';
import { sortItems } from '../../utils/sortItems';
import AddUser from './AddUser';

const UsersTable = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const { users, isLoading } = useContext(UsersContext);
    const [showModal, setShowModal] = useState(false);

    const sortUsers = (key) => {
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

    const sortedUsers = sortItems(users, sortConfig);
    const history = useHistory();

    return (
        <>
            {isLoading ? <Loading /> :
                <Container>
                    <Row className="mb-3 justify-content-center">
                        <Col xs="auto">
                            <Button variant="warning" onClick={() => setShowModal(true)}>
                                Add New User
                            </Button>
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th onClick={() => sortUsers('userId')}>
                                    User ID {getSortIcon('userId')}
                                </th>
                                <th>Profile Picture</th>
                                <th onClick={() => sortUsers('username')}>
                                    Username {getSortIcon('username')}
                                </th>
                                <th onClick={() => sortUsers('email')}>
                                    Email {getSortIcon('email')}
                                </th>
                                <th onClick={() => sortUsers('userType')}>
                                    User Type {getSortIcon('userType')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedUsers.map((user) => (
                                <tr
                                    key={user.userId}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => history.push(`/users/${user.userId}`)}
                                >
                                    <td>{user.userId}</td>
                                    <td>
                                        <img
                                            src={user.profilePicture}
                                            alt={user.username}
                                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                        />
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.userType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Add User Modal */}
                    <AddUser show={showModal} handleClose={() => setShowModal(false)} />
                </Container>
            }
        </>
    );
};

export default UsersTable;
