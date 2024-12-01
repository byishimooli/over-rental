import React, { useState } from 'react';
import './HeroSection.css';
import backgroundImage from './images/conv.jpg'; // Replace with your image path

const HeroSection = () => {
  // State to handle form inputs
  const [locationInput, setLocationInput] = useState('');
  const [priceFromInput, setPriceFromInput] = useState('');
  const [priceToInput, setPriceToInput] = useState('');
  const [surfaceFromInput, setSurfaceFromInput] = useState('');
  const [surfaceToInput, setSurfaceToInput] = useState('');

  // Handle form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const formData = {
      location: locationInput,
      priceFrom: priceFromInput,
      priceTo: priceToInput,
      surfaceFrom: surfaceFromInput,
      surfaceTo: surfaceToInput,
    };

    fetch('http://localhost:8090/api/properties/search', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response (e.g., display the filtered properties)
        console.log(data);  // Display filtered properties for now
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  };

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-text">
        <h1>Find the house of your dreams here</h1>
        <p>Affordable, nice, and simple</p>
      </div>
      <div className="overlay">
        <div className="search-container">
          <div className="tabs">
            <button className="tab active">Search</button>
            <button className="tab">Developer Offers</button>
          </div>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <select
              className="dropdown"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            >
              <option>Apartments</option>
              <option>Houses</option>
              <option>Plots</option>
              <option>Commercial</option>
            </select>
            <select
              className="dropdown"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            >
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <input
              type="text"
              placeholder="Enter location"
              className="input-field"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="+0 km"
              className="input-field"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price From (Rwf)"
              className="input-field"
              value={priceFromInput}
              onChange={(e) => setPriceFromInput(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price To (Rwf)"
              className="input-field"
              value={priceToInput}
              onChange={(e) => setPriceToInput(e.target.value)}
            />
            <input
              type="number"
              placeholder="Surface From (m²)"
              className="input-field"
              value={surfaceFromInput}
              onChange={(e) => setSurfaceFromInput(e.target.value)}
            />
            <input
              type="number"
              placeholder="Surface To (m²)"
              className="input-field"
              value={surfaceToInput}
              onChange={(e) => setSurfaceToInput(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
