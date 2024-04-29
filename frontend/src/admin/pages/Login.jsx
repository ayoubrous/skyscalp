import React, { useState } from 'react'
import bg1 from '../assets/images/building-1.jpg'
import logo from '../../assets/images/logo.png'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const notify = () => toast.error('Here is your toast.');
    const handleLogin = (e) => {
        e.preventDefault()
        if (email.length === 0 || password.length === 0) {
            toast.error('Email and Password could not be empty')
        }
    }
    return (
        <div className="d-lg-flex half">
            <Toaster toastOptions={{
                style: {
                    border: '1px solid #713200',
                    padding: '10px',
                    color: '#713200',
                },
            }} />
            <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${bg1})` }}></div>
            <div className="contents order-2 order-md-1">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7">
                            <h3 className='color-primary'>Login to <strong>SKYSCALP</strong></h3>
                            {/* <small className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</small> */}
                            <form action="" method="post" onSubmit={handleLogin} className='mt-4'>
                                <div className="form-group first mb-3">
                                    <label htmlFor="email" className='color-secondary'>Email*</label>
                                    <input type="email" className="form-control" placeholder="your-email@gmail.com" id="email" />
                                </div>
                                <div className="form-group last mb-1">
                                    <label htmlFor="password" className='color-secondary'>Password*</label>
                                    <input type="password" className="form-control" placeholder="Your Password" id="password" />
                                </div>
                                <div className="d-flex mb-4 align-items-center justify-content-end">
                                    <small className="ml-auto"><a href="/" className="forgot-pass">Forgot Password</a></small>
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
                                    <small className="ml-auto"><Link to="../app/register" className="forgot-pass">Create New Account</Link></small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
