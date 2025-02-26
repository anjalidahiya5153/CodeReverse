import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/ChallengeMode.css";
import ScorePage from "./ScorePage";
import QuizProgress from "../components/QuizProgress";



const TIMER_DURATION = 30; // Timer duration in seconds

const ChallengeMode = () => {
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
  const [timer, setTimer] = useState(TIMER_DURATION);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const API_KEY = process.env.REACT_APP_API_KEY;

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Generate 6 coding questions with:
          1. A short code snippet in Python, C++, or Java
          2. Four multiple choice options, one correct

          JSON format:
          [
            {
              "code": "code snippet",
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

        const jsonMatch = textResponse.match(/\[\s*\{.+\}\s*\]/s);
        if (!jsonMatch) throw new Error("Could not parse JSON from response");

        const parsedQuestions = JSON.parse(jsonMatch[0]);
        if (!Array.isArray(parsedQuestions)) throw new Error("Invalid response format");

        setQuestions(parsedQuestions);
        setUsedQuestions([0]);
        shuffleOptions(parsedQuestions[0].mcq);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err.message);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (running && timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setFeedback("⏳ Time's Up! Challenge Over!");
      setTimeout(stopPractice, 1000); // Stop the challenge after a second
    }
  }, [timer, running]);

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
  
    const selectedQuestion = questions[randomIndex];
  
    if (!selectedQuestion || !Array.isArray(selectedQuestion.mcq)) {
      console.error("Invalid question structure:", selectedQuestion);
      return;
    }
  
    setUsedQuestions(prevUsed => [...prevUsed, randomIndex]);
    setCurrentIndex(randomIndex);
    setSelectedOption(null);
    setCorrectOption(null);
    setFeedback("");
    shuffleOptions(selectedQuestion.mcq);
  };
  
  const handleClosePopup = () => {
    setShowScorePopup(false);
  };

  const handleReset = () => {
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
      setFeedback("❌ Wrong. Challenge Over!");
      setCorrectOption(shuffledOptions.find((opt) => opt.correct));
      setTimeout(stopPractice, 1000); // Stop the challenge after a second
    }
  };

  if (isLoading) {
    return <div className="challenge-mode loading">Loading questions...</div>;
  }

  return (
    <div className="challenge-mode">
      <h2 className="title">Challenge Mode</h2>
      <p>Test your coding knowledge under pressure!</p>
      
      <QuizProgress currentStep={score} totalSteps={questions.length} />
      {error && <p className="error-message">Error connecting to Gemini. Please try again.</p>}

      <div className="timer">Time Left: {timer}s</div>
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
              Stop Challenge
            </button>
          </div>
        </div>
      </div>

      {showScorePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <ScorePage
              score={score}
              totalQuestions={questions.length}
              onClose={handleClosePopup} 
              onReset={handleReset} 
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default ChallengeMode;