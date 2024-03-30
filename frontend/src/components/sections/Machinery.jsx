import React, { } from 'react'
import { useTranslation } from 'react-i18next';
import { BsFillBagHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { TbBed } from "react-icons/tb";
import PropertyCard from '../cards/PropertyCard';
import MachineryCard from '../cards/MachineryCard';

export default function Machinery() {
    const [t] = useTranslation()
    return (
        <section className="machinery-section">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="color-primary">{t("machinerySectionTitle")}</h1>
                    <Link to="/" className='underlineLink'>{t("seeMore")}</Link>
                </div>
                <h3 className='my-3 fw-bolder'>{t("machinerySectionSubTitle")}</h3>

                <div className="cards-grid">
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home" description="Find out the hight quality stone crusher" type={t("rent")} price="1200" modal="Modal: 2022 R" condition="New" category="Cranes" datePosted="17 March 2024" />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home" description="Find out the hight quality stone crusher" type={t("rent")} price="1200" modal="Modal: 2022 R" condition="New" category="Cranes" datePosted="17 March 2024" />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home" description="Find out the hight quality stone crusher" type={t("rent")} price="1200" modal="Modal: 2022 R" condition="New" category="Cranes" datePosted="17 March 2024" />
                </div>
                <button className="outline-btn d-block mx-auto my-4">{t("viewAllMachinery")}</button>
            </div>
        </section>
    )
}
