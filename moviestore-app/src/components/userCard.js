import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/UserCard.css';

const UserCard = ({ user }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/users/${user.userId}`);
  };

  return (
    <div className="user-card">
      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt={user.username} 
        />
      )}
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <button onClick={handleClick}>View</button>
    </div>
  );
};

export default UserCard;
