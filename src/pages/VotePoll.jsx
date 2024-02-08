import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import swal from 'sweetalert';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

const VotePoll = () => {

  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('socket_user')).token;
  const [poll, setPoll] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
          const response = await fetch(`https://poll-backend-0pt9.onrender.com/api/polls/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
          });
          const json = await response.json()
          if (response.ok) {
            setPoll(json);
            console.log(poll);
          }
      } catch (err) {
        swal("Oops!", "Something went wrong...", "error");
        console.log(err);
      }
    }
    fetchPost()
    // eslint-disable-next-line
  }, [])

  const [selectedOption, setSelectedOption] = useState('');
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  const handleSubmit = async () => {
    try {

        const response = await fetch(`https://poll-backend-0pt9.onrender.com/api/polls/vote/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({selectedOption})
        });
        const json = await response.json()

        if (response.ok) {
            swal("Success!", "Poll Voted", "success").then(() => {
              navigate(`/result/${id}`);
            })
        } else {
            swal("Oops!", json.error, "error");
        }
    } catch (error) {
        console.log(error)
        swal("Oops!", "Something went wrong...");
    }
  };
  return (
    <>
      <Navbar />
      {
          poll === null
          ?
          <Spinner />
          :
          <div className="container" style={{ marginTop: "5rem", marginBottom: "3rem" }}>
            <div className="row justify-content-center">
              <div className="d-flex flex-column align-items-center justify-content-center">
              <h1 class="card-title" style={{color: "green"}}>{poll[0].question}</h1>
              <h5 className='mt-2'>Select an option:</h5>
              <div class="">
                  {poll[0].options.map((option, index) => (
                    <div class="form-check">
                      <input
                      class="form-check-input" name="flexRadioDefault" id="flexRadioDefault1"
                        type="radio"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                      />
                      {option}
                      <label key={index} class="form-check-label">
                      </label>
                    </div>
                  ))}

                  <p>Selected Option: {selectedOption}</p>
                </div>
              </div>
            </div>
            <div className='mt-2 d-flex flex-column align-items-center justify-content-center'>
              <button type="button" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
         
      }
    </>
  )
}

export default VotePoll