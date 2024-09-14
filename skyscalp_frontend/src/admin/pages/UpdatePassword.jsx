import React, { useEffect, useState } from 'react'
import bg1 from '../assets/images/building-1.jpg'
import logo from '../../assets/images/logo.png'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/navbar/Navbar';


export default function UpdatePassword() {
    const [t] = useTranslation()

    const { login } = useAuth()

    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const location = useLocation()

    const handleLogin = (e) => {
        e.preventDefault()
        if (password.length === 0) {
            toast.error('Password can not be empty')
        }
        else if (password.length < 7) {
            toast.error('Password should be greater than 6 characters')
        }
        else {
            let data = {
                password: password,
            }

            let id = '';
            const queryParams = new URLSearchParams(location.search);
            id = queryParams.get('uid');

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

            fetch(`${process.env.REACT_APP_SERVER_URL}/api/updatePassword?id=${id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    setIsLoading(false)
                    if (!result.status) {
                        toast.error(result.message)
                    }
                    else {
                        toast.success(result.message)
                        setTimeout(() => {
                            navigate('../login')
                        }, 800);
                    }

                })
                .catch((error) => {
                    setIsLoading(false)
                    console.error(error)
                });
        }
    }
    return (
        <>
            <Navbar />
            <div className="d-lg-flex half">
                <Toaster toastOptions={{
                    duration: 5000,
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
                                <h3 className='color-primary'>{t("update")} {t("Password")} - <strong>SKYSCALP</strong></h3>
                                {/* <small className="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</small> */}
                                <form action="" method="post" onSubmit={handleLogin} className='mt-4'>
                                    <div className="form-group first mb-3">
                                        <label htmlFor="password" className='color-secondary'>{t("new")} {t("Password")}*</label>
                                        <input type="password" className="form-control" placeholder="" id="password" value={password} onChange={e => setPassword(e.target.value)} />
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
                                                !isLoading && t("Update")
                                            }

                                        </div>
                                    </button>
                                    <div className="d-flex mt-2 align-items-center justify-content-center">
                                        <small className="ml-auto"><Link to="../login" className="forgot-pass">{t("Login")}</Link></small>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
