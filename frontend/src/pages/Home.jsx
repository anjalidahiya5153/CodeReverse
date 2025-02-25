import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Ensure styles are updated
import codeUnderstandingImage from "../assets/code_comic.webp"; // Adjust path accordingly

const Home = () => {
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
          <Link to="/practicemode">
            <button className="btn">Practice Mode</button>
          </Link>
          <Link to="/challengemode">
            <button className="btn">Challenge Mode</button>
          </Link>
          <Link to="/leaderboard">
            <button className="btn">Leaderboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
