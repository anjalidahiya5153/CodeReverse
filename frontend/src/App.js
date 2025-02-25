// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PracticeMode from "./pages/PracticeMode";
import ChallengeMode from "./pages/ChallengeMode";
import Leaderboard from "./pages/Leaderboard";
import { AuthProvider } from "./auth/AuthContext";
import QuestionsPage from "./pages/QuestionsPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/practicemode" element={<PracticeMode/>} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/challengemode" element={<ChallengeMode/>} />
          <Route path="/leaderboard" element={<Leaderboard/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
    </AuthProvider>
  );
}

export default App;
