import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; 
import codeUnderstandingImage from "../assets/code_comic.webp"; 
import { AuthContext } from "../auth/AuthContext";
import AuthModal from "../auth/AuthModal";

const Home = () => {

  const { isLoggedIn } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [redirectPath, setRedirectPath] = useState("");

  const handleProtectedRoute = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setRedirectPath(path);
      setShowLogin(true);
    }
  };

  return (
    <div className="home-page">
      <div className="image-container">
        <img src={codeUnderstandingImage} alt="Understanding Code" className="code-image" />
      </div>
      <div className="content">
        <h1>
          Welcome to <span className="highlight">CodeReverse</span>
        </h1>
        <p>Challenge your coding skills and improve your understanding of code.</p>
        <div className="buttons">
          <Link to="/practicemode" onClick={(e) => handleProtectedRoute(e, "/practicemode")}>
            <button className="btn">Practice Mode</button>
          </Link>
          <Link to="/challengemode" onClick={(e) => handleProtectedRoute(e, "/challengemode")}>
            <button className="btn">Challenge Mode</button>
          </Link>
          <Link to="/leaderboard">
            <button className="btn">Leaderboard</button>
          </Link>
        </div>
      </div>
      <AuthModal showLogin={showLogin} setShowLogin={setShowLogin} redirectPath={redirectPath}/>
    </div>
  );
};

export default Home;
