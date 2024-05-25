import React, { useEffect } from 'react'
import logo from '../../assets/images/logo.png'
import { FaBuilding, FaCashRegister, FaChair, FaClock, FaGear, FaMessage, FaMoneyBill, FaRegHeart, FaRegMessage, FaUser } from 'react-icons/fa6'
import { Link, NavLink } from 'react-router-dom'
import { FaTools } from 'react-icons/fa'
import { TbCarCrane } from 'react-icons/tb'
import { BsBuildingsFill } from 'react-icons/bs'

export default function Sidebar() {
    const hideSidebar = () => {
        document.querySelector(".left-sidebar").style.left = "-270px"
    }
    return (
        <aside className="left-sidebar">
            <div>
                <div className="brand-logo d-flex align-items-center justify-content-between mt-2">
                    <Link to="../" className="text-nowrap logo-img">
                        <img src={logo} width="130" alt="" />
                    </Link>
                    <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse" onClick={hideSidebar}>
                        <i className="ti ti-x fs-8"></i>
                    </div>
                </div>
                <nav className="sidebar-nav scroll-sidebar mt-3" data-simplebar="">
                    <ul id="sidebarnav ">
                        <li className="sidebar-item mt-4">
                            <NavLink to='../app/dashboard' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <i className="ti ti-layout-dashboard"></i>
                                </span>
                                <span className="hide-menu">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../app/properties' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <BsBuildingsFill className='me-1' />
                                </span>
                                <span className="hide-menu">Properties</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../app/machinery' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <TbCarCrane className='me-1' />
                                </span>
                                <span className="hide-menu">Machinery & Tools</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../app/construction' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <FaTools className='me-1' />
                                </span>
                                <span className="hide-menu">Building Materials</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../app/furniture' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <FaChair className='me-1' />
                                </span>
                                <span className="hide-menu">Furniture, Appliances</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../app/favourites' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
                                <span>
                                    <FaRegHeart className='me-1' />
                                </span>
                                <span className="hide-menu">Favourites</span>
                            </NavLink>
                        </li>
                        <li className="sidebar-item mt-1">
                            <NavLink to='../app/messages' className={(navData) => (navData.isActive ? "active sidebar-link" : 'none sidebar-link')} aria-expanded="false">
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
