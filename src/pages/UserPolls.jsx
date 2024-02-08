import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

const UserPolls = () => {

    // const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('socket_user')).token;
    const id = JSON.parse(localStorage.getItem('socket_user')).id;
    const [polls, setPoll] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await fetch(`http://localhost:8000/api/polls/userpolls/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
              const json = await response.json()
              if (response.ok) {
                setPoll(json);
              }
          } catch (err) {
            swal("Oops!", "Something went wrong...", "error");
            console.log(err);
          }
        }
        fetchPost()
        // eslint-disable-next-line
      }, [])


      console.log(polls)


    return (
        <>
            <Navbar />
            {
                polls === null
                ?
                <Spinner />
                :
                <div>
                    <h1 className="p-2" style={{ textAlign: "center", color: "green" }}>Polls Created</h1>
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
                                        <div className='col-12'>
                                            <div className='p-2 col-lg-4 m-auto' style={{textAlign: "center", border: "0.1vh dashed black"}}>
                                                <h1>{poll.question} </h1>   
                                                {poll.options.map((option, index) => (
                                                    <div className='mt-2 p-2'
                                                    style={{textAlign: "center",  border: "0.1vh solid black"}}
                                                    key={index}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                )
                        }
                    </div>
                </div>
                
            }
        </>
    )
}

export default UserPolls