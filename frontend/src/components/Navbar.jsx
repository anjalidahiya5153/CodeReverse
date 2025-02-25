import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css"; // Import CSS
import AuthModal from "../auth/AuthModal";
import { AuthContext } from "../auth/AuthContext";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Navbar component mounted");
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    console.log("Logout button clicked!!");
    logout();
    navigate("/");
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo (Left-aligned) */}
        <div className="logo">
          <Link to="/">CodeReverse</Link>
        </div>

        {/* Right-aligned elements */}
        <div className="nav-right">
          <div className="nav-links">
          {!isHomePage && (
              <>
                <Link to="/practicemode">Practice Mode</Link>
                <Link to="/challengemode">Challenge Mode</Link>
              </>
            )}
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/about">About</Link>
          </div>

          {/* Authentication Buttons */}
          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
              <div className="nav-right">
              <div className="nav-links">
              <Link to="/profile" className="profile-link">Profile</Link>
              </div>
              </div>
              
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={handleLoginClick} className="login-btn">
                  Login
                </button>
                <button onClick={handleSignupClick} className="signup-btn">
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>


      {/* Auth Modal */}
      <AuthModal
        showLogin={showLogin}
        showSignup={showSignup}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
      />
    </nav>
  );
};

export default Navbar;
