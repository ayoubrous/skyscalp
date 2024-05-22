import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'
import MachineryCard from '../cards/MachineryCard'
import ConstructionCard from '../cards/ConstructionCard'
import Sortby from '../utils/Sortby'

export default function AllConstruction() {
    const [t] = useTranslation()


    const [sortby, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('ascending')
    return (
        <div className="allConstruction allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("buildingMaterial")}</h2>

                    <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />

                </div>

                <div className="cards-grid">
                    <ConstructionCard
                        id="1"
                        imgUrl={["https://source.unsplash.com/500x300/?cement"]}
                        title="Best quality Cement for home construction"
                        price="1200"
                        quantity="20 KG"
                        available="Yes"
                        category="Cement"
                        datePosted="17 March 2024"
                        sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the high quality cement for your home construction needs. Durable and reliable."
                    />

                    <ConstructionCard
                        id="2"
                        imgUrl={["https://source.unsplash.com/500x300/?bulldozer"]}
                        title="Powerful Bulldozer for heavy construction"
                        price="50000"
                        quantity="1 Unit"
                        available="Yes"
                        category="Bulldozer"
                        datePosted="20 April 2024"
                        sellerName="Maria Gonzales"
                        city="Houston, USA"
                        description="Get the best bulldozer for heavy construction tasks. Efficient and robust."
                    />

                    <ConstructionCard
                        id="3"
                        imgUrl={["https://source.unsplash.com/500x300/?excavator"]}
                        title="High performance Excavator"
                        price="75000"
                        quantity="1 Unit"
                        available="Yes"
                        category="Excavator"
                        datePosted="5 May 2024"
                        sellerName="John Smith"
                        city="Dallas, USA"
                        description="Excavator with superior digging capabilities. Perfect for any construction site."
                    />

                    <ConstructionCard
                        id="4"
                        imgUrl={["https://source.unsplash.com/500x300/?concrete mixer"]}
                        title="Efficient Concrete Mixer"
                        price="3000"
                        quantity="1 Unit"
                        available="Yes"
                        category="Concrete Mixer"
                        datePosted="12 March 2024"
                        sellerName="Linda Johnson"
                        city="Miami, USA"
                        description="Concrete mixer that ensures perfect mixing. Easy to operate and maintain."
                    />

                    <ConstructionCard
                        id="5"
                        imgUrl={["https://source.unsplash.com/500x300/?crane"]}
                        title="Heavy Duty Crane"
                        price="100000"
                        quantity="1 Unit"
                        available="Yes"
                        category="Crane"
                        datePosted="22 February 2024"
                        sellerName="Robert Brown"
                        city="Atlanta, USA"
                        description="Heavy duty crane for lifting and moving large objects on construction sites."
                    />

                    <ConstructionCard
                        id="6"
                        imgUrl={["https://source.unsplash.com/500x300/?drill"]}
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
                        imgUrl={["https://source.unsplash.com/500x300/?welding machine"]}
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

                    <ConstructionCard
                        id="9"
                        imgUrl={["https://source.unsplash.com/500x300/?scaffolding"]}
                        title="Secure Scaffolding Equipment"
                        price="3000"
                        quantity="1 Set"
                        available="Yes"
                        category="Scaffolding"
                        datePosted="2 May 2024"
                        sellerName="David Robinson"
                        city="New York, USA"
                        description="Scaffolding equipment to ensure safety and stability at construction sites."
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
