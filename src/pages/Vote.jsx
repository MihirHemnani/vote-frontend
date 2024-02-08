import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';
import { Spinner } from '../components/Spinner';
import Navbar from './Navbar';
import SinglePoll from './SinglePoll';

const Vote = () => {
    
    const token = JSON.parse(localStorage.getItem('socket_user')).token;
    const [polls, setPolls] = useState(null)

    useEffect(() => {
        // async and await
        const fetchPosts = async () => {
            try {
                const response = await fetch("https://poll-backend-0pt9.onrender.com/api/polls", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const json_form = await response.json()

                if (response.ok) {
                    setPolls(json_form);
                    console.log(json_form)
                }

            } catch (err) {
                swal("Oops!", "Something went wrong...", "error");
                console.log(err);
            }

        }

        // calling the function
        fetchPosts();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Navbar />
            {polls === null
                ?
                <Spinner />
                :
                <div className="min-vh-100" style={{ position: "relative", marginTop: '6rem' }}>
                    <h1 className="p-2" style={{ textAlign: "center" }}>Polls</h1>
                    <div className="row mb-3" style={{ marginLeft: "0", marginRight: "0" }}>
                        {
                            polls.length === 0
                                ?
                                (
                                    <p style={{ textAlign: 'center' }}>No polls to display</p>
                                )
                                :
                                (
                                    polls.map((poll) => (
                                        <SinglePoll key={poll._id} poll={poll} />
                                    ))
                                )
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Vote