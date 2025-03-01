import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const ProfilePage = () => {
  console.log('UserProfile component mounted');
  const { user } = useContext(AuthContext);
  console.log('User from context:', user);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       console.log('before getting token in profilepage')
  //       const token = localStorage.getItem('token');
  //       console.log('after getting token')
  //       const response = await axios.get('http://localhost:5000/api/auth/profile', {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       console.log('Profile data:', response.data);
  //       setProfile(response.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Failed to fetch profile:', error);
  //       setLoading(false);
  //     }
  //   };

  //   if(user){
  //       fetchProfile();
  //   }  
  // }, [user]);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                setLoading(false);
                return;
            }
            console.log('Fetching profile with token:', token);
            const response = await axios.get('http://localhost:5000/api/auth/profile', {
                headers: { Authorization: `Bearer ${token}`, },
            });
            console.log('Profile data:', response.data);
            setProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        fetchProfile();
    } else {
        setLoading(false);
    }
}, [user]);

if (loading) return <div>Loading...</div>;

if (!profile) return <div>No profile data available</div>;



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


// ProfilePage.jsx
// import React, { useContext, useEffect } from 'react';
// import { AuthContext } from '../auth/AuthContext';

// const ProfilePage = () => {
//     const { user } = useContext(AuthContext);

//     useEffect(() => {
//         console.log('UserProfile component mounted');
//         console.log('User from context:', user);
//     }, [user]);

//     if (!user) {
//         return <p>Loading...</p>;
//     }

//     return (
//         <div>
//             <h1>Welcome, {user.name}</h1>
//             <p>Email: {user.email}</p>
//         </div>
//     );
// };

// export default ProfilePage;
