// React and React Router imports
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

// React Bootstrap imports
import { Container, Row, Col, Image, Button, Alert, Form, Modal } from 'react-bootstrap';

// Internal imports
import MoviesContext from '../../context/MoviesContext';
import { compressImage } from '../../utils/compressImage';
import { updateMovie, deleteMovie } from '../../services/movie-api';
import Loading from '../common/Loading';
import ConfirmationModal from '../common/ConfirmationModal';

// CSS import
import './movie-page.css';

const MoviePage = () => {
  const history = useHistory();
  const { productId } = useParams();
  const { movies, isLoading, refreshMovies } = useContext(MoviesContext);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [movie, setMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState({
    productId: '',
    name: '',
    category: '',
    price: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const selectedMovie = movies.find(m => m.productId === parseInt(productId));
    if (selectedMovie) {
      setMovie(selectedMovie);
      setEditedMovie({
        productId: selectedMovie.productId,
        name: selectedMovie.name,
        category: selectedMovie.category,
        price: selectedMovie.price,
        description: selectedMovie.description,
        image: selectedMovie.image
      });
      setImagePreview(selectedMovie.image);
    }
  }, [movies, productId]);

  if (isLoading) {
    document.title = "Movie Store - Loading...";
    return <Loading />;
  }

  if (!movie) {
    document.title = "Movie Store - Movie not found!";
    return (
      <Container className="movie-page">
        <Alert variant="danger">Movie not found!</Alert>
      </Container>
    );
  }

  const { image, name, category, price, description } = movie;
  document.title = `Movie Store - ${movie.name}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMovie({ ...editedMovie, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(400, 600, file).then((compressedImage) => {
        setImagePreview(compressedImage);
        setEditedMovie({ ...editedMovie, image: compressedImage });
      }).catch((error) => {
        console.error('Error compressing image:', error);
      });
    }
  };

  const handleSave = async () => {
    try {
      const response = await updateMovie(editedMovie);

      if (response.status === 204) {
        refreshMovies();
        setIsEditing(false);
      } else {
        console.error('Failed to update the movie. Status:', response.status);
      }
    } catch (error) {
      console.error('Error updating the movie:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMovie({
      name: movie.name,
      category: movie.category,
      price: movie.price,
      description: movie.description,
      image: movie.image
    });
    setImagePreview(movie.image);
  };

  const handleDelete = async () => {
    try {
      await deleteMovie(movie.productId);

      refreshMovies();
      history.goBack();
      console.log('Movie deleted successfully');
    } catch (error) {
      console.error('Error deleting movie:', error);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <Container className="movie-page">
      <Row className='py-4 movie-page-row'>
        <Col xs={12} sm={12} md={7} lg={6} xl={5} xxl={4}>
          <Image src={imagePreview || image} alt={name} fluid className="movie-page-img" /> {/* Use the imagePreview */}
        </Col>
        <Col xs={12} sm={12} md={5} lg={6} xl={7} xxl={8}>
          {isEditing ? (
            <>
              <Form>
                <Form.Group controlId="formMovieName">
                  <Form.Label>Movie Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedMovie.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMovieCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={editedMovie.category}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMoviePrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={editedMovie.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMovieDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={editedMovie.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formMovieImage">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Form.Group>
              </Form>
              <Button variant="warning" className="me-2" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <hr />
              <h2>{name}</h2>
              <hr />
              <h5 className="text-muted">{category}</h5>
              <p><strong>Price: </strong>${price}</p>
              <p>{description}</p>
              <hr />
              <div className="button-group">
                <Button variant="primary" className="me-2" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
                <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
                <ConfirmationModal
                  show={showModal}
                  setShow={setShowModal}
                  handleConfirm={handleDelete}
                  title="Deleting a Movie"
                  bodyText={`Are you sure you want to delete ${movie.name} from the database?`}
                />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
