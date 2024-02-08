import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import { Spinner } from '../components/Spinner';
import { useParams } from 'react-router-dom';

const ResultPoll = () => {
    const { id } = useParams();
    const token = JSON.parse(localStorage.getItem('socket_user')).token;
    const [poll, setPoll] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`https://poll-backend-0pt9.onrender.com/api/polls/${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const json_form = await response.json()

                if (response.ok) {
                    setPoll(json_form)
                    console.log(poll)
                }
            } catch (error) {
                console.error('Error fetching user profile:', error.response);
            }
        };
    
        fetchUserProfile();
      }, []);
    
    if (!poll) {
        return <Spinner />;
    }

    return (
        <>
            <Navbar />
            <div className="col-12 mt-5 mb-2">
            <div className="card-body card-colour" style={{border: "0.1vh dashed black"}}>
                <h1 className="card-title" style={{ color: 'black', textAlign: "center", color:"red"}}>{poll[0].question}</h1>
                    <div className="min-vh-100" style={{ position: "relative", marginTop: '6rem' }}>
                        <h1 className="p-2" style={{ textAlign: "center" }}>Answers</h1>
                            <div className="row mb-3" style={{ marginLeft: "0", marginRight: "0" }}>
                                {
                                    poll[0].votes.length === 0
                                        ?
                                        (
                                            <p style={{ textAlign: 'center' }}>No Answers</p>
                                        )
                                        :
                                        <table className="table table-bordered table-success">
                                        <thead>
                                            <tr className="table-dark">
                                            <th scope="col">User</th>
                                            <th scope="col">Option Selected</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {poll[0].votes.map((vote, index) => (
                                                <tr className="table-success" key={index}>
                                                    <td>{vote.userId}</td>
                                                    <td>{vote.option}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        </table>
                                }
                            </div>
                    </div>
                
            </div>
        </div>
        </>
  )
}

export default ResultPoll
