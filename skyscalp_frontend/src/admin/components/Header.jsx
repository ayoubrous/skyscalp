import React, { useEffect, useState } from 'react'
import logo from '../assets/images/profile/user-1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

import MainNavbar from '../../components/navbar/Navbar'

export default function Header() {
  const [profileImage, setProfileImage] = useState('')
  const navigate = useNavigate()
  const authData = useAuth()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setProfileImage(user.profileImage)
  }, [])

  const toggleSidebar = () => {
    document.querySelector(".left-sidebar").style.left = 0
  }
  const logout = () => {
    localStorage.clear()
    authData.logout()
    navigate('../')
  }
  return (
    <>
      {/* <MainNavbar /> */}
      <header className="app-header d-none">
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item d-block d-xl-none toggleSidebar" onClick={toggleSidebar}>
              <a className="nav-link sidebartoggler nav-icon-hover" id="headerCollapse" >
                <i className="ti ti-menu-2"></i>
              </a>
            </li>
          </ul>
          <div className="navbar-collapse justify-content-end px-0" id="navbarNav">
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              <button className='btn btn-danger btn-sm' onClick={logout}>Logout</button>
              <div className="nav-item dropdown">
                <div className="nav-link nav-icon-hover" id="drop2" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <img src={profileImage} alt="" width="35" height="35" className="rounded-circle" />
                </div>
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                  <div className="message-body">
                    <Link to='../admin/profile' className="d-flex align-items-center gap-2 dropdown-item">
                      <i className="ti ti-user fs-6"></i>
                      <p className="mb-0 fs-3">My Profile</p>
                    </Link>
                    <button className="btn btn-outline-danger mx-3 mt-2 d-block" onClick={logout}>Logout</button>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </nav>
      </header>
    </>
  )
}
