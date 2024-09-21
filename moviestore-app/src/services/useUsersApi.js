import axios from 'axios';
import { useContext } from 'react';
import UsersContext from '../context/UsersContext';

const API_URL = 'http://localhost:7178/api/users';
const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export const useUsersApi = () => {
  const { refreshUsers } = useContext(UsersContext);

  const updateUser = async (user) => {
    try {
      await axios.put(`${API_URL}/${user.userId}`, user, { headers: headers() });
      refreshUsers();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/${userId}`, { headers: headers() });
      refreshUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const addUser = async (user) => {
    try {
      await axios.post(API_URL, user, { headers: headers() });
      refreshUsers();
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return {
    updateUser,
    deleteUser,
    addUser,
  };
};
