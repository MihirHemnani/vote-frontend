import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Resgister from './pages/Register'
import Error404 from './pages/Error404'
import Create from './pages/Create'
import Profile from './pages/Profile'
import './App.css'
import Vote from './pages/Vote'
import VotePoll from './pages/VotePoll'
import ResultPoll from './pages/ResultPoll'
import UserPolls from './pages/UserPolls'
import { useAuthContext } from './hooks/useAuthContext'

const App = () => {

    const {user} = useAuthContext();

    return (
        <>
        <Router>
            <Routes>
                <Route path="/" element={user ? <Home /> : <Navigate to='/api/login'/>} />
                <Route path="/api/login" element={!user ? <Login /> : <Navigate to='/'/>} />
                <Route path="/api/register" element={!user ? <Resgister /> : <Navigate to='/'/> } />
                <Route path="/create" element={user ? <Create /> : <Navigate to='/api/login'/> } />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to='/api/login'/> } />
                <Route path="/vote" element={user ? <Vote /> : <Navigate to='/api/login'/> } />
                <Route path="/vote/:id" element={user ? <VotePoll /> : <Navigate to='/api/login'/> } />
                <Route path="/result/:id" element={user ? <ResultPoll /> : <Navigate to='/api/login'/> } />
                <Route path="/userpolls" element={user ? <UserPolls /> : <Navigate to='/api/login'/> } />
                <Route path="/*" element={<Error404 /> } />
            </Routes>
        </Router>
        
        </>
    );
}

export default App