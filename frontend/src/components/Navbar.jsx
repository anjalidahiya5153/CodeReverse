import React, {useState, useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"; // Add styles here if needed
import AuthModal from "../auth/AuthModal";
import { AuthContext } from "../auth/AuthContext";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext); // Get the login status from context
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Navbar component mounted');
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
    console.log('logout button clicked!!');
    logout();
    navigate('/');
  }

  return (
    <nav className="bg-light">
      
      <div className="container mx-auto py-8 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link to="/">
            Home
          </Link>
        </div>

       

        {/* Include AuthModal */}
        <AuthModal
          showLogin={showLogin}
          showSignup={showSignup}
          setShowLogin={setShowLogin}
          setShowSignup={setShowSignup}
        />

        {/* Icons and Auth Links */}
        <div className="flex items-center space-x-6">
          <Link to="/practicemode">
            PracticeMode
          </Link>
          <Link to="/leaderboard">
            LeaderBoard
          </Link>
          <Link to="/about">
            about
          </Link>
          <Link to="/contact">
            contact
          </Link>

           {/* Conditionally render "View Profile" or "Login/Signup" based on authentication status */}
          {isLoggedIn ? (
            <>
            
            <button onClick={handleLogout} className='text-lg hover:underline'>Logout</button>
            </>
          ) : (
            <>
              <button onClick={handleLoginClick} className="text-lg hover:underline">
                Login
              </button>
              <button onClick={handleSignupClick} className="text-lg hover:underline">
                Signup
              </button>
            </>
          )}
        </div>
      </div>

      {/* Navigation Links and Search Bar */}
      <div className="bg-gray-200 py-2">
        <div className="ml-10 container mx-auto flex justify-between items-center space-x-6">
          {/* Navigation Links */}
          <div className="flex space-x-10">
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/practicemode" className="hover:underline">PracticeMode</Link>
            <Link to="/challengemode" className="hover:underline">ChallengeMode</Link>
            <Link to="/leaderboard" className="hover:underline">Leaderboard</Link>
            <Link to="/questions" className="hover:underline">Questions</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/code-editor">Code Editor</Link>
    
          </div>

          {/* Search Bar */}
          <div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="px-4 py-2 border border-gray-300 rounded-lg w-64 mr-4"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;