import React, { useContext, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col, Image, Alert } from 'react-bootstrap';
import MoviesContext from '../../context/MoviesContext';
import { compressImage } from '../../utils/compressImage';
import { useMoviesApi } from '../../services/useMoviesApi';
import Loading from '../common/Loading';
import ConfirmationModal from '../common/ConfirmationModal';
import EditMovieForm from '../movie/EditMovieForm';
import MovieDetails from '../movie/MovieDetails';
import { useAddToCart } from '../../hooks/useAddToCart';
import './movie-page.css';

const MoviePage = () => {
  const history = useHistory();
  const { productId } = useParams();
  const { movies, isLoading } = useContext(MoviesContext);
  const { updateMovie, deleteMovie } = useMoviesApi();
  const { handleAddToCart } = useAddToCart();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [movie, setMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');

  useEffect(() => {
    const selectedMovie = movies.find(m => m.productId === parseInt(productId));
    if (selectedMovie) {
      setMovie(selectedMovie);
      setEditedMovie(selectedMovie);
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

  document.title = `Movie Store - ${movie.name}`;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(400, 600, file).then((compressedImage) => {
        setImagePreview(compressedImage);
        setEditedMovie({ ...editedMovie, image: compressedImage });
      }).catch((error) => console.error('Error compressing image:', error));
    }
  };

  const handleSave = async () => {
    try {
      await updateMovie(editedMovie);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating the movie:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedMovie(movie);
    setImagePreview(movie.image);
  };

  const handleDelete = async () => {
    try {
      await deleteMovie(movie.productId);
      history.goBack();
    } catch (error) {
      console.error('Error deleting movie:', error);
    } finally {
      setShowModal(false);
    }
  };

  const handleAddMovieToCart = async () => {
    try {
      await handleAddToCart(movie.productId);
      setAlertMessage(`${movie.name} has been added to your cart!`);
      setAlertVariant('success');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding movie to cart:', error);
      setAlertMessage('Failed to add the movie to your cart.');
      setAlertVariant('danger');
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <Container className="movie-page">
      <Row className="py-4 movie-page-row">
        <Col xs={12} sm={12} md={7} lg={6} xl={5} xxl={4}>
          <Image src={imagePreview || movie.image} alt={movie.name} fluid className="movie-page-img" />
        </Col>
        <Col xs={12} sm={12} md={5} lg={6} xl={7} xxl={8}>
          {isEditing ? (
            <EditMovieForm
              editedMovie={editedMovie}
              handleInputChange={(e) => setEditedMovie({ ...editedMovie, [e.target.name]: e.target.value })}
              handleImageChange={handleImageChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          ) : (
            <MovieDetails
              movie={movie}
              handleAddToCart={handleAddMovieToCart}
              setIsEditing={setIsEditing}
              setShowModal={setShowModal}
            />
          )}
          <ConfirmationModal
            show={showModal}
            setShow={setShowModal}
            handleConfirm={handleDelete}
            title="Deleting a Movie"
            bodyText={`Are you sure you want to delete ${movie.name} from the database?`}
          />
        </Col>
      </Row>
      {showAlert && (
        <Alert
          variant={alertVariant}
          className="custom-alert"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
    </Container>
  );
};

export default MoviePage;
