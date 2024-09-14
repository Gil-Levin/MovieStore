import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/authContext';
import UserCard from '../components/userCard';
import '../css/Users.css';

const Users = () => {
  const { users, loading } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    let sortedUsers = [...filtered];
    switch (sortOrder) {
      case 'username-asc':
        sortedUsers.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case 'username-desc':
        sortedUsers.sort((a, b) => b.username.localeCompare(a.username));
        break;
      default:
        break;
    }

    setFilteredUsers(sortedUsers);
  }, [users, searchTerm, sortOrder]);

  const handleEdit = (userId) => {
    window.location.href = `/users/${userId}`;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div className="loading-text">Loading users...</div>;
  }

  return (
    <div>
      <h1 className="users-title">User Management</h1>
      <div className="search-bar">
        <input 
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by username or email..."
        />
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="default">Default View</option>
          <option value="username-asc">Sort by Username (A-Z)</option>
          <option value="username-desc">Sort by Username (Z-A)</option>
        </select>
      </div>
      <div className="users-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.userId}
              user={user}
              onEdit={() => handleEdit(user.userId)}
            />
          ))
        ) : (
          <div className="no-results">No users to display</div>
        )}
      </div>
    </div>
  );
};

export default Users;
