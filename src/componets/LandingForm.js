import React from 'react';
import heroImage from '../componets/images/p1.jpg';
import './landspace.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header Section */}
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <h1> Over Rental</h1>
          </div>
          <ul className="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/listings">Listings</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src={heroImage} alt="Hero" className="hero-image" />
        <div className="hero-text">
          <h2>Find Your Dream Home</h2>
          <p>Explore the best properties available for rent near you.</p>
          <a href="/login" className="cta-button">Start Searching</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-item">
          <h3>Search Properties</h3>
          <p>Browse through a wide variety of rental properties to find the one that suits you best.</p>
        </div>
        <div className="feature-item">
          <h3>Easy Rental Process</h3>
          <p>Sign up and rent your property in just a few simple steps.</p>
        </div>
        <div className="feature-item">
          <h3>Secure Payments</h3>
          <p>Pay your rent securely through our platform and keep track of your payments.</p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>We are a leading online rental platform providing a wide selection of properties for tenants and landlords. Our mission is to make renting easy and hassle-free.</p>
      </section>

      
    </div>
  );
};

export default LandingPage;
