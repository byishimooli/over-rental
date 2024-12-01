import React from 'react';
import './LandingPage.css';
import apartmentsImage from '../componets/images/p6.jpg';
import housesImage from '../componets/images/p1.jpg';
import plotsImage from '../componets/images/p2.jpg';
import commercialImage from '../componets/images/p5.jpg';

const RealEstateTypes = () => {
  const types = [
    { name: 'Apartments', image: apartmentsImage },
    { name: 'Houses', image: housesImage },
    { name: 'Plots', image: plotsImage },
    { name: 'Commercial buildings', image: commercialImage },
  ];

  return (
    <section className="real-estate-types">
      <h2>Types of Real Estate</h2>
      <div className="types-container">
        {types.map((type, index) => (
          <div key={index} className="type-card">
            <img src={type.image} alt={type.name} />
            <p>{type.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RealEstateTypes;
