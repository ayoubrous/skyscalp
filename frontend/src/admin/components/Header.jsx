import React from 'react'
import logo from '../assets/images/profile/user-1.jpg'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const toggleSidebar = () => {
    document.querySelector(".left-sidebar").style.left = 0
  }
  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin')
    sessionStorage.removeItem('adminUser')
    navigate('../admin/login')
  }
  return (
    <header className="app-header">
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
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon-hover" href="/" id="drop2" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src={logo} alt="" width="35" height="35" className="rounded-circle" />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                <div className="message-body">
                  <Link to='../admin/profile' className="d-flex align-items-center gap-2 dropdown-item">
                    <i className="ti ti-user fs-6"></i>
                    <p className="mb-0 fs-3">My Profile</p>
                  </Link>
                  <button className="btn btn-outline-danger mx-3 mt-2 d-block" onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
