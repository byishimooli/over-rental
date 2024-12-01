import React from 'react';
import './LandingPage.css';
import house1 from '../componets/images/p3.jpg';
import house2 from '../componets/images/p4.jpg';


const PropertyCard = () => {
  const properties = [
    {
      image: house1,
      price: '10,000 $',
      title: 'Nice house for living',
      location: 'kigali, kicukiro, kk495st',
      rooms: '6 rooms',
      size: '150m²',
      type: 'Private offer',
    },
    {
      image: house2,
      price: '8000 $',
      title: 'House for living',
      location: 'Kigali, Gasabo, Nyarutarama',
      rooms: '5 rooms',
      size: '200m²',
      type: 'Private offer',
    },
  ];

  return (
    <section className="property-list">
      {properties.map((property, index) => (
        <div key={index} className="property-card">
          <div className="property-image">
            <img src={property.image} alt="Property" />
            <div className="image-controls">1 / 14</div>
          </div>
          <div className="property-details">
            <h3>{property.price}</h3>
            <h4>{property.title}</h4>
            <p>{property.location}</p>
            <div className="property-meta">
              <span>{property.rooms}</span> • <span>{property.size}</span>
            </div>
            <div className="property-footer">
              <span>{property.type}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PropertyCard;
