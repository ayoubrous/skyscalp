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
                    <h2 className="fw-bolder color-primary text-uppercase">{t("allConstruction")}</h2>

                    <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />

                </div>

                <div className="cards-grid">
                    <ConstructionCard id=""
                        imgUrl={["https://5.imimg.com/data5/GY/OT/DS/SELLER-54664232/ultratech-cement-500x500.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]}
                        title="Best quality Cement for home construction" price="1200"
                        quantity="20 KG" available="Yes" category="Cement"
                        datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher"
                    />
                    <ConstructionCard id=""
                        imgUrl={["https://5.imimg.com/data5/GY/OT/DS/SELLER-54664232/ultratech-cement-500x500.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]}
                        title="Best quality Cement for home construction" price="1200"
                        quantity="20 KG" available="Yes" category="Cement"
                        datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher"
                    />
                    <ConstructionCard id=""
                        imgUrl={["https://5.imimg.com/data5/GY/OT/DS/SELLER-54664232/ultratech-cement-500x500.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]}
                        title="Best quality Cement for home construction" price="1200"
                        quantity="20 KG" available="Yes" category="Cement"
                        datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher"
                    />
                    <ConstructionCard id=""
                        imgUrl={["https://5.imimg.com/data5/GY/OT/DS/SELLER-54664232/ultratech-cement-500x500.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]}
                        title="Best quality Cement for home construction" price="1200"
                        quantity="20 KG" available="Yes" category="Cement"
                        datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher"
                    />
                    <ConstructionCard id=""
                        imgUrl={["https://5.imimg.com/data5/GY/OT/DS/SELLER-54664232/ultratech-cement-500x500.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]}
                        title="Best quality Cement for home construction" price="1200"
                        quantity="20 KG" available="Yes" category="Cement"
                        datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher"
                    />
                    <ConstructionCard id=""
                        imgUrl={["https://5.imimg.com/data5/GY/OT/DS/SELLER-54664232/ultratech-cement-500x500.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]}
                        title="Best quality Cement for home construction" price="1200"
                        quantity="20 KG" available="Yes" category="Cement"
                        datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher"
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
