import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); 

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page}`
      )
      .then((res) => setMovies(res.data.results));
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div className="container">
      <h2 className="text-white text-2xl font-bold mb-4">Popular Movies</h2>

      <div className="movie-grid">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3 className="text-white hover:text-gray-300 text-base font-medium mt-2 text-center">
              {movie.title}
            </h3>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="pagination-button"
        >
          Prev
        </button>

        <span className="pagination-text">Page {page}</span>

        <button
          onClick={handleNext}
          className="pagination-button"
        >
          Next
        </button>
      </div>



    </div>
  );
};

export default Home;
