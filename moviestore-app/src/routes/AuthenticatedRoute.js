import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from '../components/common/Loading';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (isLoading) {
                    return <Loading />
                }
                return isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />;
            }}
        />
    );
};

export default AuthenticatedRoute;