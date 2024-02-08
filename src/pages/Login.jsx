import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { useLogin } from '../hooks/useLogin';
import Navbar from "./Navbar"
import { useState } from "react";
import { Spinner } from "../components/Spinner";

const Login = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // eslint-disable-next-line
    const { login, reset_ } = useLogin();
    const [loader, setLoader] = useState(false);

    const onSubmit = async (data) => {
        setLoader(true)
        await login(data.username, reset).then(() => {
            setLoader(false)
        })
    }

    return (
        <>
            <Navbar />
            {loader
                ?
                <Spinner />
                :
                <div className="container">

                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center">
                        <div className="container" style={{ marginTop: "5rem", marginBottom: "3rem" }}>
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6  d-flex flex-column align-items-center justify-content-center">

                                    <div className="card">

                                        <div className="card-body" style={{ textDecoration: 'none' }}>

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                            </div>

                                            <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>

                                                <div className="col-12">
                                                    <label htmlFor="yourEmail" className="form-label">Username</label>
                                                    <div className="input-group has-validation">
                                                        <input type="text"
                                                            autoComplete="off"
                                                            {...register("username", { required: 'required field' })}
                                                            className="form-control" id="yourName" />
                                                    </div>
                                                    <p>{errors.username?.message}</p>
                                                </div>

                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Login</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Don't have account? <Link to="/api/register">Create an account</Link></p>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            }
        </>
    )
}

export default Login
