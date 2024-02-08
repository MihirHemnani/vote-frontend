import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';

const Profile = () => {

    const token = JSON.parse(localStorage.getItem('socket_user')).token;
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/user/profile`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const json_form = await response.json()

                if (response.ok) {
                    setUserProfile(json_form)
                }
            } catch (error) {
                console.error('Error fetching user profile:', error.response);
            }
        };
    
        fetchUserProfile();
      }, []);
    
    if (!userProfile) {
        return <Spinner />;
    }

    return (
        <>
            <Navbar />
            <h2 className='p-2' style={{textAlign: "center"}}>User Profile</h2>
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div class="card" style={{alignItems: "center"}}>
                    <img style={{maxWidth: "50%", maxHeight: "50vh"}} 
                    src={`data:image/jpeg;base64,${userProfile.photo}`} alt="profilephoto" />
                    <div className="card-body">
                        <h5 className="card-title">Details</h5>
                        <table className="table table-bordered" style={{overflow: "auto"}}>
                            <tbody>
                                <tr>
                                <td>Name</td>
                                <td>{userProfile.username}</td>
                                </tr>
                                <tr>
                                <td>Email</td>
                                <td>{userProfile.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='mt-2'>
                            <Link to={`/userpolls`} className="card" style={{ textDecoration: "none", margin: 'auto' }}> 
                                <button type="button" class="btn btn-primary">Polls Created</button>
                            </Link>
                        </div>

                        <div className='mt-2'>
                            <Link to={`/vottedpolls`} className="card" style={{ textDecoration: "none", margin: 'auto' }}> 
                                <button type="button" class="btn btn-success">Polls Voted</button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
  )
}

export default Profile

/*
const UserProfile = () => {

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {userProfile.username}</p>
      <p>Email: {userProfile.email}</p>
      {userProfile.profilePicture && (
        <img
          src={`http://localhost:3001/uploads/${userProfile.profilePicture}`} // Replace with your server's image upload path
          alt="Profile"
        />
      )}
      <h3>Created Polls</h3>
      <ul>
        {userProfile.createdPolls.map((poll) => (
          <li key={poll._id}>{poll.question}</li>
        ))}
      </ul>
      <h3>Voted Polls</h3>
      <ul>
        {userProfile.votedPolls.map((poll) => (
          <li key={poll._id}>{poll.question}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;

*/