import React, { useState } from 'react'
import Navbar from './Navbar'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    
    const token = JSON.parse(localStorage.getItem('socket_user')).token;
    const navigate = useNavigate();

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleCreatePoll = async () => {
        try {

            const response = await fetch(`http://localhost:8000/api/polls`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({question, options})
            });
            const newPoll = await response.json()

            if (response.ok) {
                setQuestion('');
                setOptions(['', '']);
                swal("Success!", "Poll Created", "success").then(() => {
                    navigate(`/create`);
                })
            } else {
                swal("Oops!", newPoll.error, "error");

            }
            // Optionally, you can reset the form or navigate to another page
            setQuestion('');
            setOptions(['', '']);
        } catch (error) {
            // Handle errors, e.g., show an error message to the user
            console.log(error)
            swal("Oops!", "all feilds required");
        }
    };

    return (
        <>
            <Navbar />

            <div className='container mt-3'>
                <div className='row'>
                    <div className='col mb-3' style={{textAlign: "center"}}>
                        <h2>Create a New Poll</h2>
                    </div>
                    <input type="text" className="p-2" placeholder="Enter your question" value={question} onChange={(e) => setQuestion(e.target.value)} />
                    
                    <div className='row justify-content-md-center'>
                        {options.map((option, index) => (
                            <div className='col-12 col-md-auto'>
                                <input
                                className='mt-2 p-2'
                                style={{textAlign: "center"}}
                                key={index}
                                type="text"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                            </div>
                            
                        ))}
                    </div>

                    <button className='p-2 mt-2 ' onClick={handleAddOption}>Add Option</button>
                    <button className='p-2 mt-2' onClick={handleCreatePoll}>Create Poll</button>
                </div>
            </div>
            
        </>
    )
}

export default Create