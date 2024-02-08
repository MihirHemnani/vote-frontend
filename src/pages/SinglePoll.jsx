import React from 'react'
import { Link } from 'react-router-dom'

const SinglePoll = ({poll}) => {

  const user = JSON.parse(localStorage.getItem('socket_user')).id;

  return (
    <>
        <div className="col-12 mt-5 mb-2">
            <div className="card-body card-colour" style={{border: "0.1vh dashed black"}}>
                <h5 className="card-title" style={{ color: 'black', textAlign: "center" }}>{poll.question}</h5>
                
                {poll.votes.some(vote => vote.userId === user) ? (
                  <Link to={`/result/${poll._id}`} className="card" style={{ textDecoration: "none", margin: 'auto' }}>
                      <button type="button" class="btn btn-primary">See Results</button>
                  </Link>
                )
                :
                (
                  <Link to={`/vote/${poll._id}`} className="card" style={{ textDecoration: "none", margin: 'auto' }}>
                      <button type="button" class="btn btn-primary">Vote</button>
                  </Link>
                )
              }
            </div>
        </div>
    </>
  )
}

export default SinglePoll