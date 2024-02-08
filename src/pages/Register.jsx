import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import Navbar from "./Navbar"
import swal from "sweetalert"
import { Spinner } from '../components/Spinner'
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Resgister = () => {
    const { login } = useLogin();
    const [loader, setLoader] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [profile, setProfile] = useState("")

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
      
          reader.onload = () => {
            resolve(reader.result.split(',')[1]); 
          };
      
          reader.onerror = (error) => {
            reject(error);
          };
      
          if (file) {
            reader.readAsDataURL(file);
          } else {
            reject(new Error('File not provided'));
          }
        });
      };

    const handlePhotoChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setProfile(base64)
    };

    const onSubmit = async data => {
        setLoader(true);

        const register_user = {
            username: data.username,
            email: data.email,
            photo: profile
        }

        try {
            const response = await fetch(`http://localhost:8000/api/user/signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register_user)
            })

            if (response === null) {
                setLoader(true);
            } else {
                setLoader(false);
            }


            // eslint-disable-next-line
            const json = await response.json()

            if (response.ok) {
                reset({ username: "", email: "", photo: null });
                swal("Success!", "Successfully Registered...", "success").then(() => {
                    navigate("/api/login")
                })
                
                await login(data.username, reset).then(() => {
                    setLoader(false)
                })

            } else {
                swal("Warning!", json.error, "warning");
            }
            // console.log(json)

        } catch (err) {
            swal("Oops!", "Something went wrong...", "error");
            console.log(err);
        }
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
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="card">

                                        <div className="card-body">

                                            <div className="pt-1">
                                                <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                                <p className="text-center small">Enter your personal details to create account</p>
                                            </div>

                                            <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>

                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Username</label>
                                                    <input type="text"
                                                        autoComplete="off"
                                                        {...register("username", { required: 'required field' })}
                                                        className="form-control" id="yourUsername" />
                                                    <p>{errors.username?.message}</p>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourEmail" className="form-label">Your Email</label>
                                                    <input type="email"
                                                        {...register("email", { required: 'required field' })}
                                                        className="form-control" id="yourEmail" />
                                                    <p>{errors.email?.message}</p>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourPhoto" className="form-label">Your Photo</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        {...register("photo", { required: 'required field' })}
                                                        className="form-control"
                                                        id="yourPhoto"
                                                        onChange={(e) => handlePhotoChange(e)}
                                                    />
                                                    <p>{errors.photo?.message}</p>
                                                    {/* <img src={previewPhoto} alt="Preview" style={{ maxWidth: '50%', marginTop: '10px' }} /> */}
                                                </div>


                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100" type="submit">Create Account</button>
                                                </div>
                                                <div className="col-12">
                                                    <p className="small mb-0">Already have an account? <Link to="/api/login">Log in</Link></p>
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

export default Resgister