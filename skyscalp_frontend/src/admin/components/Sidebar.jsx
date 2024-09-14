import React from 'react'
import logo from '../../assets/images/logo.png'
import { FaBuilding, FaCashRegister, FaChair, FaClock, FaGear, FaMessage, FaMoneyBill, FaRegHeart, FaRegMessage, FaUser, FaUsers } from 'react-icons/fa6'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaTools } from 'react-icons/fa'
import { TbCarCrane } from 'react-icons/tb'
import { BsBuildingsFill } from 'react-icons/bs'
import Navbar from '../../components/navbar/Navbar'
import { useTranslation } from 'react-i18next'
import { LuSofa } from 'react-icons/lu'
import { GiConcreteBag } from 'react-icons/gi'

export default function Sidebar() {
    const [t] = useTranslation()
    const location = useLocation();

    const hideSidebar = () => {
        document.querySelector(".left-sidebar").style.left = "-270px"
    }

    const isRouteActive = (paths) => {
        return paths.some(path => location.pathname.includes(path));
    };

    return (
        <>
            <Navbar />
            <aside className="left-sidebar">
                <div>
                    <div className="brand-logo d-flex align-items-center justify-content-between mt-2">
                        <Link to="../" className="text-nowrap logo-img">
                            {/* <img src={logo} width="130" alt="" /> */}
                        </Link>
                        <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse" onClick={hideSidebar}>
                            <i className="ti ti-x fs-8"></i>
                        </div>
                    </div>
                    <nav className="sidebar-nav scroll-sidebar mt-3" data-simplebar="">
                        <ul id="sidebarnav ">
                            <li className="sidebar-item mt-4">
                                <NavLink
                                    to='../app/dashboard'
                                    className={isRouteActive(['/dashboard']) ? "active sidebar-link" : 'none sidebar-link'}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <i className="ti ti-layout-dashboard"></i>
                                    </span>
                                    <span className="hide-menu">{t("dashboard")}</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item mt-1">
                                <NavLink
                                    to='../app/properties'
                                    className={isRouteActive(['/properties', '/add-property', '/update-property']) ? "active sidebar-link" : 'none sidebar-link'}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <BsBuildingsFill className='me-1' />
                                    </span>
                                    <span className="hide-menu">{t("properties")}</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item mt-1">
                                <NavLink
                                    to='../app/machines'
                                    className={isRouteActive(['/machines', '/add-machine', '/update-machine']) ? "active sidebar-link" : 'none sidebar-link'}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <TbCarCrane className='me-1' />
                                    </span>
                                    <span className="hide-menu">{t("machineryTools")}</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item mt-1">
                                <NavLink
                                    to='../app/materials'
                                    className={isRouteActive(['/materials', '/add-material', '/update-material']) ? "active sidebar-link" : 'none sidebar-link'}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <GiConcreteBag className='me-1' />
                                    </span>
                                    <span className="hide-menu">{t("materials")}</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item mt-1">
                                <NavLink
                                    to='../app/furniture'
                                    className={isRouteActive(['/furniture', '/add-furniture', '/update-furniture']) ? "active sidebar-link" : 'none sidebar-link'}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <LuSofa className='me-1' />
                                    </span>
                                    <span className="hide-menu">{t("furnitureAppliances")}</span>
                                </NavLink>
                            </li>

                            <li className="sidebar-item mt-1">
                                <NavLink
                                    to='../app/experts'
                                    className={isRouteActive(['/experts', '/add-expert', '/update-expert']) ? "active sidebar-link" : 'none sidebar-link'}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <FaUsers className='me-1' />
                                    </span>
                                    <span className="hide-menu">{t("Experts")}</span>
                                </NavLink>
                            </li>

                            <li className="sidebar-item mt-1">
                                <NavLink
                                    to='../app/favourites'
                                    className={isRouteActive(['/favourites']) ? "active sidebar-link" : 'none sidebar-link'}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <FaRegHeart className='me-1' />
                                    </span>
                                    <span className="hide-menu">{t("favourites")}</span>
                                </NavLink>
                            </li>
                            <li className="sidebar-item mt-1">
                                <NavLink
                                    to='../app/messages'
                                    className={isRouteActive(['/messages']) ? "active sidebar-link" : 'none sidebar-link'}
                                    aria-expanded="false"
                                >
                                    <span>
                                        <FaRegMessage className='me-1' />
                                    </span>
                                    <span className="hide-menu">{t("messages")}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}