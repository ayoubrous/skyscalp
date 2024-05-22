import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'
import Sortby from '../utils/Sortby'

export default function AllProperties() {
    const [t] = useTranslation()

    const [sortby, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('ascending')
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
        {
            id: 4,
            imgUrl: [
                "https://source.unsplash.com/500x300/?condo",
                "https://source.unsplash.com/500x300/?villa",
            ],
            category: "Condo",
            title: "Spacious Condo in Downtown",
            description: "Curabitur vel sem sit amet dolor auctor tristique. Fusce commodo eros nec arcu facilisis, eget fringilla turpis gravida.",
            type: "Sale",
            price: 450000,
            streetAddress: "910 Maple Avenue",
            city: "New York, USA",
            bedrooms: "3",
            baths: "2",
            pool: "1",
            rooms: "2",

            garage: "2",
            garden: "1",
            area: "180",
            sellerImg: "", // Fill with seller image URL
            sellerName: "Samantha Williams",
            datePosted: "20 June 2024"
        },
        {
            id: 5,
            imgUrl: [
                "https://source.unsplash.com/500x300/?cottage",
                "https://source.unsplash.com/500x300/?villa",
            ],
            category: "Cottage",
            title: "Charming Cottage by the Lake",
            description: "Nullam aliquet felis nec mauris pharetra, ac dictum dolor hendrerit. Etiam non urna at diam sollicitudin condimentum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eveniet voluptatem, repudiandae, ipsa quaerat quia facilis aliquam minus est eius unde placeat delectus nesciunt maxime beatae suscipit. Quam, aspernatur hic.",
            type: "Rent",
            price: 15000,
            streetAddress: "321 Lakeview Drive",
            city: "Lake Tahoe, USA",
            bedrooms: "2",
            pool: "1",
            garage: "2",
            garden: "1",
            baths: "1",
            area: "100",
            rooms: "2",

            sellerImg: "", // Fill with seller image URL
            sellerName: "John Doe",
            datePosted: "25 July 2024"
        },
        {
            id: 6,
            imgUrl: [
                "https://source.unsplash.com/500x300/?penthouse",
                "https://source.unsplash.com/500x300/?villa",
            ],
            category: "Penthouse",
            title: "Exclusive Penthouse with City View",
            description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eveniet voluptatem, repudiandae, ipsa quaerat quia facilis aliquam minus est eius unde placeat delectus nesciunt maxime beatae suscipit. Quam, aspernatur hic.",
            type: "Sale",
            price: 1200000,
            streetAddress: "222 Skyline Boulevard",
            city: "Miami, USA",
            bedrooms: "4",
            baths: "4",
            rooms: "2",

            pool: "1",
            garage: "2",
            garden: "1",
            area: "300",
            sellerImg: "", // Fill with seller image URL
            sellerName: "Alex Brown",
            datePosted: "30 August 2024"
        },
        {
            id: 7,
            imgUrl: [
                "https://source.unsplash.com/500x300/?bangalow",
                "https://source.unsplash.com/500x300/?villa",
            ],
            category: "Bungalow",
            title: "Cozy Bungalow in Quiet Neighborhood",
            description: "Mauris non tincidunt metus, nec facilisis purus. Suspendisse potenti. Fusce feugiat dictum ante, sed posuere elit imperdiet a.",
            type: "Rent",
            price: 18000,
            streetAddress: "789 Cedar Lane",
            city: "Portland, USA",
            bedrooms: "3",
            baths: "2",
            pool: "1",
            garage: "2",
            rooms: "2",

            garden: "1",
            pool: "1",
            garage: "2",
            garden: "1",
            area: "150",
            sellerImg: "", // Fill with seller image URL
            sellerName: "Emily Davis",
            datePosted: "05 September 2024"
        },
        {
            id: 8,
            imgUrl: [
                "https://source.unsplash.com/500x300/?house",
                "https://source.unsplash.com/500x300/?farmhouse",
            ],
            category: "Townhouse",
            title: "Elegant Townhouse with Garden",
            description: "Sed eget sem consequat, convallis leo ac, aliquam erat volutpat. Etiam id lacus magna. Nulla facilisi.",
            type: "Sale",
            price: 500000,
            streetAddress: "654 Pine Street",
            city: "San Francisco, USA",
            bedrooms: "3",
            baths: "2",
            pool: "1",
            garage: "2",
            rooms: "2",

            garden: "1",
            area: "200",
            sellerImg: "", // Fill with seller image URL
            sellerName: "George Clark",
            datePosted: "15 October 2024"
        },
        {
            id: 9,
            imgUrl: [
                "https://source.unsplash.com/500x300/?home",
                "https://source.unsplash.com/500x300/?villa",
            ],
            category: "Farmhouse",
            title: "Rustic Farmhouse with Large Land",
            description: "In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eveniet voluptatem, repudiandae, ipsa quaerat quia facilis aliquam minus est eius unde placeat delectus nesciunt maxime beatae suscipit. Quam, aspernatur hic..",
            type: "Rent",
            price: 25000,
            streetAddress: "432 Country Road",
            city: "Nashville, USA",
            bedrooms: "4",
            baths: "3",
            pool: "1",
            garage: "2",
            rooms: "2",

            garden: "1",
            area: "350",
            sellerImg: "", // Fill with seller image URL
            sellerName: "Lisa Martin",
            datePosted: "22 November 2024"
        }
    ];

    return (
        <div className="allProperties allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("allProperties")}</h2>

                    <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />

                </div>

                <div className="cards-grid">
                    {
                        propertyDataArray.map((propertyData, i) => {
                            return (
                                <PropertyCard key={i} propertyData={propertyData} />
                            )
                        })
                    }
                    {/* <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} />
                    <PropertyCard propertyData={propertyData} /> */}
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
