import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'
import MachineryCard from '../cards/MachineryCard'
import ConstructionCard from '../cards/ConstructionCard'
import Sortby from '../utils/Sortby'
import FurnitureCard from '../cards/FurnitureCard'

export default function AllFurniture() {
    const [t] = useTranslation()


    const [sortby, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('ascending')
    return (
        <div className="allConstruction allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("furnitureAppliances")}</h2>

                    <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />

                </div>

                <div className="cards-grid">
                    <FurnitureCard
                        id="1"
                        imgUrl={["https://source.unsplash.com/500x300/?cupboard"]}
                        title="Cupboard for hanging purpose"
                        price="300"
                        available="Yes"
                        category="Cabinets"
                        datePosted="17 March 2024"
                        sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Spacious cupboard perfect for hanging clothes and organizing your wardrobe."
                    />

                    <FurnitureCard
                        id="2"
                        imgUrl={["https://source.unsplash.com/500x300/?sofa"]}
                        title="Comfortable Sofa Set"
                        price="1200"
                        available="Yes"
                        category="Sofas"
                        datePosted="22 April 2024"
                        sellerName="Maria Gonzales"
                        city="Houston, USA"
                        description="Luxurious and comfortable sofa set for your living room. Available in various colors."
                    />

                    <FurnitureCard
                        id="3"
                        imgUrl={["https://source.unsplash.com/500x300/?table"]}
                        title="Elegant Dining Table"
                        price="800"
                        available="Yes"
                        category="Dining Tables"
                        datePosted="5 May 2024"
                        sellerName="John Smith"
                        city="Dallas, USA"
                        description="Elegant dining table with seating for six. Perfect for family dinners and gatherings."
                    />

                    <FurnitureCard
                        id="4"
                        imgUrl={["https://source.unsplash.com/500x300/?bed"]}
                        title="King Size Bed"
                        price="1000"
                        available="Yes"
                        category="Beds"
                        datePosted="12 March 2024"
                        sellerName="Linda Johnson"
                        city="Miami, USA"
                        description="Comfortable king size bed with modern design. Includes mattress and headboard."
                    />

                    <FurnitureCard
                        id="5"
                        imgUrl={["https://source.unsplash.com/500x300/?bookshelf"]}
                        title="Stylish Bookshelf"
                        price="200"
                        available="Yes"
                        category="Bookshelves"
                        datePosted="22 February 2024"
                        sellerName="Robert Brown"
                        city="Atlanta, USA"
                        description="Stylish bookshelf to keep your books organized. Made from high-quality wood."
                    />

                    <FurnitureCard
                        id="6"
                        imgUrl={["https://source.unsplash.com/500x300/?armchair"]}
                        title="Cozy Armchair"
                        price="350"
                        available="Yes"
                        category="Armchairs"
                        datePosted="8 January 2024"
                        sellerName="Michael Davis"
                        city="Chicago, USA"
                        description="Cozy armchair for relaxing and reading. Available in multiple colors and fabrics."
                    />

                    <FurnitureCard
                        id="7"
                        imgUrl={["https://source.unsplash.com/500x300/?wardrobe"]}
                        title="Spacious Wardrobe"
                        price="600"
                        available="Yes"
                        category="Wardrobes"
                        datePosted="15 February 2024"
                        sellerName="William Garcia"
                        city="Los Angeles, USA"
                        description="Spacious wardrobe with multiple compartments. Ideal for organizing clothes and accessories."
                    />

                    <FurnitureCard
                        id="8"
                        imgUrl={["https://source.unsplash.com/500x300/?table"]}
                        title="Modern Coffee Table"
                        price="150"
                        available="Yes"
                        category="Coffee Tables"
                        datePosted="27 April 2024"
                        sellerName="James Martinez"
                        city="Phoenix, USA"
                        description="Modern coffee table with sleek design. Perfect for your living room or office."
                    />

                    <FurnitureCard
                        id="9"
                        imgUrl={["https://source.unsplash.com/500x300/?office"]}
                        title="Ergonomic Office Chair"
                        price="250"
                        available="Yes"
                        category="Office Chairs"
                        datePosted="2 May 2024"
                        sellerName="David Robinson"
                        city="New York, USA"
                        description="Ergonomic office chair designed for comfort. Adjustable height and lumbar support."
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
