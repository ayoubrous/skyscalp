import React from 'react'
import { FaEnvelope, FaFacebook, FaFacebookF, FaInstagram, FaLocationArrow, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="custom-container">
                <div className="row justify-content-between">
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                        <h4 className='text-white'>LOGO</h4>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                        <h4 className='mb-5 text-white'>Support Information</h4>

                        <div className="d-flex gap-3 mb-3">
                            <FaLocationArrow />
                            <div>
                                <p>093 Street Paris,</p>
                                <p>Paris, France</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <FaEnvelope />
                            <div>
                                <p>gmailacc@gmail.com</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <FaPhone />
                            <div>
                                <p>+33 443 332 22</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                        <h4 className='mb-5 text-white'>Company</h4>

                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='/'>Home</Link>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='/'>Buy</Link>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='/'>Build</Link>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='/'>Publish</Link>
                            </div>
                        </div>
                    </div>
                </div>


                <hr />

                <div className="row justify-content-between">
                    <div className="col-sm-12 col-md-6 col-lg-6 mb-2 mt-1">
                        <Link to="/">
                            <FaFacebookF className='text-white me-3' />
                        </Link>
                        <Link to="/">
                            <FaInstagram className='text-white me-3' />
                        </Link>
                        <Link to="/">
                            <FaXTwitter className='text-white me-3' />
                        </Link>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-6 mb-2 mt-1 text-lg-end text-sm-start">
                        <p className="color-secondary">All Rights Reserved - &copy; SkyScalp {new Date().getFullYear()}</p>
                    </div>

                </div>
            </div>
        </footer>
    )
}
