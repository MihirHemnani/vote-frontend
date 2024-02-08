import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("socket_user")) || null

    const { logout } = useLogout();
    const handleLogout = () => {
        logout()
    }
    // console.log(user)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                <div className="container-fluid" style={{ textAlign: 'center' }}>
                    <Link to='/' className="navbar-brand"><h2 style={{ marginLeft: "1rem" }}>Poll App</h2></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto">

                        </ul>
                        <ul className="navbar-nav mt-1">
                            {user ?
                                (

                                    <>
                                        <li className="nav-item">
                                            <Link to='/profile' className="nav-link" aria-current="page">Profile</Link>
                                        </li>

                                        <li className="nav-item">
                                            <button type="button" className="btn btn-danger" onClick={handleLogout} style={{ marginRight: '1rem', marginLeft: '1rem' }}>Logout</button>
                                        </li>
                                    </>

                                ) :
                                (
                                    <>
                                        <li className="nav-item">
                                            <Link to='/api/login' className="nav-link">Login</Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to='/api/register' className="nav-link">Register</Link>
                                        </li>

                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
