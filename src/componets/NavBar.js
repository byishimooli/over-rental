import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Navbar.css'; // Create a CSS file for styling
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import logo from '../componets/images/pro.jpg'; // Update the path to your logo

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle Add an ad button click
  const handleAddAdClick = () => {
    navigate('/addproperty'); // Navigate to AddProperty page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Over Rentals Logo" />
      </div>
      <ul className="navbar-menu">
        <li className="dropdown">
          I'm buying ▼
          <div className="dropdown-content">
            <a href="/HeroSection">Houses</a>
            <a href="/HeroSection">Apartments</a>
            <a href="HeroSection">Land</a>
          </div>
        </li>
        <li className="dropdown">
          I'm renting ▼
          <div className="dropdown-content">
            <a href="#">Houses</a>
            <a href="#">Apartments</a>
          </div>
        </li>
        <li className="dropdown">
          I'm selling ▼
          <div className="dropdown-content">
            <a href="#">Sell a House</a>
            <a href="#">Sell Land</a>
          </div>
        </li>
        <li className="dropdown">
          Companies ▼
          <div className="dropdown-content">
            <a href="#">Agents</a>
            <a href="#">Brokers</a>
          </div>
        </li>
        <li><a href="#profile">
          <PersonIcon /> My Profile
        </a></li>
        <button className="add-ad-btn" onClick={handleAddAdClick}>
          <AddIcon /> Add an ad
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
