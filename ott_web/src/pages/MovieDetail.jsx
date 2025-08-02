import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
      .then((res) => setMovie(res.data));

    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743`)
      .then((res) => setCast(res.data.cast.slice(0, 12)));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      {/* ⬇ Main Container */}
      <div className="movie-detail-container" style={{
        display: 'flex',
        gap: '2rem',
        alignItems: 'flex-start',
        padding: '2rem',
        maxWidth: '1200px',
        margin: '3rem auto 0 auto'
      }}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="detail-img"
          style={{ borderRadius: '12px', width: '250px', flexShrink: 0 }}
        />

        <div className="movie-info" style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{movie.title}</h2>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p><strong>Runtime:</strong> {movie.runtime} min</p>
            <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
          </div>

          {/* Overview inside the same container */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Overview</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{movie.overview}</p>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <h2 style={{ textAlign: 'left', marginTop: '2rem', maxWidth: '1200px', margin: '2rem auto 0 auto', paddingLeft: '2rem' }}>Cast</h2>
      <div className="cast-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '1rem auto 2rem auto',
        padding: '0 2rem'
      }}>
        {cast.map((actor) => (
          <div key={actor.id} className="cast-card" style={{
            textAlign: 'center',
            backgroundColor: '#1c1c1c',
            padding: '0.75rem',
            borderRadius: '8px'
          }}>
            <img
              src={actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : 'https://via.placeholder.com/100x100?text=No+Image'}
              alt={actor.name}
              style={{
                borderRadius: '8px',
                width: '100%',
                height: '180px',
                objectFit: 'cover'
              }}
            />
            <p style={{ marginTop: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>{actor.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};


export default MovieDetail;