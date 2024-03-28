import React from 'react'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="web-logo" />
            </div>
            <div className="links-section">
                <div className="commercial-links links">
                    <Link className='link' to="/" >Buy</Link>
                    <Link className='link' to="/" >Rent</Link>
                    <Link className='link' to="/" >Build</Link>
                    <Link className='link' to="/" >Publish</Link>
                </div>
                <div className="about-company-links links">
                    <Link className='link' to="/" >Home</Link>
                    <Link className='link' to="/" >About</Link>
                    <Link className='link' to="/" >Estimate</Link>
                </div>
            </div>
            <div className="account">
                <Link className='link' to="/" >LOGIN</Link>
                <Link>
                    <button className='custom-btn'>SIGN UP</button>
                </Link>
                <select className="custom-select">
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                </select>
            </div>
        </nav>
    )
}
