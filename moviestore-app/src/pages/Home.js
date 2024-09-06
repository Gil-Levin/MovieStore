import React, { Component } from 'react';
import { getMovies } from '../services/movieService';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  title = 'Home Page'
  state = {
    movies: null,
  }
  handleClick(id) {
    const movie = this.state.movies.find((m) => m.id === id);
    if (!!movie) {
      movie.isToggleOn = !movie.isToggleOn;
      this.setState(() => ({
        movies: this.state.movies
      }));
    }
  }
  onSave($event, movieId, property) {
    const movie = this.state.movies.find((m) => m.id === movieId);
    movie[property] = $event;
  }
  onAccept = (text) => {
    this.setState({ text })
  }
  componentDidMount() {
    this.loadMovies();
  }
  loadMovies() {
    const movies = getMovies().map((movie) => ({ ...movie, isToggleOn: false }));
    this.setState(() => ({ movies }));
  }

  render() {
    return (
      <div>
        <h1> {this.title} </h1>
        <div className="movies-container">
          {this.state.movies && this.state.movies.map((movie, index) => <div className="movie" key={index} onClick={() => { this.handleClick(movie.id) }}>
            <div className="movie-url"><img src={movie.imageUrl} alt=''></img></div>
            <div className="title">{movie.title}</div>
            {!!movie.isToggleOn && <div className='movie-details' >
              <div className="overview">{movie.overview}</div>
              <div className="rating">Rating: {movie.rating}</div>
              <div className="genre">Genre: {movie.genre}</div>
            </div>}
          </div>)
          }</div>
      </div>
    )
  }
}
export default Home





