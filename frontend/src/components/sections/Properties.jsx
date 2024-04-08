import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';

export default function Properties() {
    const [t] = useTranslation()

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
        <section className="properties-section">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="color-primary text-uppercase fw-bolder">{t("propertySectionTitle")}</h1>
                    <Link to="../properties" className='underlineLink'>{t("seeMore")}</Link>
                </div>
                <h3 className='my-3 fw-bolder'>{t("propertySectionSubTitle")}</h3>

                <div className="cards-grid">
                    {/* Only show 4 cards, 3 will be visible in laptop and 4 on mobile through css */}
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                </div>
                <Link to="./properties">
                    <button className="outline-btn d-block mx-auto my-4">{t("viewAllProperty")}</button>
                </Link>
            </div>
        </section>
    )
}
