// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Add your custom styles

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to CodeReverse</h1>
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
  );
};

export default Home;
