import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/PracticeMode.css";
import ScorePage from "./ScorePage";
import QuizProgress from "../components/QuizProgress";

const PracticeMode = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [running, setRunning] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [correctOption, setCorrectOption] = useState(null);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const API_KEY = ""; //api not fetching from .env hence hardcoded
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
          Generate 6 coding questions for a practice quiz. Each question should include:
          1. A short code snippet (under 10 lines) in Python, C++, or Java
          2. Four multiple choice options with only one correct answer

          Format the response as a valid JSON array:
          [
            {
              "code": "code snippet here",
              "language": "python",
              "mcq": [
                {"text": "option 1", "correct": true},
                {"text": "option 2", "correct": false},
                {"text": "option 3", "correct": false},
                {"text": "option 4", "correct": false}
              ]
            }
          ]
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const textResponse = response.text();

        // console.log("Gemini API Response:", textResponse);

        const jsonMatch = textResponse.match(/\[\s*\{.+\}\s*\]/s);
        if (!jsonMatch) throw new Error("Could not parse JSON from Gemini response");

        const parsedQuestions = JSON.parse(jsonMatch[0]);
        if (!Array.isArray(parsedQuestions)) throw new Error("Invalid response format from Gemini");

        setQuestions(parsedQuestions);
        setUsedQuestions([0]); // Start with the first question
        shuffleOptions(parsedQuestions[0].mcq);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err.message);

        const fallbackQuestions = [
          {
            code: `def add(a, b):\n    return a + b`,
            language: "python",
            mcq: [
              { text: "Adds two numbers", correct: true },
              { text: "Subtracts two numbers", correct: false },
              { text: "Multiplies two numbers", correct: false },
              { text: "Divides two numbers", correct: false },
            ],
          },
        ];
        setQuestions(fallbackQuestions);
        setUsedQuestions([0]);
        shuffleOptions(fallbackQuestions[0].mcq);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const shuffleOptions = (options) => {
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  const nextQuestion = () => {
    if (!running || questions.length === 0) return;
  
    if (usedQuestions.length === questions.length) {
      setRunning(false);
      setShowScorePopup(true);
      return;
    }
  
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questions.length);
    } while (usedQuestions.includes(randomIndex));
  
    setUsedQuestions(prevUsed => [...prevUsed, randomIndex]);  // Ensure state updates correctly
    setCurrentIndex(randomIndex);
    setSelectedOption(null);
    setCorrectOption(null);
    setFeedback("");
    shuffleOptions(questions[randomIndex].mcq);
  };
  

  const resetPractice = () => {
    setUsedQuestions([0]);
    setCurrentIndex(0);
    setScore(0);
    setRunning(true);
    setShowScorePopup(false);
    shuffleOptions(questions[0].mcq);
  };

  const stopPractice = () => {
    setRunning(false);
    setShowScorePopup(true);
  };

  const handleOptionSelect = (option) => {
    if (!running) return;
    setSelectedOption(option);
    if (option.correct) {
      setFeedback("✅ Correct! Well Done!");
      setScore(score + 1);
    } else {
      setFeedback("❌ Wrong. Keep Practicing!");
      setCorrectOption(shuffledOptions.find((opt) => opt.correct));
    }
  };

  if (isLoading) {
    return <div className="practice-mode loading">Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div className="practice-mode error">No questions available</div>;
  }

  return (
    <div className="practice-mode">
      <h2>Practice Mode</h2>
      <p>Identify the code's functionality with hints and feedback.</p>

      <QuizProgress currentStep={score} totalSteps={questions.length} />

      {error && <p className="error-message">Error connecting to Gemini. Using fallback questions.</p>}

      <div className="split-container">
        <div className="left-section">
          <div className="code-container">
            <SyntaxHighlighter language={questions[currentIndex].language || "python"} style={dracula}>
              {questions[currentIndex].code}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className="right-section">
          <div className="mcq-container">
            {shuffledOptions.map((option, index) => (
              <button
                key={index}
                className={`mcq-btn 
                  ${selectedOption === option ? (option.correct ? "correct" : "incorrect") : ""} 
                  ${correctOption === option ? "correct-highlight" : ""}`}
                onClick={() => handleOptionSelect(option)}
                disabled={selectedOption !== null}
              >
                {option.text}
              </button>
            ))}
          </div>

          {feedback && <p className="feedback">{feedback}</p>}

          <div className="button-container">
            <button className="btn next-btn" onClick={nextQuestion} disabled={!running || selectedOption === null}>
              Next Question
            </button>
            <button className="btn stop-btn" onClick={stopPractice}>
              Stop
            </button>
          </div>
        </div>
      </div>

      {showScorePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <ScorePage score={score} totalQuestions={questions.length} />
            <button className="close-btn" onClick={() => setShowScorePopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeMode;
