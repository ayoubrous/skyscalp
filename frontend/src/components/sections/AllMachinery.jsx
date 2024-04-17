import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'
import MachineryCard from '../cards/MachineryCard'
import Sortby from '../utils/Sortby'

export default function AllMachinery() {
    const [t] = useTranslation()

    const [sortby, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('ascending')
    return (
        <div className="allMachinery allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("allMachinery")}</h2>

                    <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />

                </div>

                <div className="cards-grid">
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                    />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                    />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                    />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                    />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                    />
                    <MachineryCard id="" imgUrl={["https://t3.ftcdn.net/jpg/00/22/43/58/360_F_22435844_WOsydnWjBjCfdAaGId0CxXk0ahEOWeqs.jpg", "https://filesblog.technavio.org/wp-content/uploads/2019/10/Construction-machinery-manufacturers.jpg"]} title="Classic Home"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher" type={t("rent")} price="1200"
                        modal="2022 R" condition="New" category="Cranes" datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
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
