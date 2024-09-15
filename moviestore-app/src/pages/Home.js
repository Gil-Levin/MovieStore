// import React, { useContext } from 'react';
// import MoviesContext from '../context/MoviesContext';
// import '../css/Home.css';

// const Home = () => {
//   const { movies, loading, setMovies } = useContext(MoviesContext);

//   const handleToggle = (productId) => {
//     const updatedMovies = movies.map((product) => {
//       if (product.productId === productId) {
//         return { ...product, isToggleOn: !product.isToggleOn };
//       }
//       return product;
//     });
//     setMovies(updatedMovies);
//   };

//   if (loading) {
//     return <div className="loading">Loading movies...</div>;
//   }

//   return (
//     <div className="home-page">
//       <section className="welcome-section">
//         <h1 className="welcome-title">Welcome to Movie Haven</h1>
//         <p className="welcome-subtitle">Discover and enjoy the greatest movies (not really)!</p>
//         <p className="welcome-description">
//           Dive into our curated collection of films and find your next favorite movie. Scroll down to start exploring!
//         </p>
//       </section>
//       <section className="movies-section">
//         <h2 className="movies-title">Featured Movies</h2>
//         <div className="movies-container">
//           {movies.length > 0 ? (
//             movies.map((product, index) => (
//               <div
//                 className="movie"
//                 key={index}
//                 onClick={() => handleToggle(product.productId)}
//               >
//                 <div className="movie-url">
//                   {product.image && (
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                     />
//                   )}
//                 </div>
//                 <div className="title">{product.name}</div>
//                 {!!product.isToggleOn && (
//                   <div className="movie-details">
//                     <div className="overview">{product.description}</div>
//                     <div className="price">Price: ${product.price}</div>
//                     <div className="genre">Category: {product.category}</div>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <h1>No products to display</h1>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


import React, { useContext, useState } from 'react';
import MoviesContext from '../context/MoviesContext';
import '../css/Home.css';

const Home = () => {
  const { movies, loading, setMovies } = useContext(MoviesContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle toggle for movie details
  const handleToggle = (productId) => {
    const updatedMovies = movies.map((product) => {
      if (product.productId === productId) {
        return { ...product, isToggleOn: !product.isToggleOn };
      }
      return product;
    });
    setMovies(updatedMovies);
  };

  // Pagination logic
  const indexOfLastMovie = currentPage * itemsPerPage;
  const indexOfFirstMovie = indexOfLastMovie - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1 className="welcome-title">Welcome to Movie Haven</h1>
        <p className="welcome-subtitle">Discover and enjoy the greatest movies (not really)!</p>
        <p className="welcome-description">
          Dive into our curated collection of films and find your next favorite movie. Scroll down to start exploring!
        </p>
      </section>
      <section className="movies-section">
        <h2 className="movies-title">Featured Movies</h2>
        <div className="movies-container">
          {currentMovies.length > 0 ? (
            currentMovies.map((product, index) => (
              <div
                className="movie"
                key={index}
                onClick={() => handleToggle(product.productId)}
              >
                <div className="movie-url">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  )}
                </div>
                <div className="title">{product.name}</div>
                {!!product.isToggleOn && (
                  <div className="movie-details">
                    <div className="overview">{product.description}</div>
                    <div className="price">Price: ${product.price}</div>
                    <div className="genre">Category: {product.category}</div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h1>No products to display</h1>
          )}
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
