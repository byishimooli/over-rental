import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import "./Forme.css";
import Navbar from './NavBar';

const OtodomForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const tabs = [
    "Basic Information",
    "Media",
    "Property Details",
    "Location",
    "Additional Information",
  ];

  const onDrop = (acceptedFiles) => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 5 * 1024 * 1024, // 5MB limit
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      ownerName: "",
      contactInfo: "",
      buildingType: "",
      floor: "",
      totalFloors: "",
      buildingMaterial: "",
      windows: "",
      heating: "",
      yearBuilt: "",
      condition: "",
      availableFrom: "",
      rentToStudents: false,
      equipment: [],
      security: [],
      media: [],
      additionalInfo: [],
      location: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required").max(50, "Max 50 characters"),
      price: Yup.number().required("Price is required").positive("Must be positive"),
      ownerName: Yup.string().required("Owner name is required"),
      contactInfo: Yup.string().required("Contact information is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().max(500, "Max 500 characters"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();

      // Append form values to FormData
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("ownerName", values.ownerName);
      formData.append("contactInfo", values.contactInfo);
      formData.append("buildingType", values.buildingType);
      formData.append("floor", values.floor);
      formData.append("totalFloors", values.totalFloors);
      formData.append("buildingMaterial", values.buildingMaterial);
      formData.append("heating", values.heating);
      formData.append("yearBuilt", values.yearBuilt);
      formData.append("condition", values.condition);
      formData.append("availableFrom", values.availableFrom);
      formData.append("rentToStudents", values.rentToStudents);
      formData.append("location", values.location);
      formData.append("description", values.description);

      // Append arrays (equipment, security) as JSON strings
      formData.append("equipment", JSON.stringify(values.equipment));
      formData.append("security", JSON.stringify(values.security));

      // Append the media (files) to FormData
      uploadedFiles.forEach((file) => {
        formData.append("file", file); // You may need to adjust the name ("file") depending on the backend expectations
      });

      try {
        // Send the POST request to the backend API
        const response = await fetch("http://localhost:8090/api/property/post", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const contentType = response.headers.get("Content-Type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log("Property created successfully:", data);
          } else {
            console.error("Expected JSON response but got:", contentType);
          }
        } else {
          const errorData = await response.text(); // Use text in case of non-JSON error
          console.error("Error creating property:", errorData);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const switchTab = (index) => setActiveTab(index);

  return (
    <div>
      <Navbar /> {/* Navbar Component added here */}
      <div className="otodom-form-container">
        <h1 className="form-title">Create New Advertisement</h1>
        <div className="tabs-navigation">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`tab-button ${index === activeTab ? "active" : ""}`}
              onClick={() => switchTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* Basic Information Tab */}
          {activeTab === 0 && (
            <section className="form-section">
              <h2>Basic Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    placeholder="Enter ad title"
                  />
                  {formik.errors.title && <div className="error">{formik.errors.title}</div>}
                </div>
                <div className="form-group">
                  <label>Price*</label>
                  <input
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    placeholder="Enter price"
                  />
                  {formik.errors.price && <div className="error">{formik.errors.price}</div>}
                </div>
                <div className="form-group">
                  <label>Owner Name*</label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formik.values.ownerName}
                    onChange={formik.handleChange}
                    placeholder="Enter owner's name"
                  />
                  {formik.errors.ownerName && <div className="error">{formik.errors.ownerName}</div>}
                </div>
                <div className="form-group">
                  <label>Contact Information*</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formik.values.contactInfo}
                    onChange={formik.handleChange}
                    placeholder="Enter contact information"
                  />
                  {formik.errors.contactInfo && <div className="error">{formik.errors.contactInfo}</div>}
                </div>
              </div>
            </section>
          )}

          {/* Media Tab */}
          {activeTab === 1 && (
            <section className="form-section">
              <h2>Media</h2>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>Drag & drop your images, or click to select files</p>
              </div>
              <div className="uploaded-files">
                {uploadedFiles.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="preview-image"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Property Details Tab */}
          {activeTab === 2 && (
            <section className="form-section">
              <h2>Property Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Building Type</label>
                  <input
                    type="text"
                    name="buildingType"
                    value={formik.values.buildingType}
                    onChange={formik.handleChange}
                    placeholder="Enter type of building"
                  />
                </div>
                <div className="form-group">
                  <label>Floor</label>
                  <input
                    type="number"
                    name="floor"
                    value={formik.values.floor}
                    onChange={formik.handleChange}
                    placeholder="Enter floor"
                  />
                </div>
                <div className="form-group">
                  <label>Total Floors</label>
                  <input
                    type="number"
                    name="totalFloors"
                    value={formik.values.totalFloors}
                    onChange={formik.handleChange}
                    placeholder="Enter number of floors"
                  />
                </div>
                <div className="form-group">
                  <label>Building Material</label>
                  <input
                    type="text"
                    name="buildingMaterial"
                    value={formik.values.buildingMaterial}
                    onChange={formik.handleChange}
                    placeholder="Enter building material"
                  />
                </div>
                <div className="form-group">
                  <label>Heating</label>
                  <input
                    type="text"
                    name="heating"
                    value={formik.values.heating}
                    onChange={formik.handleChange}
                    placeholder="Enter heating details"
                  />
                </div>
                <div className="form-group">
                  <label>Available From</label>
                  <input
                    type="date"
                    name="availableFrom"
                    value={formik.values.availableFrom}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Location Tab */}
          {activeTab === 3 && (
            <section className="form-section">
              <h2>Location</h2>
              <div className="form-group">
                <label>Location*</label>
                <input
                  type="text"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  placeholder="Enter location"
                />
                {formik.errors.location && <div className="error">{formik.errors.location}</div>}
              </div>
            </section>
          )}

          {/* Additional Information Tab */}
          {activeTab === 4 && (
            <section className="form-section">
              <h2>Additional Information</h2>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="additionalInfo"
                  value={formik.values.additionalInfo}
                  onChange={formik.handleChange}
                  placeholder="Enter additional information"
                />
              </div>
            </section>
          )}

          <div className="form-navigation">
            <button
              type="button"
              onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
              disabled={activeTab === 0}
            >
              Previous
            </button>
            {activeTab < tabs.length - 1 ? (
              <button
                type="button"
                onClick={() => setActiveTab((prev) => Math.min(tabs.length - 1, prev + 1))}
              >
                Next
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtodomForm;
