import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/AuthModal.css';
import { AuthContext } from './AuthContext';

const AuthModal = ({ showLogin, showSignup, setShowLogin, setShowSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''  // For signup only
  });

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      alert('Login successful');
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true); // Update the AuthContext to reflect the logged-in state
      setShowLogin(false);  // Close the modal on success
    } catch (err) {
      alert('Error logging in');
    }
  };
  

  // Signup submission handler
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      alert(res.data.message);
      setShowSignup(false);  // Close the modal on success
    } catch (err) {
      alert('Error creating user');
    }
  };

  return (
    <>
      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="modal-input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="modal-input"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit" className="modal-button">
                Login
              </button>
            </form>
            <p className="modal-footer">
              Don't have an account?{' '}
              <button onClick={() => {setShowSignup(true); setShowLogin(false);}} className="text-blue-500 hover:underline">
                Create one here
              </button>
            </p>
            <button onClick={() => setShowLogin(false)} className="modal-close">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignup && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2 className="modal-title">Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Name"
                className="modal-input"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="modal-input"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="modal-input"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="submit" className="modal-button">
                Sign Up
              </button>
            </form>
            <p className="modal-footer">
              Already have an account?{' '}
              <button onClick={() => {setShowLogin(true); setShowSignup(false);}} className="text-blue-500 hover:underline">
                Login here
              </button>
            </p>
            <button onClick={() => setShowSignup(false)} className="modal-close">
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
