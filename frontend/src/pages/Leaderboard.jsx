import React, { useState } from 'react';
import axios from '../api/apiClient';
import '../styles/Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState('');
  const [userScore, setUserScore] = useState(null);
  const [error, setError] = useState(null);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get('/leaderboard');
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  const searchUserScore = async () => {
    try {
      const res = await axios.get(`/leaderboard/user/${searchUsername}`);
      setUserScore(res.data);
      setError(null);
    } catch (err) {
      setUserScore(null);
      if (err.response && err.response.status === 404) {
        setError('User not found');
      } else {
        setError('Failed to fetch user score');
      }
    }
  };

  React.useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <button onClick={searchUserScore}>Search</button>
      </div>
      {userScore && (
        <div className="user-score">
          <p>
            <strong>Username:</strong> {userScore.username}
          </p>
          <p>
            <strong>Score:</strong> {userScore.score}
          </p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
