import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const [t, i18n] = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState('en')
    const handleLanguageChange = (newLanguage) => {
        setSelectedLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="web-logo" />
            </div>
            <div className="links-section">
                <div className="commercial-links links">
                    <Link className='link' to="/" >{t("buy")}</Link>
                    <Link className='link' to="/" >{t("rent")}</Link>
                    <Link className='link' to="/" >{t("build")}</Link>
                    <Link className='link' to="/" >{t("publish")}</Link>
                </div>
                <div className="about-company-links links">
                    <Link className='link' to="/" >{t("home")}</Link>
                    <Link className='link' to="/" >{t("about")}</Link>
                    <Link className='link' to="/" >{t("estimate")}</Link>
                </div>
            </div>
            <div className="account">
                <Link className='link' to="/" >{t("login")}</Link>
                <Link>
                    <button className='custom-btn'>{t("signup")}</button>
                </Link>
                <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="custom-select">
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                </select>
            </div>
        </nav>
    )
}
