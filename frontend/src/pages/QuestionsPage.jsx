// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/Questions.css";

// const QuestionsPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTag, setSearchTag] = useState(""); // State for the search input
//   const [searchTagTitle, setSearchTagTitle] = useState("");
//   // useEffect(() => {
//   //   const fetchQuestions = async () => {
//   //     try {
//   //       const response = await axios.get("http://localhost:5000/api/questions");
//   //       setQuestions(response.data);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Failed to fetch questions:", error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchQuestions();
//   // }, []);

//   const handleSearch = async () => {
//     setLoading(true); // Show loading while fetching filtered results
//     try {
//       const response = await axios.get(`http://localhost:5000/api/questions?tags=${searchTag}`);
//       setQuestions(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to search by tag:", error);
//       setLoading(false);
//     }
//   };

//   const handleSearchByTitle = async() =>{
//     setLoading(true); // Show loading while fetching filtered results
//     try {
//       const response = await axios.get(`http://localhost:5000/api/questions/search?title=${searchTag}`);
//       setQuestions(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to search by tag:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="questions-page">
//       <h1 className="page-title">Questions</h1>

//       {/* Search Input */}
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by tags"
//           value={searchTag}
//           onChange={(e) => setSearchTag(e.target.value)}
//           className="search-input"
//         />
//         <button onClick={handleSearch} className="search-button">
//           Search
//         </button>
//       </div>

//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by title"
//           value={searchTagTitle}
//           onChange={(e) => setSearchTagTitle(e.target.value)}
//           className="search-input"
//         />
//         <button onClick={handleSearchByTitle} className="search-button">
//           Search
//         </button>
//       </div>

//       {/* Questions List */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="questions-container">
//           {questions.length > 0 ? (
//             questions.map((question) => (
//               <div className="question-card" key={question._id}>
//                 <h2 className="question-title">{question.title}</h2>
//                 <p className="question-description">{question.description}</p>
//                 <div className="question-meta">
//                   <span className="question-score">Score: {question.score}</span>
//                   <span className="question-difficulty">
//                     Difficulty: {question.difficulty}
//                   </span>
//                   <div className="question-tags">
//                     {question.tags.map((tag, index) => (
//                       <span key={index} className="tag">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <button className="solve-button">Solve</button>
//               </div>
//             ))
//           ) : (
//             <p>No questions found for the given tag.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionsPage;




import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Questions.css";

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTag, setSearchTag] = useState(""); // State for the tag search input
  const [searchTagTitle, setSearchTagTitle] = useState(""); // State for the title search input

  // Fetch questions
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/questions");
      const token = localStorage.getItem("token");
      const userResponse = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const solvedQuestions = userResponse.data.solvedQuestions || [];
      const bookmarkedQuestions = userResponse.data.bookmarkedQuestions || [];

      // Add `isSolved` and `isBookmarked` flags to the questions
      const updatedQuestions = response.data.map((question) => ({
        ...question,
        isSolved: solvedQuestions.includes(question._id),
        isBookmarked: bookmarkedQuestions.includes(question._id),
      }));

      setQuestions(updatedQuestions);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle tag search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/questions?tags=${searchTag}`);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to search by tag:", error);
      setLoading(false);
    }
  };

  // Handle title search
  const handleSearchByTitle = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/questions/search?title=${searchTagTitle}`);
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to search by title:", error);
      setLoading(false);
    }
  };

  // Handle marking a question as solved
  const handleSolve = async (questionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/users/solve/${questionId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchQuestions(); // Refresh the questions list
    } catch (error) {
      console.error("Failed to mark question as solved:", error);
    }
  };

  // Handle bookmarking a question
  const handleBookmark = async (questionId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/users/bookmark/${questionId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchQuestions(); // Refresh the questions list
    } catch (error) {
      console.error("Failed to bookmark question:", error);
    }
  };

  return (
    <div className="questions-page">
      <h1 className="page-title">Questions</h1>

      {/* Search Inputs */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by tags"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTagTitle}
          onChange={(e) => setSearchTagTitle(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearchByTitle} className="search-button">Search</button>
      </div>

      {/* Questions List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="questions-container">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div className="question-card" key={question._id}>
                <h2 className="question-title">{question.title}</h2>
                <p className="question-description">{question.description}</p>
                <div className="question-meta">
                  <span className="question-score">Score: {question.score}</span>
                  <span className="question-difficulty">Difficulty: {question.difficulty}</span>
                  <div className="question-tags">
                    {question.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                {/* Solve and Bookmark Buttons */}
                <button
                  className={`solve-button ${question.isSolved ? "solved" : ""}`}
                  onClick={() => handleSolve(question._id)}
                >
                  {question.isSolved ? "Unmark as Solved" : "Mark as Solved"}
                </button>
                <button
                  className={`bookmark-button ${question.isBookmarked ? "bookmarked" : ""}`}
                  onClick={() => handleBookmark(question._id)}
                >
                  {question.isBookmarked ? "Unbookmark" : "Bookmark"}
                </button>
              </div>
            ))
          ) : (
            <p>No questions found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionsPage;
