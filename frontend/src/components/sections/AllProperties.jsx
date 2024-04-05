import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'

export default function AllProperties() {
    const [t] = useTranslation()

    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const propertyData = {
        id: 1,
        imgUrl: [
            "https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75",
            "https://i2.au.reastatic.net/800x600/dd06cc98ee145227183c99fdfc9361d63d3c76c95f0fe29184620f39088e0b33/image.jpg",
            "https://cdn.pixabay.com/photo/2021/02/02/18/46/city-5974876_640.jpg"
        ],
        category: "Apartment",
        title: "Classic Home and Beautiful Scenery",
        description: "In literary theory, a text is any object that can be read, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing.",
        type: "Rent",
        price: "12000",
        streetAddress: "5232 North Carolina Ave. 21BC",
        city: "Carolina, USA",
        bedrooms: "3",
        baths: "2",
        area: "120",
        sellerImg: "", // Fill with seller image URL
        sellerName: "Hendrich Klasen",
        datePosted: "02 March 2024"
    };
    return (
        <div className="allProperties allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("allProperties")}</h2>

                    <div className="sortby">
                        <div className="arrow-icon">
                            <FaArrowUp className='color-primary' />
                        </div>
                        <div className="d-flex gap-2 align-items-center sorting" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                            <p>Sort By</p>
                            <FaAngleDown className='color-primary' />
                        </div>

                        <div className={`sortby-dropdown ${showSortDropdown ? 'show' : ''}`}>
                            <p className="mb-2 dropdown-item">Relevance</p>
                            <p className="mb-2 dropdown-item">Price</p>
                            <p className="mb-2 dropdown-item">Date</p>
                        </div>
                    </div>
                </div>

                <div className="cards-grid">
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                </div>

                <div className="pagination mt-5">
                    <div className="pagination-item previous">Previous</div>
                    <div className="pagination-item active">1</div>
                    <div className="pagination-item">2</div>
                    <div className="pagination-item">4</div>
                    <div className="pagination-item next">Next</div>
                </div>
            </div>
        </div>
    )
}
