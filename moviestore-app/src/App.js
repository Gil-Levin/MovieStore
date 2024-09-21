import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Common
import NavBar from './components/common/NavBar';

// Context
import { MoviesProvider } from './context/MoviesContext';
import { UsersProvider } from './context/UsersContext';
import { OrdersProvider } from './context/OrdersContext';
import { CartItemsProvider } from './context/CartItemsContext';

// Pages
import HomePage from './components/pages/HomePage';
import MoviesPage from './components/pages/MoviesPage';
import MoviePage from './components/pages/MoviePage';
import UserPage from './components/pages/UserPage';
import AboutPage from './components/pages/AboutPage';
import ManagePage from './components/pages/ManagePage';
import ProfilePage from './components/pages/ProfilePage';
import NotFoundPage from './components/pages/NotFoundPage';
import LoginPage from './components/pages/LoginPage';

// unorganized
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <AuthProvider>
      <MoviesProvider>
        <UsersProvider>
          <CartItemsProvider>
            <OrdersProvider>
              <Router>
                <div>
                  <NavBar />
                  <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/movies" exact component={MoviesPage} />
                    <Route path="/movies/:productId" exact component={MoviePage} />
                    <Route path="/about" exact component={AboutPage} />
                    <ProtectedRoute path="/manage" component={ManagePage} />
                    <ProtectedRoute path="/users/:userId" component={UserPage} />
                    <Route path="/profile" exact component={ProfilePage} />
                    <Route path="/login" exact component={LoginPage} />

                    <Route path="/register" component={Register} />
                    <Route path="/unauthorized" component={Unauthorized} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </div>
              </Router>
            </OrdersProvider>
          </CartItemsProvider>
        </UsersProvider>
      </MoviesProvider>
    </AuthProvider>
  );
}

export default App;
