import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Spinner } from 'react-bootstrap';
import { FaHome, FaFilm, FaUser, FaSignInAlt, FaSignOutAlt, FaTools, FaInfoCircle } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';

const logoPath = process.env.PUBLIC_URL + '/favicon/android-chrome-192x192.png';

const NavBar = () => {
  const { isAuthenticated, isAuthorized, isLoading, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img 
            src={logoPath} 
            alt="Movie Store Logo" 
            width="30" 
            height="30" 
            className="d-inline-block align-top" 
          />
          {' Movie Store'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" exact><FaHome /> Home</Nav.Link>
            <Nav.Link as={Link} to="/movies"><FaFilm /> Movies</Nav.Link>
            <Nav.Link as={Link} to="/about"><FaInfoCircle /> About</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/profile"><FaUser /> Profile</Nav.Link>
                {isAuthorized && (
                  <Nav.Link as={Link} to="/manage"><FaTools /> Manage</Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : isAuthenticated ? (
              <Nav.Link onClick={logout}><FaSignOutAlt /> Logout</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login"><FaSignInAlt /> Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;