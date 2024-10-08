import React, { useRef, useState } from 'react'
import bg1 from '../assets/images/building-1.jpg'
import logo from '../../assets/images/logo.png'
import profileImg from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/sections/Footer';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';


export default function Register() {
const [t] = useTranslation()
    const pass = useRef()
    const cPass = useRef()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleRegister = (e) => {
        e.preventDefault()
        if (email.length === 0 || password.length === 0 || username.length === 0) {
            toast.error(t('Email and Password could not be empty'))
        }
        else {
            if (password.length < 6) {
                toast.error(t("Password should be 6 characters long"))
            }
            else if (password !== cpassword) {
                toast.error(t("Password and Confirm Password should be same"))
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
                        else {
                            toast.success(t("A verification email is sent to your account, please verify from mail account"))
                        }

                    })
                    .catch((error) => {
                        setIsLoading(false)
                        console.error(error)
                    });
            }
        }


    }

    const togglePasswordVisibility = (inputRef, setShowState) => {
        setShowState(prev => !prev);
        inputRef.current.type = inputRef.current.type === 'password' ? 'text' : 'password';
    };
    return (
        <>
            <Navbar />
            <div className="d-lg-flex half" style={{ minHeight: "636px" }}>
                <ToastContainer />
                {/* <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${bg1})` }}></div> */}
                <div className="bg order-1 order-md-2" style={{ backgroundImage: `url(${window.location.origin}/static/media/building-1.9e4d3fc0e7638a34f5ef.jpg)` }}></div>

                <div className="contents registerWrapper order-2 order-md-1">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-7">
                                <h3 className='color-primary mt-3'>{t("Create New Account")}</h3>
                                {/* <small className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</small> */}
                                <form action="" method="post" onSubmit={handleRegister} className='mt-4 registerForm'>
                                    <div className="form-group first mb-3">
                                        <label htmlFor="username" className='color-secondary'>{t("username")}*</label>
                                        <input type="text" className="form-control" placeholder="John Doe" id="username" onChange={e => setUsername(e.target.value)} value={username} />
                                    </div>
                                    <div className="form-group first mb-3">
                                        <label htmlFor="phone" className='color-secondary'>{t("phone")}</label>
                                        {/* <input type="text" className="form-control" placeholder="33-332-333" id="phone" onChange={e => setPhone(e.target.value)} value={phone} /> */}
                                        <PhoneInput
                                            country={'fr'}
                                            value={phone}
                                            onChange={setPhone}
                                        />
                                    </div>

                                    <div className="form-group first mb-3">
                                        <label htmlFor="email" className='color-secondary'>{t("Email")}*</label>
                                        <input type="email" className="form-control" placeholder="your-email@gmail.com" id="email" onChange={e => setEmail(e.target.value)} value={email} />
                                    </div>
                                    <div className="form-group last mb-3">
                                        <label htmlFor="password" className='color-secondary'>{t("Password")}*</label>
                                        <input type="password" className="form-control" placeholder={t("Password")} ref={pass} id="password" onChange={e => setPassword(e.target.value)} value={password} />

                                        {showPassword ?
                                            <FaEyeSlash className='eye-icon' onClick={() => togglePasswordVisibility(pass, setShowPassword)} /> :
                                            <FaEye className='eye-icon' onClick={() => togglePasswordVisibility(pass, setShowPassword)} />
                                        }
                                    </div>
                                    <div className="form-group last mb-3">
                                        <label htmlFor="cpassword" className='color-secondary'>{t("Confirm Password")}*</label>
                                        <input type="password" className="form-control" placeholder={t("Retype password")} ref={cPass} id="cpassword" onChange={e => setCPassword(e.target.value)} value={cpassword} />
                                        {showConfirmPassword ?
                                            <FaEyeSlash className='eye-icon' onClick={() => togglePasswordVisibility(cPass, setShowConfirmPassword)} /> :
                                            <FaEye className='eye-icon' onClick={() => togglePasswordVisibility(cPass, setShowConfirmPassword)} />
                                        }
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
                                                !isLoading && t("Register")
                                            }

                                        </div>
                                    </button>
                                    <div className="d-flex mt-2 align-items-center justify-content-center">
                                        <span className="ml-auto">
                                            <Link to="../login" className="forgot-pass">{t("Login Instead")}</Link>
                                        </span>
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
