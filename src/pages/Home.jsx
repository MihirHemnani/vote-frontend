import Navbar from "./Navbar";
import { Link } from "react-router-dom";


const Home = () => {
    
    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: "10rem", marginBottom: "3rem" }}>
                <div className="row justify-content-center">
                    <div className="d-flex flex-column justify-content-center" style={{textAlign: "center"}}>
                        
                        <Link to='/create' className="nav-link" aria-current="page">
                            <div class="p-3 mb-4 bg-primary text-white">Create a Poll</div>
                        </Link>

                        <Link to='/vote' className="nav-link" aria-current="page">
                            <div class="p-3 mb-4 bg-secondary text-white">Vote a Poll</div>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home