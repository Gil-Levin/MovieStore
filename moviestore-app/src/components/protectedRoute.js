import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/authContext';
import '../css/ProtectedRoute.css';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userType } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        userType?.toLowerCase() === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect to="/unauthorized" />
        )
      }
    />
  );
};

export default ProtectedRoute;
