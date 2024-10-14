import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';
import MachineryCard from '../cards/MachineryCard';
import ConstructionCard from '../cards/ConstructionCard';
import { materialsHomeCategories } from '../../assets/data/categories';
import otherImage from '../../assets/images/homepage/others.jpg'

export default function Construction({ data }) {

    const navigate = useNavigate()
    const [t] = useTranslation()

    const handleNavigate = (type) => {
        // navigate('/marketplace?market=2', { state: { type: type } })
        if (type === "") {
            navigate('/marketplace?market=2', { state: { filters: { checkedSubcategories: [] } } })
        } else {
            navigate('/marketplace?market=2', { state: { filters: { checkedSubcategories: [type] } } })
        }
    }
    return (
        <section className="construction-section">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className='fw-bolder w-75'>{t("constructionSectionTitle")}</h3>
                    {/* <Link to="../marketplace?market=1" className='underlineLink'>{t("seeMore")}</Link> */}
                </div>

                {/* <div className="cards-grid">
                    {
                        data &&
                        data
                            .filter(item => item.materialGroup === "construction")
                            .map(item => {
                                return (
                                    <ConstructionCard key={item._id} data={item} />
                                )
                            })

                    }
                </div> */}

                <div className="home-card-categories-grid my-4">
                    {
                        materialsHomeCategories.map(item => {
                            return (
                                <div onClick={() => handleNavigate(item.name)} className="home-category-card" key={item.id}>
                                    <div className="image">
                                        <img src={item.image} alt="" />
                                    </div>
                                    <h5 className="home-category-card-text">{t(item.name)}</h5>
                                </div>
                            )
                        })
                    }

                    <div onClick={() => handleNavigate("")} className="home-category-card" >
                        <div className="image">
                            <img src={otherImage} alt="" />
                        </div>
                        <h5 className="home-category-card-text">{t("View all")}</h5>
                    </div>

                </div>
                <div className='text-center'>
                    {/* <Link to="./marketplace?market=2" style={{ display: "inline-block" }}>
                        <button className="outline-btn d-block mx-auto my-4">{t("viewAllConstruction")}</button>
                    </Link> */}
                </div>
            </div>
        </section>
    )
}
