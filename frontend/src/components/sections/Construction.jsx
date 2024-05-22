import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';
import MachineryCard from '../cards/MachineryCard';
import ConstructionCard from '../cards/ConstructionCard';

export default function Construction() {
    const [t] = useTranslation()
    return (
        <section className="construction-section">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className='fw-bolder w-75'>{t("constructionSectionTitle")}</h3>
                    <Link to="../construction" className='underlineLink'>{t("seeMore")}</Link>
                </div>

                <div className="cards-grid">
                <ConstructionCard
                        id="6"
                        imgUrl={["https://source.unsplash.com/500x300/?drilling"]}
                        title="High Power Drill Machine"
                        price="500"
                        quantity="1 Unit"
                        available="Yes"
                        category="Drill"
                        datePosted="8 January 2024"
                        sellerName="Michael Davis"
                        city="Chicago, USA"
                        description="High power drill machine for all your drilling needs. Compact and easy to handle."
                    />

                    <ConstructionCard
                        id="7"
                        imgUrl={["https://source.unsplash.com/500x300/?saw"]}
                        title="Durable Electric Saw"
                        price="250"
                        quantity="1 Unit"
                        available="Yes"
                        category="Saw"
                        datePosted="15 February 2024"
                        sellerName="William Garcia"
                        city="Los Angeles, USA"
                        description="Electric saw with precision cutting ability. Durable and safe to use."
                    />

                    <ConstructionCard
                        id="8"
                        imgUrl={["https://source.unsplash.com/500x300/?welding"]}
                        title="Advanced Welding Machine"
                        price="1500"
                        quantity="1 Unit"
                        available="Yes"
                        category="Welding Machine"
                        datePosted="27 April 2024"
                        sellerName="James Martinez"
                        city="Phoenix, USA"
                        description="Advanced welding machine for professional welding jobs. Reliable and efficient."
                    />
                </div>
                <Link to="./construction">
                <button className="outline-btn d-block mx-auto my-4">{t("viewAllConstruction")}</button>
                </Link>
            </div>
        </section>
    )
}
