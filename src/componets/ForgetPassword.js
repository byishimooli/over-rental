import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Validate email before sending the request
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    setIsLoading(true);  // Disable the button and show loading state
    setMessage('');

    try {
      const response = await fetch('http://localhost:8090/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset email sent successfully!');
      } else {
        setMessage(data.message || 'Failed to send reset email. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);  // Reset loading state
    }
  };

  // Helper function to validate email format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div style={styles.card}>
      <div style={styles.lockIcon}>
        <i className="fas fa-lock" style={styles.icon}></i>
      </div>
      <h2 style={styles.heading}>Forgot Password?</h2>
      <p style={styles.subheading}>Enter your email address to reset your password</p>
      <form onSubmit={handleForgotPassword}>
        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Reset Password'}
        </button>
      </form>
      {message && <p style={message.includes('success') ? styles.successMessage : styles.errorMessage}>{message}</p>}
    </div>
  );
};

const styles = {
  card: {
    background: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  lockIcon: {
    background: '#e3f2fd',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
  },
  icon: {
    fontSize: '1.5rem',
    color: '#0c0c0c',
  },
  heading: {
    color: '#1d1d1d',
    marginBottom: '0.5rem',
  },
  subheading: {
    color: '#666',
    marginBottom: '1.5rem',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '0.5rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    background: '#021c36',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  errorMessage: {
    color: '#d32f2f',
    marginTop: '0.5rem',
    fontSize: '0.875rem',
  },
  successMessage: {
    color: '#2e7d32',
    marginTop: '0.5rem',
    fontSize: '0.875rem',
  },
};

export default ForgotPassword;
