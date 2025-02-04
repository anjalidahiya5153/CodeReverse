// src/pages/ChallengeMode.jsx
import React, { useState } from "react";
import "../styles/ChallengeMode.css"; // Add your custom styles

const ChallengeMode = () => {
  const [timeLeft, setTimeLeft] = useState(60); // Example time countdown

  return (
    <div className="challenge-mode">
      <h2>Challenge Mode</h2>
      <p>You have {timeLeft} seconds to guess the code's functionality!</p>
      <div className="code-container">
        {/* Code and test case input will go here */}
      </div>
      <button className="btn">Submit Answer</button>
    </div>
  );
};

export default ChallengeMode;
