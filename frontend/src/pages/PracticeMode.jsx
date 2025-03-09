// src/pages/PracticeMode.jsx
import React from "react";
import "../styles/PracticeMode.css"; // Add your custom styles

const PracticeMode = () => {
  return (
    <div className="practice-mode">
      <h2>Practice Mode</h2>
      <p>Identify the code's functionality with hints and feedback.</p>
      <div className="code-container">
        {/* Code and test case input will go here */}
      </div>
      <button className="btn">Next Question</button>
    </div>
  );
};

export default PracticeMode;
