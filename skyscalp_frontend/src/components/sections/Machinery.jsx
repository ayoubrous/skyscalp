import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';
import MachineryCard from '../cards/MachineryCard';

export default function Machinery({ data }) {
    const [t] = useTranslation()
    return (
        <section className="machinery-section">
            <div className="custom-container">
                <h1 className="color-primary fw-bolder text-uppercase">{t("machinerySectionTitle")}</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className='my-3 fw-bolder w-75'>{t("machinerySectionSubTitle")}</h3>
                    <Link to="../machinery" className='underlineLink'>{t("seeMore")}</Link>
                </div>

                <div className="cards-grid">
                    {
                        data &&
                        data
                            .filter(item => item.materialGroup === "machinery")
                            .filter(item => item.featured)
                            .map(item => {
                                return (
                                    <MachineryCard key={item._id} data={item} />
                                )
                            })
                    }
                </div>
                <Link to="./marketplace?market=1">
                    <button className="outline-btn d-block mx-auto my-4">{t("viewAllMachinery")}</button>
                </Link>
            </div>
        </section>
    )
}
