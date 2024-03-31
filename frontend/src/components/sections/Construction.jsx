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
                    <ConstructionCard id="" imgUrl={["https://5.imimg.com/data5/GY/OT/DS/SELLER-54664232/ultratech-cement-500x500.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]} title="Best quality Cement for home construction" price="1200" quantity="20 KG" available="Yes" category="Cement" datePosted="17 March 2024" />
                    <ConstructionCard id="" imgUrl={["https://5.imimg.com/data5/SELLER/Default/2023/7/322592543/BI/YY/UX/49910265/ultratech-portland-pozzolana-cement-250x250.jpeg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]} title="Classic Home" price="1200" quantity="20 KG" available="Yes" category="Cement" datePosted="17 March 2024" />
                    <ConstructionCard id="" imgUrl={["https://st3.depositphotos.com/1001335/15855/i/450/depositphotos_158559396-stock-photo-cement-bags-stack-paper-sacks.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]} title="Classic Home" price="1200" quantity="20 KG" available="Yes" category="Cement" datePosted="17 March 2024" />
                    <ConstructionCard id="" imgUrl={["https://st3.depositphotos.com/1001335/15855/i/450/depositphotos_158559396-stock-photo-cement-bags-stack-paper-sacks.jpg", "https://media.istockphoto.com/id/987409372/photo/cement-in-bags-3d-rendering-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=qPFDhwtjy9VAfmKPK4lfbuA0sTS8dOMSbeoX6ngclC0="]} title="Classic Home" price="1200" quantity="20 KG" available="Yes" category="Cement" datePosted="17 March 2024" />
                </div>
                <button className="outline-btn d-block mx-auto my-4">{t("viewAllConstruction")}</button>
            </div>
        </section>
    )
}
