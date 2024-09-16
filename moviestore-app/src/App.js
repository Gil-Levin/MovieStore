import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import Users from './pages/Users';
import UserEdit from './pages/UserEdit';
import ProductEdit from './pages/ProductEdit';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import MoviePage from './pages/MoviePage';
import { MoviesProvider } from './context/MoviesContext';
import { AuthProvider } from './context/authContext';
import Navbar from './components/navbar';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <AuthProvider>
      <MoviesProvider>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/movies/:productId" component={MoviePage} />
              <Route path="/about" component={About} />
              <Route path="/search" component={Search} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <ProtectedRoute path="/edit" exact component={Edit} />
              <ProtectedRoute path="/edit/:id" component={ProductEdit} />
              <ProtectedRoute path="/users" exact component={Users} />
              <ProtectedRoute path="/users/:id" component={UserEdit} />
              <Route path="/unauthorized" component={Unauthorized} />
              <Route path="/cart" component={Cart} />
              <Route component={NotFound} /> 
            </Switch>
          </div>
        </Router>
      </MoviesProvider>
    </AuthProvider>
  );
}

export default App;
