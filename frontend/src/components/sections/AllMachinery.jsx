import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'
import MachineryCard from '../cards/MachineryCard'
import Sortby from '../utils/Sortby'

export default function AllMachinery() {
    const [t] = useTranslation()

    const [sortby, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('ascending')
    return (
        <div className="allMachinery allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("machineryTools")}</h2>

                    <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />

                </div>

                <div className="cards-grid">
                <MachineryCard 
    id="1"
    imgUrl={[
        "https://source.unsplash.com/500x300/?crane",
        "https://source.unsplash.com/500x300/?crane"
    ]}
    title="Heavy Duty Excavator"
    description="Top-tier heavy duty excavator for all your construction needs."
    type={t("rent")}
    price="1500"
    modal="2023 EX"
    condition="New"
    category="Excavators"
    datePosted="12 April 2024"
    sellerName="John Smith"
    city="New York, USA"
/>

<MachineryCard 
    id="2"
    imgUrl={[
        "https://source.unsplash.com/500x300/?bulldozer",
        "https://source.unsplash.com/500x300/?crane"
    ]}
    title="Bulldozer for Heavy Work"
    description="Powerful bulldozer ideal for heavy-duty construction projects."
    type={t("sale")}
    price="50000"
    modal="2021 BD"
    condition="Used"
    category="Bulldozers"
    datePosted="25 May 2024"
    sellerName="Alice Johnson"
    city="Los Angeles, USA"
/>

<MachineryCard 
    id="3"
    imgUrl={[
        "https://source.unsplash.com/500x300/?machine",
        "https://source.unsplash.com/500x300/?crane"
    ]}
    title="Tower Crane for Rent"
    description="Efficient tower crane for high-rise construction projects."
    type={t("rent")}
    price="3000"
    modal="2022 TC"
    condition="New"
    category="Cranes"
    datePosted="10 June 2024"
    sellerName="Robert Brown"
    city="Chicago, USA"
/>

<MachineryCard 
    id="4"
    imgUrl={[
        "https://source.unsplash.com/500x300/?loader",
        "https://source.unsplash.com/500x300/?crane"
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
        "https://source.unsplash.com/500x300/?truck",
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
    id="6"
    imgUrl={[
        "https://source.unsplash.com/500x300/?Graders",
        "https://source.unsplash.com/500x300/?crane"
    ]}
    title="Concrete Mixer Truck"
    description="High-efficiency concrete mixer truck for construction sites."
    type={t("sale")}
    price="75000"
    modal="2021 CM"
    condition="Used"
    category="Mixers"
    datePosted="05 September 2024"
    sellerName="Sarah Johnson"
    city="Dallas, USA"
/>

<MachineryCard 
    id="7"
    imgUrl={[
        "https://source.unsplash.com/500x300/?loader",
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

<MachineryCard 
    id="8"
    imgUrl={[
        "https://source.unsplash.com/500x300/?paver",
        "https://source.unsplash.com/500x300/?crane"
    ]}
    title="Asphalt Paver"
    description="Efficient asphalt paver for road construction projects."
    type={t("sale")}
    price="120000"
    modal="2021 AP"
    condition="Used"
    category="Pavers"
    datePosted="25 November 2024"
    sellerName="Laura Thompson"
    city="Miami, USA"
/>

<MachineryCard 
    id="9"
    imgUrl={[
        "https://source.unsplash.com/500x300/?tractor",
        "https://source.unsplash.com/500x300/?crane"
    ]}
    title="Forklift Truck"
    description="High-performance forklift truck for industrial use."
    type={t("rent")}
    price="1000"
    modal="2023 FT"
    condition="New"
    category="Forklifts"
    datePosted="05 December 2024"
    sellerName="Anna White"
    city="Boston, USA"
/>


                </div>

                <div className="pagination mt-5">
                    <div className="pagination-item previous">First</div>
                    <div className="pagination-item active">1</div>
                    <div className="pagination-item">2</div>
                    <div className="pagination-item">3</div>
                    <div className="pagination-item next">Last</div>
                </div>
            </div>
        </div>
    )
}
