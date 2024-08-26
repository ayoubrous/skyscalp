import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { FaAngleDown, FaArrowUp, FaBarsStaggered } from "react-icons/fa6";
import { useAuth } from '../../context/AuthContext';


export default function Navbar() {
    const navDrpRef = useRef()
    const langDrpRef = useRef()
    const [t, i18n] = useTranslation();

    const mobileNavDropdown = useRef()
    const profileDrpRef = useRef()

    // const [selectedLanguage, setSelectedLanguage] = useState('EN')
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language.toUpperCase());


    const authData = useAuth()
    const [showNavInPhone, setShowNavInPhone] = useState(false)
    const [showGoToTopArrow, setShowGoToTopArrow] = useState(false)
    const [showDrp, setshowDrp] = useState(false)
    const [showLangDrp, setShowLangDrp] = useState(false)
    const [showProfileDrp, setShowProfileDrp] = useState(false)

    const navigate = useNavigate()
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
        if (mobileNavDropdown.current && !mobileNavDropdown.current.contains(e.target)) {
            setShowNavInPhone(false)
        }
        if (profileDrpRef.current && !profileDrpRef.current.contains(e.target)) {
            setShowProfileDrp(false)
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

    const logout = () => {
        localStorage.clear()
        authData.logout()
        navigate('../')
    }
    return (
        <>
            <nav className="navbar">
                <Link to='/' className="logo">
                    <img src={logo} alt="web-logo" />
                </Link>
                <div className={`links-section ${showNavInPhone ? 'show' : ''}`} ref={mobileNavDropdown}>
                    <div className="commercial-links links">
                        <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/properties?type=buy" >{t("buy")}</NavLink>
                        <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/properties?type=rent" >{t("rent")}</NavLink>
                        <div style={{ cursor: "pointer" }} className="link" onClick={() => setshowDrp(true)} >{t("marketplace")}
                            <div className={`link-dropdown ${showDrp ? 'show' : ''}`} ref={navDrpRef}>
                                <Link to="/marketplace?market=1" className='link-dropdown-item' onClick={() => setshowDrp(false)}>{t("machineryTools")}</Link>
                                <Link to="/marketplace?market=2" className='link-dropdown-item' onClick={() => setshowDrp(false)}>{t("buildingMaterial")}</Link>
                                <Link to="/marketplace?market=3" className='link-dropdown-item' onClick={() => setshowDrp(false)}>{t("furnitureAppliances")}</Link>
                            </div>
                        </div>
                        <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/estimate" >{t("estimate")}</NavLink>
                        <NavLink className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false" to="/app/dashboard" >{t("publish")}</NavLink>
                    </div>
                    <div className="about-company-links links">
                        <NavLink to='/' className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false">{t("home")}</NavLink>
                        <NavLink to='/about' className={(navData) => (navData.isActive ? "active link" : 'link')} aria-expanded="false">{t("about")} </NavLink>

                    </div>
                </div>
                <div className="account">
                    {
                        authData.isLoggedIn ? (
                            <>
                                <div className="profile-nav">
                                    <div className="image" onClick={() => { showProfileDrp ? setShowProfileDrp(false) : setShowProfileDrp(true) }}>
                                        <img src={authData.userData.profileImage} alt="" />
                                    </div>
                                    <div className={`custom-dropdown squeeze-left ${showProfileDrp ? 'show' : ''}`} ref={profileDrpRef}>
                                        <Link to='../app/dashboard'>
                                            <div className='custom-dropdown-item'>{t("Dashboard")}</div>
                                        </Link>
                                        <div className='custom-dropdown-item' onClick={logout}>{t("Logout")}</div>

                                    </div>
                                </div>
                            </>
                        )
                            : (
                                <>
                                    <Link className='link' to="../login" >{t("login")}</Link>
                                    <Link to='../register'>
                                        <button className='custom-btn'>{t("signup")}</button>
                                    </Link>
                                </>
                            )
                    }

                    <div className="link" style={{ position: "relative" }}>
                        <div className="d-flex align-items-center gap-1" style={{ cursor: "pointer" }} onClick={() => setShowLangDrp(!showLangDrp)}>
                            <p>{selectedLanguage}</p>
                            <FaAngleDown />
                        </div>
                        <div className={`custom-dropdown ${showLangDrp ? 'show' : ''}`} style={{ minWidth: "60px" }} ref={langDrpRef}>
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
                </div >
                <FaBarsStaggered className='bars-icon' onClick={() => setShowNavInPhone(!showNavInPhone)} />
            </nav >
            <div className={`up-arrow ${showGoToTopArrow ? 'show' : ''}`} onClick={handleGoToTop}>
                <FaArrowUp className='icon' />
            </div>
        </>
    )
}
