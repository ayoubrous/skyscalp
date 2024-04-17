import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'
import PropertyCard from '../../components/cards/PropertyCard'

export default function Machinery() {
    const [activeTab, setActiveTab] = useState('property')
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
        <>
            <div className="page-wrapper favourites-page" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />


                    <div className="container-fluid">
                        <div className="fav-tabs">
                            <div className={`fav-tab ${activeTab === 'property' ? 'active' : ''}`} onClick={() => setActiveTab('property')}>
                                <p>Properties</p>
                            </div>
                            <div className={`fav-tab ${activeTab === 'machinery' ? 'active' : ''}`} onClick={() => setActiveTab('machinery')}>
                                <p>Machinery</p>
                            </div>
                            <div className={`fav-tab ${activeTab === 'construction' ? 'active' : ''}`} onClick={() => setActiveTab('construction')}>
                                <p>Construction</p>
                            </div>
                        </div>
                        <h2 className='fw-bolder mb-3'>Favourite Items</h2>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        <div className="cards-grid">
                            <PropertyCard propertyData={propertyData} />
                            <PropertyCard propertyData={propertyData} />
                            <PropertyCard propertyData={propertyData} />
                        </div>

                        <div className="py-0 px-6 ">
                            <small className="mb-0 color-secondary">Developed by <a href="" className="pe-1 text-primary text-decoration-underline">MA-Tech</a></small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
