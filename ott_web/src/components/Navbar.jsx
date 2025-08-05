import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search/${search}`);
      setSearch('');
      setMenuOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">🎬 MovieDb</Link>

      <button className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>


      <div className={`nav-items ${menuOpen ? 'active' : ''}`}>
        <div className="links">
          <Link to="/" onClick={() => setMenuOpen(false)}>Popular</Link>
          <Link to="/top-rated" onClick={() => setMenuOpen(false)}>Top Rated</Link>
          <Link to="/upcoming" onClick={() => setMenuOpen(false)}>Upcoming</Link>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;