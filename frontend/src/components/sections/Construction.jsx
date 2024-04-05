import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';
import MachineryCard from '../cards/MachineryCard';
import ConstructionCard from '../cards/ConstructionCard';

export default function Construction() {
    const [t] = useTranslation()
    return (
        <section className="construction-section">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className='fw-bolder'>{t("constructionSectionTitle")}</h3>
                    <Link to="/" className='underlineLink'>{t("seeMore")}</Link>
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
                </div>
                <Link to="./construction">
                <button className="outline-btn d-block mx-auto my-4">{t("viewAllConstruction")}</button>
                </Link>
            </div>
        </section>
    )
}
