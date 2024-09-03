import React, { useEffect, useRef, useState } from 'react'
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FaTools } from 'react-icons/fa';
import { BsTools } from "react-icons/bs";
import { BsBuildingsFill } from "react-icons/bs";
import { RiContactsFill, RiAdvertisementFill } from "react-icons/ri";
import { FaAngleDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { GiConcreteBag } from 'react-icons/gi';

export default function FeatureCards() {
    const [t] = useTranslation()
    const [showDropdown, setShowDropdown] = useState(false)

    const dropdownRef = useRef()
    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className={`custom-modal ${showDropdown ? 'show' : ''}`} ref={dropdownRef}>
                <h5 className='text-center'>{t("We Provide Machines, Materials and Furnitures, Choose what to see!")}</h5>
                <div className="buttons d-flex gap-2 align-items-center justify-content-center mt-4">
                    <Link to='/marketplace?market=1'>
                        <button className="custom-btn px-3 py-2">{t("machineryTools")}</button>
                    </Link>
                    <Link to='/marketplace?market=2'>
                        <button className="custom-btn px-3 py-2">{t("buildingMaterial")}</button>
                    </Link>
                    <Link to='/marketplace?market=3'>
                        <button className="custom-btn px-3 py-2">{t("furnitureAppliances")}</button>
                    </Link>
                </div>
            </div>
            <div className='feature-cards'>
                <Link to='../properties' className="feature-card">
                    <BsBuildingsFill className='icon' />
                    <p className='text-uppercase'>{t("featureCard1")}</p>
                </Link>
                <Link className="feature-card" onClick={() => setShowDropdown(true)}>
                    <GiConcreteBag className='icon' />
                    <p>{t("featureCard2")}</p>
                </Link>
                <Link to='../estimate' className="feature-card">
                    <RiContactsFill className='icon' />
                    <p className='mt-2'>{t("featureCard3")}</p>
                </Link>
                <Link to="/app/dashboard" className="feature-card">
                    <RiAdvertisementFill className='icon' />
                    <p className='mt-2'>{t("featureCard4")}</p>
                </Link>
            </div>



        </>
    )
}
