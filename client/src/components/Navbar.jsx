import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">Geniune Jobs</div>
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/search">Search</Link></li>
      <li><Link to="add_post">Post a job</Link></li>
    </ul>
    <button className="login-btn">Log in</button>
  </nav>
);
export default Navbar;
