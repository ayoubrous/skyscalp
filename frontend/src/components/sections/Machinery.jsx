import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';
import MachineryCard from '../cards/MachineryCard';

export default function Machinery() {
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
                <MachineryCard 
    id="4"
    imgUrl={[
        "https://source.unsplash.com/500x300/?crane",
        "https://source.unsplash.com/500x300/?excavator"
    ]}
    title="Backhoe Loader for Sale"
    description="Versatile backhoe loader for construction and landscaping."
    type={t("sale")}
    price="42000"
    modal="2020 BL"
    condition="Used"
    category="Loaders"
    datePosted="15 July 2024"
    sellerName="Emily Davis"
    city="Houston, USA"
/>

<MachineryCard 
    id="5"
    imgUrl={[
        "https://source.unsplash.com/500x300/?Bulldozers",
        "https://source.unsplash.com/500x300/?crane"
    ]}
    title="Heavy Duty Dump Truck"
    description="Reliable dump truck for transporting heavy materials."
    type={t("rent")}
    price="2500"
    modal="2023 DT"
    condition="New"
    category="Trucks"
    datePosted="20 August 2024"
    sellerName="Michael Wilson"
    city="Phoenix, USA"
/>


<MachineryCard 
    id="7"
    imgUrl={[
        "https://source.unsplash.com/500x300/?Graders",
        "https://source.unsplash.com/500x300/?crane"
    ]}
    title="Skid Steer Loader"
    description="Compact and powerful skid steer loader for versatile use."
    type={t("rent")}
    price="2000"
    modal="2022 SL"
    condition="New"
    category="Loaders"
    datePosted="15 October 2024"
    sellerName="David Clark"
    city="San Francisco, USA"
/>
                </div>
                <Link to="./machinery">
                    <button className="outline-btn d-block mx-auto my-4">{t("viewAllMachinery")}</button>
                </Link>
            </div>
        </section>
    )
}
