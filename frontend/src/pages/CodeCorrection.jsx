// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import axios from 'axios';

// // // // // // // // const CodeCorrection = () => {
// // // // // // // //     const [errorCode, setErrorCode] = useState('');
// // // // // // // //     const [userCode, setUserCode] = useState('');
// // // // // // // //     const [result, setResult] = useState('');
// // // // // // // //     const [showNextButton, setShowNextButton] = useState(false);
// // // // // // // //     const [answer, setAnswer] = useState('');

// // // // // // // //     useEffect(() => {
// // // // // // // //         const fetchErrorCode = async () => {
// // // // // // // //             try {
// // // // // // // //                 console.log('Fetching initial error code...');
// // // // // // // //                 const response = await axios.get('http://localhost:5000/api/generate-error');
// // // // // // // //                 console.log('Initial error code fetched:', response.data);
// // // // // // // //                 setErrorCode(response.data.errorCode);
// // // // // // // //             } catch (error) {
// // // // // // // //                 console.error('Error fetching error code:', error);
// // // // // // // //             }
// // // // // // // //         };
// // // // // // // //         fetchErrorCode();
// // // // // // // //     }, []);

// // // // // // // //     const handleSubmit = async () => {
// // // // // // // //         try {
// // // // // // // //             console.log('Submitting user code for comparison...');
// // // // // // // //             console.log('User code:', userCode);
// // // // // // // //             console.log('Error code:', errorCode);
// // // // // // // //             const response = await axios.post('http://localhost:5000/api/code-correction', { code: userCode, errorCode });
// // // // // // // //             console.log('Comparison result:', response.data);
// // // // // // // //             setResult(response.data.result);
// // // // // // // //             setShowNextButton(response.data.result === "true");
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error('Error:', error);
// // // // // // // //             setResult('Failed to compare codes.');
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const handleNextQuestion = async () => {
// // // // // // // //         try {
// // // // // // // //             console.log('Fetching next error code...');
// // // // // // // //             const response = await axios.get('http://localhost:5000/api/generate-error');
// // // // // // // //             console.log('Next error code fetched:', response.data);
// // // // // // // //             setErrorCode(response.data.errorCode);
// // // // // // // //             setUserCode('');
// // // // // // // //             setResult('');
// // // // // // // //             setShowNextButton(false);
// // // // // // // //             setAnswer('');
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error('Error:', error);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     const handleShowAnswer = async () => {
// // // // // // // //         try {
// // // // // // // //             console.log('Fetching answer...');
// // // // // // // //             console.log('User code:', userCode);
// // // // // // // //             console.log('Error code:', errorCode);
// // // // // // // //             const response = await axios.post('http://localhost:5000/api/show-answer', { userCode, errorCode });
// // // // // // // //             console.log('Answer fetched:', response.data);
// // // // // // // //             setAnswer(response.data.answer);
// // // // // // // //         } catch (error) {
// // // // // // // //             console.error('Error:', error);
// // // // // // // //         }
// // // // // // // //     };

// // // // // // // //     return (
// // // // // // // //         <div>
// // // // // // // //             <h2>Code Correction Tool</h2>
// // // // // // // //             <div>
// // // // // // // //                 <h3>Error Code:</h3>
// // // // // // // //                 <textarea
// // // // // // // //                     value={errorCode}
// // // // // // // //                     readOnly
// // // // // // // //                     rows="5"
// // // // // // // //                     cols="50"
// // // // // // // //                 />
// // // // // // // //             </div>
// // // // // // // //             <div>
// // // // // // // //                 <h3>Your Code:</h3>
// // // // // // // //                 <textarea
// // // // // // // //                     value={userCode}
// // // // // // // //                     onChange={(e) => setUserCode(e.target.value)}
// // // // // // // //                     rows="5"
// // // // // // // //                     cols="50"
// // // // // // // //                 />
// // // // // // // //             </div>
// // // // // // // //             <button onClick={handleSubmit}>Submit</button>
// // // // // // // //             <button onClick={handleNextQuestion} style={{ display: showNextButton ? 'block' : 'none' }}>
// // // // // // // //                 Next Question
// // // // // // // //             </button>
// // // // // // // //             <button onClick={handleShowAnswer}>Show Answer</button>
// // // // // // // //             <div>
// // // // // // // //                 <h3>Result:</h3>
// // // // // // // //                 <p>{result}</p>
// // // // // // // //             </div>
// // // // // // // //             <div>
// // // // // // // //                 <h3>Answer:</h3>
// // // // // // // //                 <p>{answer}</p>
// // // // // // // //             </div>
// // // // // // // //         </div>
// // // // // // // //     );
// // // // // // // // };

// // // // // // // // export default CodeCorrection;


// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import axios from 'axios';

// // // // // // // const CodeCorrection = () => {
// // // // // // //     const [errorCode, setErrorCode] = useState('');
// // // // // // //     const [userCode, setUserCode] = useState('');
// // // // // // //     const [result, setResult] = useState('');
// // // // // // //     const [showNextButton, setShowNextButton] = useState(false);

// // // // // // //     // Fetch the initial error code
// // // // // // //     useEffect(() => {
// // // // // // //         const fetchErrorCode = async () => {
// // // // // // //             try {
// // // // // // //                 const response = await axios.get('http://localhost:5000/api/generate-error');
// // // // // // //                 setErrorCode(response.data.error_code);
// // // // // // //             } catch (error) {
// // // // // // //                 console.error('Error fetching error code:', error);
// // // // // // //             }
// // // // // // //         };
// // // // // // //         fetchErrorCode();
// // // // // // //     }, []);

// // // // // // //     // Handle form submission
// // // // // // //     const handleSubmit = async () => {
// // // // // // //         try {
// // // // // // //             const response = await axios.post('http://localhost:5000/api/code-correction', {
// // // // // // //                 code: userCode,
// // // // // // //                 errorCode: errorCode
// // // // // // //             });
// // // // // // //             setResult(response.data.result ? "Correct!" : "Incorrect!");
// // // // // // //             setShowNextButton(true);
// // // // // // //         } catch (error) {
// // // // // // //             console.error('Error:', error);
// // // // // // //             setResult('Failed to compare codes.');
// // // // // // //         }
// // // // // // //     };

// // // // // // //     // Handle next question
// // // // // // //     const handleNextQuestion = async () => {
// // // // // // //         try {
// // // // // // //             const response = await axios.get('http://localhost:5000/api/generate-error');
// // // // // // //             setErrorCode(response.data.error_code);
// // // // // // //             setUserCode('');
// // // // // // //             setResult('');
// // // // // // //             setShowNextButton(false);
// // // // // // //         } catch (error) {
// // // // // // //             console.error('Error:', error);
// // // // // // //         }
// // // // // // //     };

// // // // // // //     return (
// // // // // // //         <div>
// // // // // // //             <h2>Code Correction Tool</h2>
// // // // // // //             <div>
// // // // // // //                 <h3>Error Code:</h3>
// // // // // // //                 <textarea
// // // // // // //                     value={errorCode}
// // // // // // //                     readOnly
// // // // // // //                     rows="5"
// // // // // // //                     cols="50"
// // // // // // //                 />
// // // // // // //             </div>
// // // // // // //             <div>
// // // // // // //                 <h3>Your Code:</h3>
// // // // // // //                 <textarea
// // // // // // //                     value={userCode}
// // // // // // //                     onChange={(e) => setUserCode(e.target.value)}
// // // // // // //                     rows="5"
// // // // // // //                     cols="50"
// // // // // // //                 />
// // // // // // //             </div>
// // // // // // //             <button onClick={handleSubmit}>Submit</button>
// // // // // // //             {showNextButton && (
// // // // // // //                 <button onClick={handleNextQuestion}>Next Question</button>
// // // // // // //             )}
// // // // // // //             <div>
// // // // // // //                 <h3>Result:</h3>
// // // // // // //                 <p>{result}</p>
// // // // // // //             </div>
// // // // // // //         </div>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default CodeCorrection;


// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';

// // // // // // const CodeCorrection = () => {
// // // // // //     const [errorCode, setErrorCode] = useState('');
// // // // // //     const [userCode, setUserCode] = useState('');
// // // // // //     const [result, setResult] = useState('');
// // // // // //     const [loading, setLoading] = useState(false);

// // // // // //     // Fetch initial error code
// // // // // //     useEffect(() => {
// // // // // //         axios.get('http://localhost:5000/api/generate-error')
// // // // // //             .then(res => setErrorCode(res.data.error_code))
// // // // // //             .catch(err => console.error("Fetch error:", err));
// // // // // //     }, []);

// // // // // //     // Handle code submission
// // // // // //     const handleSubmit = async () => {
// // // // // //         setLoading(true);
// // // // // //         try {
// // // // // //             const res = await axios.post('http://localhost:5000/api/code-correction', {
// // // // // //                 code: userCode,
// // // // // //                 errorCode: errorCode
// // // // // //             });
// // // // // //             setResult(res.data.result ? "✅ Correct!" : "❌ Incorrect");
// // // // // //         } catch (err) {
// // // // // //             setResult(err.response?.data?.error || "Server error");
// // // // // //         } finally {
// // // // // //             setLoading(false);
// // // // // //         }
// // // // // //     };

// // // // // //     // Get new question
// // // // // //     const handleNewQuestion = () => {
// // // // // //         setLoading(true);
// // // // // //         axios.get('/api/generate-error')
// // // // // //             .then(res => {
// // // // // //                 setErrorCode(res.data.error_code);
// // // // // //                 setUserCode('');
// // // // // //                 setResult('');
// // // // // //             })
// // // // // //             .catch(err => setResult("Failed to load new question"))
// // // // // //             .finally(() => setLoading(false));
// // // // // //     };

// // // // // //     return (
// // // // // //         <div className="container">
// // // // // //             <h1>Code Correction Tool</h1>
            
// // // // // //             <div className="code-section">
// // // // // //                 <h3>Error Code:</h3>
// // // // // //                 <pre>{errorCode}</pre>
// // // // // //             </div>

// // // // // //             <div className="code-section">
// // // // // //                 <h3>Your Correction:</h3>
// // // // // //                 <textarea
// // // // // //                     value={userCode}
// // // // // //                     onChange={(e) => setUserCode(e.target.value)}
// // // // // //                     rows={8}
// // // // // //                     disabled={loading}
// // // // // //                 />
// // // // // //             </div>

// // // // // //             <div className="controls">
// // // // // //                 <button 
// // // // // //                     onClick={handleSubmit}
// // // // // //                     disabled={!userCode || loading}
// // // // // //                 >
// // // // // //                     {loading ? "Checking..." : "Submit Code"}
// // // // // //                 </button>
                
// // // // // //                 <button 
// // // // // //                     onClick={handleNewQuestion}
// // // // // //                     disabled={loading}
// // // // // //                 >
// // // // // //                     New Question
// // // // // //                 </button>
// // // // // //             </div>

// // // // // //             {result && <div className="result">{result}</div>}
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default CodeCorrection;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import axios from 'axios';

// // // // // // const CodeCorrection = () => {
// // // // // //   const [errorCode, setErrorCode] = useState('');
// // // // // //   const [userCode, setUserCode] = useState('');
// // // // // //   const [result, setResult] = useState('');
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // Fetch initial error code
// // // // // //   useEffect(() => {
// // // // // //     fetchErrorCode();
// // // // // //   }, []);

// // // // // //   const fetchErrorCode = async () => {
// // // // // //     try {
// // // // // //       const response = await axios.get('http://localhost:5000/api/generate-error');
// // // // // //       setErrorCode(response.data.errorCode);
// // // // // //       setUserCode(''); // Reset user code
// // // // // //       console.log(errorCode);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching error code:', error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = async () => {
// // // // // //     if (!userCode.trim()) return;
    
// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const response = await axios.post('http://localhost:5000/api/compare-code', {
// // // // // //         userCode: userCode,
// // // // // //         errorCode: errorCode
// // // // // //       });
      
// // // // // //       setResult(response.data.isCorrect ? 'Correct! 🎉' : 'Incorrect ❌');
// // // // // //     } catch (error) {
// // // // // //       console.error('Comparison error:', error);
// // // // // //       setResult('Error comparing codes');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="container">
// // // // // //       <h1>Code Correction Tool</h1>
      
// // // // // //       <div className="code-section">
// // // // // //         <h3>Error Code:</h3>
// // // // // //         <pre>{errorCode}</pre>
// // // // // //       </div>

// // // // // //       <div className="code-section">
// // // // // //         <h3>Your Correction:</h3>
// // // // // //         <textarea
// // // // // //           value={userCode}
// // // // // //           onChange={(e) => setUserCode(e.target.value)}
// // // // // //           rows={10}
// // // // // //           disabled={loading}
// // // // // //           placeholder="Enter your corrected code here..."
// // // // // //         />
// // // // // //       </div>

// // // // // //       <div className="controls">
// // // // // //         <button 
// // // // // //           onClick={handleSubmit}
// // // // // //           disabled={!userCode || loading}
// // // // // //         >
// // // // // //           {loading ? 'Checking...' : 'Submit Code'}
// // // // // //         </button>
        
// // // // // //         <button 
// // // // // //           onClick={fetchErrorCode}
// // // // // //           disabled={loading}
// // // // // //         >
// // // // // //           New Question
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {result && <div className="result">{result}</div>}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default CodeCorrection;


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import axios from 'axios';

// // // // // const CodeCorrection = () => {
// // // // //   const [errorCode, setErrorCode] = useState('');
// // // // //   const [userCode, setUserCode] = useState('');
// // // // //   const [result, setResult] = useState({
// // // // //     correct: false,
// // // // //     feedback: '',
// // // // //     improvements: []
// // // // //   });
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   // Fetch initial error code
// // // // //   useEffect(() => {
// // // // //     fetchErrorCode();
// // // // //   }, []);

// // // // //   const fetchErrorCode = async () => {
// // // // //     try {
// // // // //       const response = await axios.get('http://localhost:5000/api/generate-error');
// // // // //       setErrorCode(response.data.errorCode);
// // // // //       setUserCode('');
// // // // //       setResult({ correct: false, feedback: '', improvements: [] });
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching error code:', error);
// // // // //       setResult(prev => ({
// // // // //         ...prev,
// // // // //         feedback: 'Failed to load new question'
// // // // //       }));
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async () => {
// // // // //     if (!userCode.trim()) return;
    
// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.post('http://localhost:5000/api/validate', {
// // // // //         code: errorCode,
// // // // //         solution: userCode
// // // // //       });
      
// // // // //       setResult({
// // // // //         correct: response.data.correct,
// // // // //         feedback: response.data.feedback,
// // // // //         improvements: response.data.improvements || []
// // // // //       });
// // // // //     } catch (error) {
// // // // //       console.error('Validation error:', error);
// // // // //       setResult(prev => ({
// // // // //         ...prev,
// // // // //         feedback: 'Error validating solution',
// // // // //         improvements: []
// // // // //       }));
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="container">
// // // // //       <h1>Code Correction Tool</h1>
      
// // // // //       <div className="code-section">
// // // // //         <h3>Error Code:</h3>
// // // // //         <pre>{errorCode}</pre>
// // // // //       </div>

// // // // //       <div className="code-section">
// // // // //         <h3>Your Correction:</h3>
// // // // //         <textarea
// // // // //           value={userCode}
// // // // //           onChange={(e) => setUserCode(e.target.value)}
// // // // //           rows={10}
// // // // //           disabled={loading}
// // // // //           placeholder="Enter your corrected code here..."
// // // // //         />
// // // // //       </div>

// // // // //       <div className="controls">
// // // // //         <button 
// // // // //           onClick={handleSubmit}
// // // // //           disabled={!userCode || loading}
// // // // //         >
// // // // //           {loading ? 'Validating...' : 'Submit Solution'}
// // // // //         </button>
        
// // // // //         <button 
// // // // //           onClick={fetchErrorCode}
// // // // //           disabled={loading}
// // // // //         >
// // // // //           New Question
// // // // //         </button>
// // // // //       </div>

// // // // //       {result.feedback && (
// // // // //         <div className={`result ${result.correct ? 'success' : 'error'}`}>
// // // // //           <h3>Feedback:</h3>
// // // // //           <p>{result.feedback}</p>
          
// // // // //           {result.improvements.length > 0 && (
// // // // //             <>
// // // // //               <h4>Suggested Improvements:</h4>
// // // // //               <ul>
// // // // //                 {result.improvements.map((imp, index) => (
// // // // //                   <li key={index}>{imp}</li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //             </>
// // // // //           )}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default CodeCorrection;


// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // // // import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// // // // import "../styles/CodeCorrection.css";
// // // // import ScorePage from "./ScorePage";
// // // // import QuizProgress from "../components/QuizProgress";

// // // // const CodeCorrectionMode = () => {
// // // //   const [errorCode, setErrorCode] = useState("");
// // // //   const [userCode, setUserCode] = useState("");
// // // //   const [result, setResult] = useState({
// // // //     correct: false,
// // // //     feedback: "",
// // // //     improvements: []
// // // //   });
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [score, setScore] = useState(0);
// // // //   const [showScorePopup, setShowScorePopup] = useState(false);
// // // //   const [currentQuestion, setCurrentQuestion] = useState(0);
// // // //   const [totalQuestions] = useState(6);

// // // //   useEffect(() => {
// // // //     const fetchErrorCode = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const response = await axios.get('http://localhost:5000/api/generate-error');
// // // //         setErrorCode(response.data.errorCode);
// // // //         setUserCode(response.data.errorCode); // Initialize textarea with error code
// // // //         setLoading(false);
// // // //       } catch (err) {
// // // //         console.error("Error fetching error code:", err);
// // // //         setError(err.message);
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchErrorCode();
// // // //   }, [currentQuestion]);

// // // //   const handleSubmit = async () => {
// // // //     if (!userCode.trim()) return;
    
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.post('http://localhost:5000/api/validate', {
// // // //         code: errorCode,
// // // //         solution: userCode
// // // //       });

// // // //       setResult({
// // // //         correct: response.data.correct,
// // // //         feedback: response.data.feedback,
// // // //         improvements: response.data.improvements || []
// // // //       });

// // // //       if (response.data.correct) {
// // // //         setScore(score + 1);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Validation error:", err);
// // // //       setResult({
// // // //         correct: false,
// // // //         feedback: "Error validating solution",
// // // //         improvements: []
// // // //       });
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const nextQuestion = () => {
// // // //     if (currentQuestion < totalQuestions - 1) {
// // // //       setCurrentQuestion(prev => prev + 1);
// // // //       setResult({ correct: false, feedback: "", improvements: [] });
// // // //     } else {
// // // //       setShowScorePopup(true);
// // // //     }
// // // //   };

// // // //   const handleClosePopup = () => {
// // // //     setShowScorePopup(false);
// // // //   };

// // // //   const handleReset = () => {
// // // //     setCurrentQuestion(0);
// // // //     setScore(0);
// // // //     setShowScorePopup(false);
// // // //   };

// // // //   if (loading) {
// // // //     return <div className="practice-mode loading">Loading question...</div>;
// // // //   }

// // // //   return (
// // // //     <div className="practice-mode" style={{ marginTop: "80px" }}>
// // // //       <h2>Code Correction Practice</h2>
// // // //       <p>Find and fix the error in the given code snippet</p>

// // // //       <QuizProgress currentStep={currentQuestion + 1} totalSteps={totalQuestions} />

// // // //       {error && <p className="error-message">Error loading question: {error}</p>}

// // // //       <div className="split-container">
// // // //         <div className="left-section">
// // // //           <div className="code-container">
// // // //             <SyntaxHighlighter language="cpp" style={dracula}>
// // // //               {errorCode}
// // // //             </SyntaxHighlighter>
// // // //           </div>
// // // //         </div>

// // // //         <div className="right-section">
// // // //           <div className="code-container" style={{ width: '100%' }}>
// // // //             <textarea
// // // //               value={userCode}
// // // //               onChange={(e) => setUserCode(e.target.value)}
// // // //               className="code-editor"
// // // //               rows={15}
// // // //               disabled={loading}
// // // //               placeholder="Correct the code here..."
// // // //             />
// // // //           </div>

// // // //           <div className="button-container">
// // // //             <button 
// // // //               className="btn submit-btn" 
// // // //               onClick={handleSubmit}
// // // //               disabled={loading || result.feedback}
// // // //             >
// // // //               {loading ? 'Checking...' : 'Check Solution'}
// // // //             </button>
            
// // // //             <button 
// // // //               className="btn next-btn" 
// // // //               onClick={nextQuestion}
// // // //               disabled={!result.feedback}
// // // //             >
// // // //               Next Question
// // // //             </button>
// // // //           </div>

// // // //           {result.feedback && (
// // // //             <div className={`feedback ${result.correct ? 'success' : 'error'}`}>
// // // //               <h3>Result:</h3>
// // // //               <p>{result.feedback}</p>
              
// // // //               {result.improvements.length > 0 && (
// // // //                 <>
// // // //                   <h4>Suggested Improvements:</h4>
// // // //                   <ul>
// // // //                     {result.improvements.map((imp, index) => (
// // // //                       <li key={index}>{imp}</li>
// // // //                     ))}
// // // //                   </ul>
// // // //                 </>
// // // //               )}
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {showScorePopup && (
// // // //         <div className="popup-overlay">
// // // //           <div className="popup">
// // // //             <ScorePage
// // // //               score={score}
// // // //               totalQuestions={totalQuestions}
// // // //               onClose={handleClosePopup} 
// // // //               onReset={handleReset} 
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CodeCorrectionMode;


// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // // import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// // // import "../styles/CodeCorrection.css";
// // // import ScorePage from "./ScorePage";

// // // const CodeCorrectionMode = () => {
// // //   const [errorCode, setErrorCode] = useState("");
// // //   const [userCode, setUserCode] = useState("");
// // //   const [result, setResult] = useState({
// // //     correct: false,
// // //     feedback: "",
// // //     improvements: []
// // //   });
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [score, setScore] = useState(0);
// // //   const [attemptedQuestions, setAttemptedQuestions] = useState(0);
// // //   const [showScorePopup, setShowScorePopup] = useState(false);
// // //   const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  
// // //   useEffect(() => {
// // //     const fetchErrorCode = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const response = await axios.get('http://localhost:5000/api/generate-error');
// // //         setErrorCode(response.data.errorCode);
// // //         setUserCode(response.data.errorCode);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         console.error("Error fetching error code:", err);
// // //         setError(err.message);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchErrorCode();
// // //   }, [attemptedQuestions]);

// // //   const handleSubmit = async () => {
// // //     if (!userCode.trim()) return;
    
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.post('http://localhost:5000/api/validate', {
// // //         code: errorCode,
// // //         solution: userCode
// // //       });

// // //       setResult({
// // //         correct: response.data.correct,
// // //         feedback: response.data.feedback,
// // //         improvements: response.data.improvements || []
// // //       });

// // //       if (response.data.correct) {
// // //         setScore(prev => prev + 1);
// // //       }
// // //     } catch (err) {
// // //       console.error("Validation error:", err);
// // //       setResult({
// // //         correct: false,
// // //         feedback: "Error validating solution",
// // //         improvements: []
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const nextQuestion = () => {
// // //     setAttemptedQuestions(prev => prev + 1);
// // //     setResult({ correct: false, feedback: "", improvements: [] });
// // //   };

// // //   const handleClosePopup = () => {
// // //     setShowScorePopup(false);
// // //   };

// // //   const handleReset = () => {
// // //     setScore(0);
// // //     setAttemptedQuestions(0);
// // //     setShowScorePopup(false);
// // //   };

// // //   if (loading) {
// // //     return <div className="practice-mode loading">Loading question...</div>;
// // //   }

// // //   return (
// // //     <div className="practice-mode" style={{ marginTop: "80px" }}>
// // //       <h2>Code Correction Practice</h2>
// // //       <div className="score-display">
// // //         {attemptedQuestions > 0 && (
// // //           <p className="score-text">
// // //             Score: {score}/{attemptedQuestions} Correct Answers
// // //           </p>
// // //         )}
// // //       </div>
// // //       <p>Find and fix the error in the given code snippet</p>

// // //       {error && <p className="error-message">Error loading question: {error}</p>}

// // //       <div className="split-container">
// // //         <div className="left-section">
// // //           <div className="code-container">
// // //             <SyntaxHighlighter language="cpp" style={dracula}>
// // //               {errorCode}
// // //             </SyntaxHighlighter>
// // //           </div>
// // //         </div>

// // //         <div className="right-section">
// // //           <div className="code-container" style={{ width: '100%' }}>
// // //             <textarea
// // //               value={userCode}
// // //               onChange={(e) => setUserCode(e.target.value)}
// // //               className="code-editor"
// // //               rows={15}
// // //               disabled={loading}
// // //               placeholder="Correct the code here..."
// // //             />
// // //           </div>

          
// // //       </div>
// // //       <div className="button-container">
// // //             <button 
// // //               className="btn submit-btn" 
// // //               onClick={handleSubmit}
// // //               disabled={loading || result.feedback}
// // //             >
// // //               {loading ? 'Checking...' : 'Check Solution'}
// // //             </button>
            
// // //             <button 
// // //               className="btn next-btn" 
// // //               onClick={nextQuestion}
// // //               disabled={!result.feedback}
// // //             >
// // //               Next Question
// // //             </button>
// // //             <button 
// // //               className="btn stop-btn" 
// // //               onClick={() => setShowScorePopup(true)}
// // //             >
// // //               End Practice
// // //             </button>
// // //           </div>

// // //           {result.feedback && (
// // //             <div className={`feedback ${result.correct ? 'success' : 'error'}`}>
// // //               <h3>Result:</h3>
// // //               <p>{result.feedback}</p>
              
// // //               {result.improvements.length > 0 && (
// // //                 <>
// // //                   <h4>Suggested Improvements:</h4>
// // //                   <ul>
// // //                     {result.improvements.map((imp, index) => (
// // //                       <li key={index}>{imp}</li>
// // //                     ))}
// // //                   </ul>
// // //                 </>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       {showScorePopup && (
// // //         <div className="popup-overlay">
// // //           <div className="popup">
// // //             <ScorePage
// // //               score={score}
// // //               totalQuestions={attemptedQuestions}
// // //               onClose={handleClosePopup} 
// // //               onReset={handleReset} 
// // //             />
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default CodeCorrectionMode;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// // import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// // import "../styles/CodeCorrection.css";
// // import ScorePage from "./ScorePage";

// // const CodeCorrectionMode = () => {
// //   const [errorCode, setErrorCode] = useState("");
// //   const [userCode, setUserCode] = useState("");
// //   const [result, setResult] = useState({
// //     correct: false,
// //     feedback: "",
// //     improvements: []
// //   });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [score, setScore] = useState(0);
// //   const [attemptedQuestions, setAttemptedQuestions] = useState(0);
// //   const [showScorePopup, setShowScorePopup] = useState(false);
// //   const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);

// //   useEffect(() => {
// //     const fetchErrorCode = async () => {
// //       setLoading(true);
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/generate-error');
// //         setErrorCode(response.data.errorCode);
// //         setUserCode(response.data.errorCode);
// //         setError(null);
// //       } catch (err) {
// //         console.error("Error fetching error code:", err);
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchErrorCode();
// //   }, [attemptedQuestions]);

// //   const handleSubmit = async () => {
// //     if (!userCode.trim() || userCode === errorCode) {
// //         alert("Please modify the code before submitting");
// //         return;
// //       }

// //     setLoading(true);
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/validate', {
// //         code: errorCode,
// //         solution: userCode
// //       });

// //       setResult({
// //         correct: response.data.correct,
// //         feedback: response.data.feedback,
// //         improvements: response.data.improvements || []
// //       });

// //       if (response.data.correct) {
// //         setScore(prev => prev + 1);
// //       }
// //     } catch (err) {
// //       console.error("Validation error:", err);
// //       setResult({
// //         correct: false,
// //         feedback: err.response?.data?.error || "Validation failed. Please try again.",
// //         improvements: []
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const nextQuestion = async () => {
// //     setIsLoadingQuestion(true);
// //     try {
// //       setAttemptedQuestions(prev => prev + 1);
// //       setResult({ correct: false, feedback: "", improvements: [] });
// //     } catch (error) {
// //       console.error("Error in next question:", error);
// //     } finally {
// //       setIsLoadingQuestion(false);
// //     }
// //   };

// //   const handleClosePopup = () => setShowScorePopup(false);
// //   const handleReset = () => {
// //     setScore(0);
// //     setAttemptedQuestions(0);
// //     setShowScorePopup(false);
// //   };

// //   if (loading) {
// //     return <div className="loading-screen">Loading initial question...</div>;
// //   }

// //   return (
// //     <div className="practice-mode-c" style={{ marginTop: "80px" }}>
// //       <h2>Code Correction Practice</h2>
// //       <div className="score-display">
// //         {attemptedQuestions > 0 && (
// //           <p className="score-text">
// //             Score: {score}/{attemptedQuestions} Correct Answers
// //           </p>
// //         )}
// //       </div>
// //       <p>Find and fix the error in the given code snippet</p>

// //       {error && <p className="error-message">Error: {error}</p>}

// //       <div className="split-container-c">
// //         <div className="code-section-c left-section-c">
// //           <div className="code-container-c">
// //             <SyntaxHighlighter 
// //               language="cpp" 
// //               style={dracula}
// //               customStyle={{ height: '100%' }}
// //             >
// //               {errorCode}
// //             </SyntaxHighlighter>
// //           </div>
// //         </div>

// //         <div className="code-section-c right-section-c">
// //           <div className="code-container-c">
// //             <textarea
// //               value={userCode}
// //               onChange={(e) => setUserCode(e.target.value)}
// //               className="code-editor-c"
// //               rows={15}
// //               disabled={loading}
// //               placeholder="Correct the code here..."
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       <div className="action-container-c">
// //         <div className="button-group-c">
// //           <button 
// //             className="btn-c submit-btn-c" 
// //             onClick={handleSubmit}
// //             disabled={loading || result.feedback}
// //           >
// //             {loading ? (
// //               <>
// //                 <span className="spinner"></span>
// //                 Checking...
// //               </>
// //             ) : 'Check Solution'}
// //           </button>

// //           <button 
// //             className="btn-c next-btn-c" 
// //             onClick={nextQuestion}
// //             disabled={!result.feedback || isLoadingQuestion}
// //           >
// //             {isLoadingQuestion ? (
// //               <>
// //                 <span className="spinner-c"></span>
// //                 Loading...
// //               </>
// //             ) : 'Next Question'}
// //           </button>
// //         </div>

// //         <button 
// //           className="btn-c stop-btn-c" 
// //           onClick={() => setShowScorePopup(true)}
// //         >
// //           End Practice
// //         </button>
// //       </div>

// //       {result.feedback && (
// //         <div className={`feedback ${result.correct ? 'success' : 'error'}`}>
// //           <h3>Result:</h3>
// //           <p>{result.feedback}</p>
// //           {result.improvements.length > 0 && (
// //             <>
// //               <h4>Suggested Improvements:</h4>
// //               <ul>
// //                 {result.improvements.map((imp, index) => (
// //                   <li key={index}>{imp}</li>
// //                 ))}
// //               </ul>
// //             </>
// //           )}
// //         </div>
// //       )}

// //       {showScorePopup && (
// //         <div className="popup-overlay-c">
// //           <div className="popup-c">
// //             <ScorePage
// //               score={score}
// //               totalQuestions={attemptedQuestions}
// //               onClose={handleClosePopup} 
// //               onReset={handleReset} 
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CodeCorrectionMode;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import "../styles/CodeCorrection.css";
// import ScorePage from "./ScorePage";

// const CodeCorrectionMode = () => {
//   const [errorCode, setErrorCode] = useState("");
//   const [userCode, setUserCode] = useState("");
//   // result.correct starts as null (meaning not checked yet)
//   const [result, setResult] = useState({
//     correct: null,
//     feedback: "",
//     improvements: []
//   });
//   // initialLoading is used when the first error is fetched
//   const [initialLoading, setInitialLoading] = useState(true);
//   // requestLoading is used for check solution / next question requests
//   const [requestLoading, setRequestLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [score, setScore] = useState(0);
//   const [attemptedQuestions, setAttemptedQuestions] = useState(0);
//   const [showScorePopup, setShowScorePopup] = useState(false);
//   // Toggle for showing/hiding detailed explanation after submission
//   const [explanationVisible, setExplanationVisible] = useState(false);
//   const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);

//   // Fetch a new error code when attemptedQuestions changes
//   useEffect(() => {
//     const fetchErrorCode = async () => {
//       setInitialLoading(true);
//       try {
//         const response = await axios.get('http://localhost:5000/api/generate-error');
//         setErrorCode(response.data.errorCode);
//         setUserCode(response.data.errorCode);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching error code:", err);
//         setError(err.message);
//       } finally {
//         setInitialLoading(false);
//       }
//     };

//     fetchErrorCode();
//   }, [attemptedQuestions]);

//   const handleSubmit = async () => {
//     // Alert if code hasn't been modified
//     if (!userCode.trim() || userCode === errorCode) {
//       alert("Please modify the code before submitting");
//       return;
//     }

//     setRequestLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/api/validate', {
//         code: errorCode,
//         solution: userCode
//       });

//       // Once the solution is checked, count the question as attempted
//       setAttemptedQuestions(prev => prev + 1);

//       // Increment score only if correct
//       if (response.data.correct) {
//         setScore(prev => prev + 1);
//       }

//       setResult({
//         correct: response.data.correct,
//         feedback: response.data.feedback,
//         improvements: response.data.improvements || []
//       });

//       // Hide the explanation details until the user clicks "Show Explanation"
//       setExplanationVisible(false);
//     } catch (err) {
//       console.error("Validation error:", err);
//       setResult({
//         correct: false,
//         feedback: err.response?.data?.error || "Validation failed. Please try again.",
//         improvements: []
//       });
//     } finally {
//       setRequestLoading(false);
//     }
//   };

//   const nextQuestion = async () => {
//     setIsLoadingQuestion(true);
//     try {
//       // Reset result and explanation flag so a new question is ready
//       setResult({ correct: null, feedback: "", improvements: [] });
//       setExplanationVisible(false);
//       setError(null);
//     } catch (error) {
//       console.error("Error in next question:", error);
//     } finally {
//       setIsLoadingQuestion(false);
//     }
//   };

//   const handleClosePopup = () => setShowScorePopup(false);
//   const handleReset = () => {
//     setScore(0);
//     setAttemptedQuestions(0);
//     setShowScorePopup(false);
//   };

//   // Only show the loading screen during the initial fetch.
//   if (initialLoading) {
//     return <div className="loading-screen">Loading initial question...</div>;
//   }

//   return (
//     <div className="practice-mode-c" style={{ marginTop: "80px" }}>
//       <h2>Code Correction Practice</h2>
//       <div className="score-display">
//         {attemptedQuestions > 0 && (
//           <p className="score-text">
//             Score: {score}/{attemptedQuestions} Correct Answers
//           </p>
//         )}
//       </div>
//       <p>Find and fix the error in the given code snippet</p>

//       {error && <p className="error-message">Error: {error}</p>}

//       <div className="split-container-c">
//         <div className="code-section-c left-section-c">
//           <div className="code-container-c">
//             <SyntaxHighlighter 
//               language="cpp" 
//               style={dracula}
//               customStyle={{ height: '100%' }}
//             >
//               {errorCode}
//             </SyntaxHighlighter>
//           </div>
//         </div>

//         <div className="code-section-c right-section-c">
//           <div className="code-container-c">
//             <textarea
//               value={userCode}
//               onChange={(e) => setUserCode(e.target.value)}
//               className="code-editor-c"
//               rows={15}
//               disabled={requestLoading}
//               placeholder="Correct the code here..."
//             />
//           </div>
//         </div>
//       </div>

//       <div className="action-container-c">
//         <div className="button-group-c">
//           <button 
//             className="btn-c submit-btn-c" 
//             onClick={handleSubmit}
//             disabled={requestLoading || (result.feedback !== "")}
//           >
//             {requestLoading ? (
//               <>
//                 <span className="spinner"></span>
//                 Checking...
//               </>
//             ) : 'Check Solution'}
//           </button>

//           <button 
//             className="btn-c next-btn-c" 
//             onClick={nextQuestion}
//             disabled={isLoadingQuestion || result.correct === null}
//           >
//             {isLoadingQuestion ? (
//               <>
//                 <span className="spinner-c"></span>
//                 Loading...
//               </>
//             ) : 'Next Question'}
//           </button>
//         </div>

//         <button 
//           className="btn-c stop-btn-c" 
//           onClick={() => setShowScorePopup(true)}
//         >
//           End Practice
//         </button>
//       </div>

//       {result.feedback && (
//         <div className="feedback">
//           <h3>{result.correct ? "Correct Answer" : "Wrong Answer"}</h3>
//           {!explanationVisible && (
//             <button className="btn-c submit-btn-c" onClick={() => setExplanationVisible(true)}>
//               Show Explanation
//             </button>
//           )}
//           {explanationVisible && (
//             <div className="explanation">
//               <p>{result.feedback}</p>
//               {result.improvements.length > 0 && (
//                 <>
//                   <h4>Suggested Improvements:</h4>
//                   <ul>
//                     {result.improvements.map((imp, index) => (
//                       <li key={index}>{imp}</li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       )}

//       {showScorePopup && (
//         <div className="popup-overlay-c">
//           <div className="popup-c">
//             <ScorePage
//               score={score}
//               totalQuestions={attemptedQuestions}
//               onClose={handleClosePopup} 
//               onReset={handleReset} 
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CodeCorrectionMode;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/CodeCorrection.css";
import ScorePage from "./ScorePage";

const CodeCorrectionMode = () => {
  const [errorCode, setErrorCode] = useState("");
  const [userCode, setUserCode] = useState("");
  const [result, setResult] = useState({
    correct: null,
    feedback: "",
    improvements: []
  });
  const [questionLoading, setQuestionLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [explanationVisible, setExplanationVisible] = useState(false);

  const fetchErrorCode = async () => {
    setQuestionLoading(true);
    setUserCode("Correct the code here...");
    try {
      const response = await axios.get('http://localhost:5000/api/generate-error');
      setErrorCode(response.data.errorCode);
      setUserCode(response.data.errorCode);
      setError(null);
    } catch (err) {
      console.error("Error fetching error code:", err);
      setError(err.message);
    } finally {
      setQuestionLoading(false);
    }
  };

  useEffect(() => {
    fetchErrorCode();
  }, []);

  const handleSubmit = async () => {
    if (!userCode.trim() || userCode === errorCode) {
      alert("Please modify the code before submitting");
      return;
    }

    setRequestLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/validate', {
        code: errorCode,
        solution: userCode
      });
      setAttemptedQuestions(prev => prev + 1);
      if (response.data.correct) {
        setScore(prev => prev + 1);
      }

      setResult({
        correct: response.data.correct,
        feedback: response.data.feedback,
        improvements: response.data.improvements || []
      });
      setExplanationVisible(false);
    } catch (err) {
      console.error("Validation error:", err);
      setAttemptedQuestions(prev => prev + 1);
      setResult({
        correct: false,
        feedback: err.response?.data?.error || "Validation failed. Please try again.",
        improvements: []
      });
    } finally {
      setRequestLoading(false);
    }
  };

  const nextQuestion = async () => {
    setResult({
      correct: null,
      feedback: "",
      improvements: []
    });
    setExplanationVisible(false);
    await fetchErrorCode();
  };

  const handleClosePopup = () => setShowScorePopup(false);
  const handleReset = () => {
    setScore(0);
    setAttemptedQuestions(0);
    setShowScorePopup(false);
    fetchErrorCode();
  };

  return (
    <div className="practice-mode-c" style={{ marginTop: "80px" }}>
      <h2>Code Correction Practice</h2>
      <div className="score-display">
        {attemptedQuestions > 0 && (
          <p className="score-text">
            Score: {score}/{attemptedQuestions} Correct Answers
          </p>
        )}
      </div>
      <p>Find and fix the error in the given code snippet</p>

      {error && <p className="error-message">Error: {error}</p>}

      <div className="split-container-c">
        <div className="code-section-c left-section-c">
          <div className="code-container-c">
            {questionLoading ? (
              <div className="loading-question">Loading question...</div>
            ) : (
              <SyntaxHighlighter 
                language="cpp" 
                style={dracula}
                customStyle={{ height: '100%' }}
              >
                {errorCode}
              </SyntaxHighlighter>
            )}
          </div>
        </div>

        <div className="code-section-c right-section-c">
          <div className="code-container-c">
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="code-editor-c"
              rows={15}
              disabled={requestLoading}
              placeholder="Correct the code here..."
            />
          </div>
        </div>
      </div>

      <div className="action-container-c">
        <div className="button-group-c">
          <button 
            className="btn-c submit-btn-c" 
            onClick={handleSubmit}
            disabled={requestLoading || result.feedback !== ""}
          >
            {requestLoading ? (
              <>
                <span className="spinner-c"></span>
                Checking...
              </>
            ) : 'Check Solution'}
          </button>

          <button 
            className="btn-c next-btn-c" 
            onClick={nextQuestion}
            disabled={result.feedback === ""}
          >
            Next Question
          </button>
        </div>

        <button 
          className="btn-c stop-btn-c" 
          onClick={() => setShowScorePopup(true)}
        >
          End Practice
        </button>
      </div>

      {result.feedback && (
        <div className={`feedback-c ${result.correct ? "right" : "wrong"}`}>
          <h3 style={{ textAlign: "center" }}>
            {result.correct ? "Correct Answer" : "Wrong Answer"}
          </h3>
          {!explanationVisible && (
            <div style={{ textAlign: "center", margin: "10px" }}>
              <button className="explain-btn-c" onClick={() => setExplanationVisible(true)}>
                Show Explanation
              </button>
            </div>
          )}
          {explanationVisible && (
            <div className="explanation">
              <p>{result.feedback}</p>
              {/* {result.improvements.length > 0 && (
                <>
                  <h4>Suggested Improvements:</h4>
                  <ul>
                    {result.improvements.map((imp, index) => (
                      <li key={index}>{imp}</li>
                    ))}
                  </ul>
                </>
              )} */}
            </div>
          )}
        </div>
      )}

      {showScorePopup && (
        <div className="popup-overlay-c">
          <div className="popup-c">
            <ScorePage
              score={score}
              totalQuestions={attemptedQuestions}
              onClose={handleClosePopup} 
              onReset={handleReset} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeCorrectionMode;

