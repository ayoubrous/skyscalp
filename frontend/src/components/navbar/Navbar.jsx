import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { FaBarsStaggered } from "react-icons/fa6";


export default function Navbar() {
    const [t, i18n] = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState('en')

    const [showNavInPhone, setShowNavInPhone] = useState(false)

    const handleLanguageChange = (newLanguage) => {
        setSelectedLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };
    return (
        <nav className="navbar">
            <Link to='/' className="logo">
                <img src={logo} alt="web-logo" />
            </Link>
            <div className={`links-section ${showNavInPhone ? 'show' : ''}`}>
                <div className="commercial-links links">
                    <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/properties" >{t("buy")}</NavLink>
                    <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/properties" >{t("rent")}</NavLink>
                    <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/construction" >{t("build")}</NavLink>
                    <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/contact" >{t("estimate")}</NavLink>
                    <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/" >{t("publish")}</NavLink>
                </div>
                <div className="about-company-links links">
                    <NavLink to='/' className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false">{t("home")}</NavLink>
                    <NavLink to='/about' className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false">{t("about")} </NavLink>

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
            <FaBarsStaggered className='bars-icon' onClick={() => setShowNavInPhone(!showNavInPhone)} />
        </nav>
    )
}
