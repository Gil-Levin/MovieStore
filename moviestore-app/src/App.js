import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';
import { UsersProvider } from './context/UsersContext';
import { CartItemsProvider } from './context/CartItemsContext';
import { MoviesProvider } from './context/MoviesContext';
import { OrdersProvider } from './context/OrdersContext';

// Common
import NavBar from './components/common/NavBar';

// Routes
import AuthenticatedRoute from './routes/AuthenticatedRoute';
import AuthorizedRoute from './routes/AuthorizedRoute';

// Pages
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import AboutPage from './components/pages/AboutPage';
import NotFoundPage from './components/pages/NotFoundPage';
import ProfilePage from './components/pages/ProfilePage';
import MoviesPage from './components/pages/MoviesPage';
import MoviePage from './components/pages/MoviePage';
import ManagePage from './components/pages/ManagePage';
import UserPage from './components/pages/UserPage';

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <CartItemsProvider>
          <MoviesProvider>
            <OrdersProvider>
              <Router>
                <NavBar />
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/login" exact component={LoginPage} />
                  <Route path="/about" exact component={AboutPage} />

                  <AuthenticatedRoute path="/movies" exact component={MoviesPage} />
                  <AuthenticatedRoute path="/movies/:productId" exact component={MoviePage} />
                  <AuthenticatedRoute path="/profile" exact component={ProfilePage} />

                  <AuthorizedRoute path="/manage" component={ManagePage} />
                  <AuthorizedRoute path="/users/:userId" component={UserPage} />

                  <Route component={NotFoundPage} />
                </Switch>
              </Router>
            </OrdersProvider>
          </MoviesProvider>
        </CartItemsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
