import React, { useEffect } from 'react'
import logo from '../../../assets/images/logo.png'
import faviconLogo from '../../../assets/images/logo-half.png'

import { FaBuilding, FaCashRegister, FaClock, FaGear, FaLocationArrow, FaMessage, FaMoneyBill, FaNoteSticky, FaRegHeart, FaRegMessage, FaUser, FaUsers } from 'react-icons/fa6'
import { Link, NavLink } from 'react-router-dom'
import { FaTools } from 'react-icons/fa'
import { TbCarCrane } from 'react-icons/tb'
import { BsBuildingsFill } from 'react-icons/bs'

export default function Sidebar() {
    useEffect(() => {
        document.title = "Skyscalp - Admin Panel"
        const favicon = document.querySelector('link[rel="icon"]');
        favicon.href = faviconLogo;
    }, [])
    const hideSidebar = () => {
        document.querySelector(".left-sidebar").style.left = "-270px"
    }
    return (
        <aside className="left-sidebar admin">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between mt-2">
                    <Link to="../app/dashboard" className="text-nowrap logo-img">
                        <img src={logo} width="130" alt="" />
                    </Link>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse" onClick={hideSidebar}>
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>
                <nav className="sidebar-nav scroll-sidebar mt-3" data-simplebar="">
                    <ul id="sidebarnav ">
                        <li className="sidebar-item mt-4">
                            <NavLink to='../admin/dashboard' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <i className="ti ti-layout-dashboard"></i>
                                </span>
                                <span className="hide-menu">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../admin/locations' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <FaLocationArrow className='me-1' />
                                </span>
                                <span className="hide-menu">Add Locations</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../admin/users' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <FaUsers className='me-1' />
                                </span>
                                <span className="hide-menu">Users</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../admin/properties' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <BsBuildingsFill className='me-1' />
                                </span>
                                <span className="hide-menu">Properties</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../admin/materials' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <FaTools className='me-1' />
                                </span>
                                <span className="hide-menu">Marketplace</span>
                            </NavLink>
                        </li>

                        <li className="sidebar-item mt-1">
                            <NavLink to='../admin/articles' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <FaNoteSticky className='me-1' />
                                </span>
                                <span className="hide-menu">Articles</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../admin/messages' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <FaRegMessage className='me-1' />
                                </span>
                                <span className="hide-menu">Messages</span>
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>
    )
}