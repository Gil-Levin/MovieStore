import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Common
import NavBar from './components/common/NavBar';

// Context
import { MoviesProvider } from './context/MoviesContext';
import { UsersProvider } from './context/UsersContext';
import { OrdersProvider } from './context/OrdersContext';

// Pages
import HomePage from './components/pages/HomePage';
import MoviesPage from './components/pages/MoviesPage';
import MoviePage from './components/pages/MoviePage';
import AboutPage from './components/pages/AboutPage';
import ManagePage from './components/pages/ManagePage';

// unorganized
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import UserEdit from './pages/UserEdit';
import ProductEdit from './pages/ProductEdit';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <AuthProvider>
      <MoviesProvider>
        <UsersProvider>
          <OrdersProvider>
            <Router>
              <div>
                <NavBar />
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/movies" exact component={MoviesPage} />
                  <Route path="/movies/:productId" exact component={MoviePage} />
                  <Route path="/about" exact component={AboutPage} />
                  <ProtectedRoute path="/manage" exact component={ManagePage} />

                  <ProtectedRoute path="/users/:id" component={UserEdit} />

                  <Route path="/login" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path="/profile" component={Profile} />
                  <ProtectedRoute path="/edit" exact component={Edit} />
                  <ProtectedRoute path="/edit/:id" component={ProductEdit} />
                  <Route path="/unauthorized" component={Unauthorized} />
                  <Route path="/cart" component={Cart} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Router>
          </OrdersProvider>
        </UsersProvider>
      </MoviesProvider>
    </AuthProvider>
  );
}

export default App;
