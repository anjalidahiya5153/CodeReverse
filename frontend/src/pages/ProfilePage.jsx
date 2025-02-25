import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const ProfilePage = () => {
  console.log('UserProfile component mounted');
  const { user } = useContext(AuthContext);
  console.log('User from context:', user);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('before getting token in profilepage')
        const token = localStorage.getItem('token');
        console.log('after getting token')
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Profile data:', response.data);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setLoading(false);
      }
    };

    if(user){
        fetchProfile();
    }  
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h1>Welcome, {profile.username}</h1>
      <p>Email: {profile.email}</p>
      <p>Score: {profile.score}</p>
      <h2>Questions Solved</h2>
      <ul>
        {profile.solvedQuestions.map(q => (
          <li key={q._id}>{q.title}</li>
        ))}
      </ul>
      <h2>Bookmarked Questions</h2>
      <ul>
        {profile.bookmarkedQuestions.map(q => (
          <li key={q._id}>{q.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
