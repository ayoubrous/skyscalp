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
                <h1 className="color-primary fw-bolder text-uppercase">{t("machinerySectionTitle")}</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className='my-3 fw-bolder w-75'>{t("machinerySectionSubTitle")}</h3>
                    <Link to="../machinery" className='underlineLink'>{t("seeMore")}</Link>
                </div>

                <div className="cards-grid">
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA" application="Land work"
                    />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA" application="Land work"
                    />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA" application="Land work"
                    />
                </div>
                <Link to="./machinery">
                    <button className="outline-btn d-block mx-auto my-4">{t("viewAllMachinery")}</button>
                </Link>
            </div>
        </section>
    )
}
