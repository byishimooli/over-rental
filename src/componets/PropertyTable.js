import React, { useState, useEffect } from "react";

const PropertyTable = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch property data from the backend API
  useEffect(() => {
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setIsLoading(false);
      });
  }, []);

  // Delete property handler
  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      fetch(`/api/properties/${propertyId}`, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setProperties(properties.filter((property) => property.id !== propertyId));
            alert("Property deleted successfully!");
          } else {
            alert("Failed to delete property.");
          }
        })
        .catch((error) => console.error("Error deleting property:", error));
    }
  };

  // Edit property handler (placeholder for actual functionality)
  const handleEdit = (propertyId) => {
    alert(`Edit functionality for property ID: ${propertyId} is not implemented yet.`);
    // Add navigation to edit page or popup form for editing here.
  };

  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  return (
    <div className="property-table-container">
      <h2>Manage Properties</h2>
      {properties.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>${property.price}</td>
                <td>{property.status}</td>
                <td>
                  <button onClick={() => handleEdit(property.id)}>Edit</button>
                  <button onClick={() => handleDelete(property.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  );
};

export default PropertyTable;