import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { FaAngleDown, FaArrowUp, FaBarsStaggered } from "react-icons/fa6";


export default function Navbar() {
    const navDrpRef = useRef()
    const langDrpRef = useRef()
    const [t, i18n] = useTranslation();

    const [selectedLanguage, setSelectedLanguage] = useState('EN')

    const [showNavInPhone, setShowNavInPhone] = useState(false)
    const [showGoToTopArrow, setShowGoToTopArrow] = useState(false)
    const [showDrp, setshowDrp] = useState(false)
    const [showLangDrp, setShowLangDrp] = useState(false)
    const handleLanguageChange = (newLanguage) => {
        setSelectedLanguage(newLanguage);
        i18n.changeLanguage(newLanguage.toString().toLowerCase());
        setShowLangDrp(false)
    };

    useEffect(() => {
        const handleScroll = () => {
            let scrollPosition = window.scrollY
            if (scrollPosition > 200) {
                setShowGoToTopArrow(true)
            }
            else {
                setShowGoToTopArrow(false)
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])


    const handleClickOutside = (e) => {
        if (navDrpRef.current && !navDrpRef.current.contains(e.target)) {
            setshowDrp(false);
        }
        if (langDrpRef.current && !langDrpRef.current.contains(e.target)) {
            setShowLangDrp(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleGoToTop = () => {
        window.scrollTo(0, 0)
    }
    return (
        <>
            <nav className="navbar">
                <Link to='/' className="logo">
                    <img src={logo} alt="web-logo" />
                </Link>
                <div className={`links-section ${showNavInPhone ? 'show' : ''}`}>
                    <div className="commercial-links links">
                        <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/properties?type=buy" >{t("buy")}</NavLink>
                        <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/properties?type=rent" >{t("rent")}</NavLink>
                        <Link className="link" onClick={() => setshowDrp(true)} >{t("build")}
                            <div className={`link-dropdown ${showDrp ? 'show' : ''}`} ref={navDrpRef}>
                                <Link to="/machinery" className='link-dropdown-item' onClick={() => setshowDrp(false)}>{t("machinery")}</Link>
                                <Link to="/construction" className='link-dropdown-item' onClick={() => setshowDrp(false)}>{t("construction")}</Link>
                            </div>
                        </Link>
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
                    <div className="link" style={{position: "relative"}}>
                        <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={()=>setShowLangDrp(!showLangDrp)}>
                            <p>{selectedLanguage}</p>
                            <FaAngleDown />
                        </div>
                        <div className={`custom-dropdown ${showLangDrp ? 'show': ''}`} style={{minWidth: "60px"}} ref={langDrpRef}>
                            <div className="custom-dropdown-item" onClick={() => handleLanguageChange('EN')}>EN</div>
                            <div className="custom-dropdown-item" onClick={() => handleLanguageChange('FR')}>FR</div>
                        </div>
                    </div>
                    {/* <select
                        value={selectedLanguage}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        className="custom-select">
                        <option value="en">EN</option>
                        <option value="fr">FR</option>
                    </select> */}
                </div>
                <FaBarsStaggered className='bars-icon' onClick={() => setShowNavInPhone(!showNavInPhone)} />
            </nav>
            <div className={`up-arrow ${showGoToTopArrow ? 'show' : ''}`} onClick={handleGoToTop}>
                <FaArrowUp className='icon' />
            </div>
        </>
    )
}
