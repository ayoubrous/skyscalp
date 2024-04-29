import React from 'react'
import { BsBuildings } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import { FaTools } from 'react-icons/fa';
import { BsTools } from "react-icons/bs";
import { BsBuildingsFill } from "react-icons/bs";
import { RiContactsFill, RiAdvertisementFill } from "react-icons/ri";
import { FaAngleDown } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export default function FeatureCards() {
    const [t] = useTranslation()

    const handleBuild = () => {
        Swal.fire({
            text: "We Provide Machinery and Materials, Choose what to see!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Construction",
            cancelButtonText: "Machinery"
        }).then((result) => {
            /* Handle user's choice */
            if (result.isConfirmed) {
                // Redirect to Construction page
                window.location.href = "/construction";
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Redirect to Machinery page
                window.location.href = "/machinery";
            }
        });
    }


    return (
        <>
            <div className='feature-cards'>
                <Link to='../properties' className="feature-card">
                    <BsBuildingsFill className='icon' />
                    <p>{t("featureCard1")}</p>
                    <p>{t("featureCard1ii")}</p>
                </Link>
                <Link className="feature-card" onClick={handleBuild}>
                    <BsTools className='icon' />
                    <p>{t("featureCard2")}</p>
                </Link>
                <Link to='../estimate' className="feature-card">
                    <RiContactsFill className='icon' />
                    <p className='mt-2'>{t("featureCard3")}</p>
                </Link>
                <Link to='./' className="feature-card">
                    <RiAdvertisementFill className='icon' />
                    <p className='mt-2'>{t("featureCard4")}</p>
                </Link>
            </div>



        </>
    )
}
