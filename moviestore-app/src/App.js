import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register'; 
import { MoviesProvider } from './context/MoviesContext';

function App() {
  return (
    <MoviesProvider>
      <Router>
        <div>
          <nav>
            <div className="menu-item"><Link to={'/'}>Home</Link></div>
            <div className="menu-item"><Link to={'/searchAndEdit'}>Search and Edit</Link></div>
            <div className="menu-item"><Link to={'/about'}>About</Link></div>
            <div className="menu-item"><Link to={'/login'}>Login</Link></div>
          </nav>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/searchAndEdit" component={Search}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route> {/* Add Register route */}
          </Switch>
        </div>
      </Router>
    </MoviesProvider>
  );
}

export default App;
