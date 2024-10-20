import React from 'react'
import { FaEnvelope, FaFacebook, FaFacebookF, FaInstagram, FaLocationArrow, FaPhone } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import logoHalf from '../../assets/images/logo.png'
export default function Footer() {
    const [t] = useTranslation()

    return (
        <footer className="footer">
            <div className="custom-container">
                <div className="row justify-content-between">
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                        {/* <h4 className='text-white'>LOGO</h4> */}
                        <img src={logoHalf} alt="" width={130}/>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                        <h4 className='mb-5 text-white'>{t("supportInfo")}</h4>

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
                                <p>help@skyscalp.com</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <FaPhone />
                            <div>
                                <p>+33 771759956</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-3">
                        <h4 className='mb-5 text-white'>{t("company")}</h4>

                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='../' className="text-white">{t("home")}</Link>
                            </div>
                        </div>
                        {/* <div clpassName="d-flex gap-3 mb-3">
                            <div>
                                <Link to='../properties?type=buy' className="text-white">{t("buy")}</Link>
                            </div>
                        </div> */}
                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='../experts' className="text-white">{t("Experts")}</Link>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='../marketplace?market=1' className="text-white">{t("machineryTools")}</Link>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='../marketplace?market=2' className="text-white">{t("buildingMaterial")}</Link>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='../marketplace?market=3' className="text-white">{t("furnitureAppliances")}</Link>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div>
                                <Link to='../app/dashboard' className="text-white">{t("publish")}</Link>
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
                        <p className="color-secondary">{t("allrightsreserved")} - &copy; SkyScalp {new Date().getFullYear()}</p>
                    </div>

                </div>
            </div>
        </footer>
    )
}
