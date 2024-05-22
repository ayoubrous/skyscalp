import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';

export default function Properties() {
    const [t] = useTranslation()

    const propertyDataArray = [
        {
            id: 1,
            imgUrl: [
                "https://source.unsplash.com/500x300/?property",
                "https://source.unsplash.com/500x300/?villa",
            ],
            category: "Apartment",
            title: "Classic Home and Beautiful Scenery",
            description: "In literary theory, a text is any object that can be read, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eveniet voluptatem, repudiandae, ipsa quaerat quia facilis aliquam minus est eius unde placeat delectus nesciunt maxime beatae suscipit. Quam, aspernatur hic.",
            type: "Rent",
            price: 12000,
            streetAddress: "5232 North Carolina Ave. 21BC",
            city: "Carolina, USA",
            bedrooms: "3",
            rooms: "2",
            baths: "2",
            pool: "1",
            garage: "2",
            garden: "1",
            area: "120",
            sellerImg: "", // Fill with seller image URL
            sellerName: "Hendrich Klasen",
            datePosted: "02 March 2024"
        },
        {
            id: 2,
            imgUrl: [
                "https://source.unsplash.com/500x300/?building",
                "https://source.unsplash.com/500x300/?villa",
            ],
            category: "House",
            title: "Modern House with Stunning Views",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ligula eget dolor consequat malesuada.",
            type: "Sale",
            price: 350000,
            streetAddress: "1234 Main Street",
            city: "Springfield, USA",
            bedrooms: "4",
            baths: "3",
            pool: "1",
            garage: "2",
            rooms: "2",

            garden: "1",
            area: "250",
            sellerImg: "", // Fill with seller image URL
            sellerName: "Jessica Smith",
            datePosted: "10 April 2024"
        },
        {
            id: 3,
            imgUrl: [
                "https://source.unsplash.com/500x300/?villa",
                "https://source.unsplash.com/500x300/?villa",
            ],
            category: "Villa",
            title: "Luxurious Villa with Private Pool",
            description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eveniet voluptatem, repudiandae, ipsa quaerat quia facilis aliquam minus est eius unde placeat delectus nesciunt maxime beatae suscipit. Quam, aspernatur hic.",
            type: "Rent",
            price: 80000,
            streetAddress: "5678 Oak Street",
            city: "Beverly Hills, USA",
            bedrooms: "5",
            baths: "4",
            rooms: "2",

            pool: "1",
            garage: "2",
            garden: "1",
            area: "400",
            sellerImg: "", // Fill with seller image URL
            sellerName: "Michael Johnson",
            datePosted: "15 May 2024"
        },
    ]


    return (
        <section className="properties-section">
            <div className="custom-container">
                <h1 className="color-primary text-uppercase fw-bolder">{t("propertySectionTitle")}</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className='my-3 fw-bolder w-75'>{t("propertySectionSubTitle")}</h3>
                    <Link to="../properties" className='underlineLink'>{t("seeMore")}</Link>
                </div>

                <div className="cards-grid">
                    {/* Only show 4 cards, 3 will be visible in laptop and 4 on mobile through css */}
                    {
                        propertyDataArray.map((propertyData, i) => {
                            return (
                                <PropertyCard key={i} propertyData={propertyData} />
                            )
                        })
                    }
                </div>
                <Link to="./properties">
                    <button className="outline-btn d-block mx-auto my-4">{t("viewAllProperty")}</button>
                </Link>
            </div>
        </section>
    )
}
