import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Loading from '../components/common/Loading';

const AuthorizedRoute = ({ component: Component, ...rest }) => {
    const { isAuthorized, isLoading } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                if (isLoading) {
                    return <Loading />
                }
                return isAuthorized ? <Component {...props} /> : <Redirect to="/unauthorized" />;
            }}
        />
    );
};

export default AuthorizedRoute;