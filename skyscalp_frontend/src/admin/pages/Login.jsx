import React, { useEffect, useRef, useState } from 'react'
// import bg1 from '../assets/images/building-1.jpg'
import { Link, useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from '../../context/AuthContext';
import faviconLogo from '../../assets/images/logo-half.png'
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/sections/Footer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

export default function Login() {

    const { login } = useAuth()
    const pass = useRef()

    useEffect(() => {
        document.title = "Skyscalp - Login"
        const favicon = document.querySelector('link[rel="icon"]');
        favicon.href = faviconLogo;
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault()
        if (email.length === 0 || password.length === 0) {
            toast.error('Email and Password could not be empty')
        }
        else {
            let data = {
                email: email,
                password: password
            }

            setIsLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify(data);

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (!result.status) {
                        toast.error(result.message)
                    }
                    else {
                        if (result.data.status) {
                            if (result.data.isAdmin) {
                                toast.success(result.message)
                                login(result.data, false)
                                localStorage.setItem("user", JSON.stringify({
                                    userID: result.data._id,
                                    isLoggedIn: true,
                                    isAdmin: true,
                                    profileImage: result.data.profileImage,
                                    email: result.data.email,
                                    username: result.data.username,
                                    phone: result.data.phone
                                }))
                                setTimeout(() => {
                                    navigate('../admin/dashboard')
                                }, 500);
                            }
                            else {
                                toast.success(result.message)
                                login(result.data, false)
                                // localStorage.setItem("user", JSON.stringify(result.data))
                                localStorage.setItem("user", JSON.stringify({
                                    userID: result.data._id,
                                    isLoggedIn: true,
                                    isAdmin: false,
                                    profileImage: result.data.profileImage,
                                    email: result.data.email,
                                    username: result.data.username,
                                    phone: result.data.phone
                                }))
                                setTimeout(() => {
                                    navigate('../app/dashboard')
                                }, 500);
                            }

                        }
                        else {
                            toast.error("Your account is blocked! Contact skyscalp support")
                        }

                    }

                })
                .catch((error) => {
                    setIsLoading(false)
                    console.error(error)
                });
        }
    }

    const togglePasswordVisibility = (inputRef, setShowState) => {
        setShowState(prev => !prev);
        inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
    };
    return (
        <>
            <Navbar />
            <div className="d-lg-flex half">
                <ToastContainer />
                <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${window.location.origin}/static/media/building-1.9e4d3fc0e7638a34f5ef.jpg)` }}></div>
                <div className="contents order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7">
                                <h3 className='color-primary'>Login to <strong>SKYSCALP</strong></h3>
                                {/* <small className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</small> */}
                                <form action="" method="post" onSubmit={handleLogin} className='mt-4 registerForm'>
                                    <div className="form-group first mb-3">
                                        <label htmlFor="email" className='color-secondary'>Email*</label>
                                        <input type="email" className="form-control" placeholder="your-email@gmail.com" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group last mb-1">
                                        <label htmlFor="password" className='color-secondary'>Password*</label>
                                        <input type="password" className="form-control" placeholder="Your Password" id="password" ref={pass} value={password} onChange={e => setPassword(e.target.value)} />
                                        {showPassword ?
                                            <FaEyeSlash className='eye-icon' onClick={() => togglePasswordVisibility(pass, setShowPassword)} /> :
                                            <FaEye className='eye-icon' onClick={() => togglePasswordVisibility(pass, setShowPassword)} />
                                        }
                                    </div>
                                    <div className="d-flex mb-4 align-items-center justify-content-end">
                                        <small className="ml-auto"><Link to="../forgot-password" className="forgot-pass">Forgot Password</Link></small>
                                    </div>
                                    <button className="custom-btn d-block w-100" type='submit'>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <ClipLoader
                                                color="#fff"
                                                loading={isLoading}
                                                size={20}
                                                aria-label="Loading Spinner"
                                                data-testid="loader"
                                            />
                                            {
                                                !isLoading && ("Login")
                                            }

                                        </div>
                                    </button>
                                    <div className="d-flex mt-2 align-items-center justify-content-center">
                                        <small className="ml-auto"><Link to="../register" className="forgot-pass">Create New Account</Link></small>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
