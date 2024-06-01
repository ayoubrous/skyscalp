import React, { useState } from 'react'
import bg1 from '../assets/images/building-1.jpg'
import logo from '../../assets/images/logo.png'
import profileImg from '../assets/images/profile/user-1.jpg'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";


export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
        if (email.length === 0 || password.length === 0 || username.length === 0) {
            toast.error('Email and Password could not be empty')
        }
        else {
            if (password.length < 6) {
                toast.error("Password should be 6 characters long.")
            }
            else {
                let data = {
                    username: username,
                    email: email,
                    password: password,
                    phone: phone,
                    profileImage: profileImg,
                    status: true
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

                fetch(`${process.env.REACT_APP_SERVER_URL}/api/register`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        setIsLoading(false)
                        if (!result.status) {
                            toast.error(result.message)
                        }
                        else{
                            toast.success(result.message)
                        }

                    })
                    .catch((error) => {
                        setIsLoading(false)
                        console.error(error)
                    });
            }
        }


    }
    return (
        <div className="d-lg-flex half">
            <Toaster toastOptions={{
                duration: 5000,
                style: {
                    border: '1px solid #713200',
                    padding: '10px',
                    color: '#713200',
                },
            }} />
            {/* <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${bg1})` }}></div> */}
            <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${window.location.origin}/static/media/building-1.9e4d3fc0e7638a34f5ef.jpg)` }}></div>
            
            <div className="contents order-2 order-md-1">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-7">
                            <h3 className='color-primary'>Create new Account</h3>
                            {/* <small className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</small> */}
                            <form action="" method="post" onSubmit={handleRegister} className='mt-4'>
                                <div className="form-group first mb-3">
                                    <label htmlFor="username" className='color-secondary'>Username*</label>
                                    <input type="text" className="form-control" placeholder="John Doe" id="username" onChange={e => setUsername(e.target.value)} value={username} />
                                </div>
                                <div className="form-group first mb-3">
                                    <label htmlFor="phone" className='color-secondary'>Phone</label>
                                    <input type="text" className="form-control" placeholder="33-332-333" id="phone" onChange={e => setPhone(e.target.value)} value={phone} />
                                </div>
                                <div className="form-group first mb-3">
                                    <label htmlFor="email" className='color-secondary'>Email*</label>
                                    <input type="email" className="form-control" placeholder="your-email@gmail.com" id="email" onChange={e => setEmail(e.target.value)} value={email} />
                                </div>
                                <div className="form-group last mb-3">
                                    <label htmlFor="password" className='color-secondary'>Password*</label>
                                    <input type="password" className="form-control" placeholder="Your Password" id="password" onChange={e => setPassword(e.target.value)} value={password} />
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
                                            !isLoading && ("Register")
                                        }

                                    </div>
                                </button>
                                <div className="d-flex mt-2 align-items-center justify-content-center">
                                    <span className="ml-auto">
                                        <Link to="../app/login" className="forgot-pass">Login Instead</Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
