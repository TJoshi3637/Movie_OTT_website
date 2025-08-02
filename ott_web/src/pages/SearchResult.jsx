import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SearchResult = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&query=${query}&page=1`)
      .then(res => setResults(res.data.results));
  }, [query]);

  return (
    <div className="container">
      <h2>Search Results for "{query}"</h2>
      <div className="movie-grid">
        {results.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default SearchResult;