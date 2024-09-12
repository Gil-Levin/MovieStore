import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Profile from './pages/Profile'; 
import Edit from './pages/Edit';
import ProductEdit from './pages/ProductEdit';
import { MoviesProvider } from './context/MoviesContext';
import { AuthProvider } from './context/authContext';
import Navbar from './components/navbar';

function App() {
  return (
    <AuthProvider>
      <MoviesProvider>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/search" component={Search} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/profile" component={Profile} />
              <Route path="/edit" exact component={Edit} /> 
              <Route path="/edit/:id" component={ProductEdit} />
            </Switch>
          </div>
        </Router>
      </MoviesProvider>
    </AuthProvider>
  );
}

export default App;
