import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "../styles/ScorePage.css";

const ScorePage = ({ score, totalQuestions, onReset }) => {
  const wrongAnswers = totalQuestions - score;

  const data = [
    { name: "Correct Answers", value: score },
    { name: "Wrong Answers", value: wrongAnswers },
  ];

  const COLORS = ["#4CAF50", "#F44336"]; // Green for correct, Red for wrong

  return (
    <div className="score-page">
      <h2>Practice Session Complete!</h2>
      <p className="final-score">
        You got <span className="score">{score}</span> out of{" "}
        <span className="total">{totalQuestions}</span> questions correct.
      </p>

      <div className="chart-container">
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"

          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      <button className="btn reset-btn" onClick={onReset}>
        Restart Practice
      </button>
    </div>
  );
};

export default ScorePage;
