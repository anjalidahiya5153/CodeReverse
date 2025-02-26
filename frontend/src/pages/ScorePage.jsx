import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import "../styles/ScorePage.css";
import { Label } from './../../node_modules/recharts/es6/component/Label';

const ScorePage = ({ score, totalQuestions, onClose, onReset }) => {
  const wrongAnswers = totalQuestions - score;

  const data = [
    { name: "Correct", value: score },
    { name: "Wrong", value: wrongAnswers },
  ];

  const COLORS = ["#33ac38e3", "#e24135cf"];

  return (
    <div className="score-page">
      <button className="close-icon" onClick={onClose}>✖</button>

      <h2>Session Complete!</h2>
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

      <button className="btn reset-btn" onClick={onReset}>Restart Practice</button>
    </div>
  );
};

export default ScorePage;
