import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';
import MachineryCard from '../cards/MachineryCard';
import ConstructionCard from '../cards/ConstructionCard';

export default function Construction({ data }) {
    const [t] = useTranslation()
    return (
        <section className="construction-section">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className='fw-bolder w-75'>{t("constructionSectionTitle")}</h3>
                    <Link to="../construction" className='underlineLink'>{t("seeMore")}</Link>
                </div>

                <div className="cards-grid">
                    {
                        data &&
                        data
                            .filter(item => item.materialGroup === "construction")
                            .filter(item => item.featured)
                            .map(item => {
                                return (
                                    <ConstructionCard key={item._id} data={item} />
                                )
                            })
                            
                    }
                </div>
                <Link to="./marketplace?market=2">
                    <button className="outline-btn d-block mx-auto my-4">{t("viewAllConstruction")}</button>
                </Link>
            </div>
        </section>
    )
}
