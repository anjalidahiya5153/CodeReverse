import React from "react";
import "../styles/QuizProgress.css"; 

const QuizProgress = ({ currentStep, totalSteps }) => {
  return (
    <div className="quiz-progress">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        return (
          <div key={stepNumber} className={`step ${currentStep >= stepNumber ? "active" : ""}`}>
            <span className="step-number">{stepNumber}</span>
            <span className="step-label">Question {stepNumber}</span>
          </div>
        );
      })}
    </div>
  );
};

export default QuizProgress;
