import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';

export default function Properties() {
    const [t] = useTranslation()
    return (
        <section className="properties-section">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="color-primary text-uppercase fw-bolder">{t("propertySectionTitle")}</h1>
                    <Link to="/" className='underlineLink'>{t("seeMore")}</Link>
                </div>
                <h3 className='my-3 fw-bolder'>{t("propertySectionSubTitle")}</h3>

                <div className="cards-grid">
                    <PropertyCard id="" imgUrl={["https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75", "https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75"]} category="Appartment"  title="Classic Home and Beautiful Scenery" description="In literary theory, a text is any object that can be read, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing." type={t("rent")} price="1200" streetAddress="5232 North Carolina Ave. 21BC" city="Carolina, USA" bedrooms="3" baths="2" area="120" sellerImg="" sellerName="Hendrich Klasen"/>
                    <PropertyCard id="" imgUrl={["https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75", "https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75"]} category="Appartment"  title="Classic Home" description="In literary theory, a text is any object that can be read, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing." type={t("rent")} price="1200" streetAddress="5232 North Carolina Ave. 21BC" city="Carolina, USA" bedrooms="3" baths="2" area="120" sellerImg="" sellerName="Hendrich Klasen"/>
                    <PropertyCard id="" imgUrl={["https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75", "https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75"]} category="Appartment"  title="Classic Home" description="In literary theory, a text is any object that can be read, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing." type={t("rent")} price="1200" streetAddress="5232 North Carolina Ave. 21BC" city="Carolina, USA" bedrooms="3" baths="2" area="120" sellerImg="" sellerName="Hendrich Klasen"/>
                    <PropertyCard id="" imgUrl={["https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75", "https://www.loans.com.au/dA/9de8aa8d-512d-40f5-91a6-e7f94f2b0b79/webp/75"]} category="Appartment"  title="Classic Home" description="In literary theory, a text is any object that can be read, whether this object is a work of literature, a street sign, an arrangement of buildings on a city block, or styles of clothing." type={t("rent")} price="1200" streetAddress="5232 North Carolina Ave. 21BC" city="Carolina, USA" bedrooms="3" baths="2" area="120" sellerImg="" sellerName="Hendrich Klasen"/>
                </div>
                <button className="outline-btn d-block mx-auto my-4">{t("viewAllProperty")}</button>
            </div>
        </section>
    )
}
