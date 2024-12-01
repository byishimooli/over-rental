import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './Form.css';
import signupImage from '../componets/images/p1.jpg';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    names: '',
    username: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [responseClass, setResponseClass] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate the form before submission
  const validateForm = () => {
    if (!formData.email || !formData.names || !formData.username || !formData.password) {
      setResponseMessage('All fields are required.');
      setResponseClass('error-message');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setResponseMessage('');
    setResponseClass('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8090/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();

      if (response.ok) {
        setResponseMessage('Signup successful! Redirecting to login...');
        setResponseClass('success-message');
        setFormData({ email: '', names: '', username: '', password: '' });

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setResponseMessage(responseText || 'Signup failed. Please try again.');
        setResponseClass('error-message');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setResponseMessage('Network error. Please check your connection.');
      setResponseClass('error-message');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login success
  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google Login Success:', credentialResponse);
    // Implement Google login logic if needed
  };

  // Handle Google Login failure
  const handleGoogleFailure = (error) => {
    console.error('Google Login Failed:', error);
    alert('Google Login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="form-container">
        {/* Image Section */}
        <div className="image-section">
          <img src={signupImage} alt="Sign Up" className="signup-image" />
        </div>

        {/* Form Section */}
        <div className="form-box">
          <button className="close-btn" onClick={() => navigate('/')}>×</button>
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="names"
              placeholder="Full Name"
              value={formData.names}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="checkbox-container">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>
            <button type="submit" className="form-btn" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <p className="divider">OR</p>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
            <p className="footer-text">
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </form>
          {responseMessage && (
            <p className={`response-message ${responseClass}`}>{responseMessage}</p>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignUpForm;
