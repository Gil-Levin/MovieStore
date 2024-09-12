// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import AuthContext from '../context/authContext';

// const Profile = () => {
//   const { isAuthenticated } = useContext(AuthContext); // Access AuthContext
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isAuthenticated) {
//       const fetchProfile = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.get('http://localhost:7178/api/user/profile', {
//             headers: {
//               Authorization: `Bearer ${token}`, // Pass the token to the API
//             },
//           });
//           setProfile(response.data);
//         } catch (error) {
//           console.error('Error fetching profile:', error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchProfile();
//     }
//   }, [isAuthenticated]);

//   if (loading) return <p>Loading profile...</p>;

//   if (!profile) return <p>No profile information available.</p>;

//   return (
//     <div className="profile-container">
//       <h2>Profile Information</h2>
//       <p><strong>Name:</strong> {profile.name}</p>
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>User Type:</strong> {profile.userType}</p>
//       {profile.profilePicture && (
//         <img
//           src={profile.profilePicture}
//           alt="Profile"
//           style={{ width: '150px', height: '150px', borderRadius: '50%' }}
//         />
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/authContext';

const Profile = () => {
//   const { isAuthenticated } = useContext(AuthContext); // Access AuthContext
  
//   const user = localStorage.getItem('user')

const user = JSON.parse(localStorage.getItem('user'));
//   if (loading) return <p>Loading profile...</p>;

//   if (!profile) return <p>No profile information available.</p>;

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User Type:</strong> {user.userType}</p>
      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
      )}
    </div>
  );
};

export default Profile;
