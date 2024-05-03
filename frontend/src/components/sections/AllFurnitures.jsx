import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'
import MachineryCard from '../cards/MachineryCard'
import ConstructionCard from '../cards/ConstructionCard'
import Sortby from '../utils/Sortby'
import FurnitureCard from '../cards/FurnitureCard'

export default function AllFurniture() {
    const [t] = useTranslation()


    const [sortby, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('ascending')
    return (
        <div className="allConstruction allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("furnitureAppliances")}</h2>

                    <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />

                </div>

                <div className="cards-grid">
                    <FurnitureCard id=""
                        imgUrl={["https://homefactree.com/wp-content/uploads/2021/07/CADIZ-WARDROBE-HF.jpg", "https://images.woodenstreet.de/image/cache/data%2Fwardrobes-mdf%2Fzyra-4-door-wardrobe-without-mirror-gothic-grey-classic-oak-finish%2F1-750x650.jpg"]}
                        title="Cupboard for hanging purpose" price="300"
                         available="Yes" category="Cabinets"
                        datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher"
                    />
                    <FurnitureCard id=""
                        imgUrl={["https://homefactree.com/wp-content/uploads/2021/07/CADIZ-WARDROBE-HF.jpg", "https://images.woodenstreet.de/image/cache/data%2Fwardrobes-mdf%2Fzyra-4-door-wardrobe-without-mirror-gothic-grey-classic-oak-finish%2F1-750x650.jpg"]}
                        title="Cupboard for hanging purpose" price="300"
                         available="Yes" category="Cabinets"
                        datePosted="17 March 2024" sellerName="Hendrich Klasen"
                        city="Carolina, USA"
                        description="Find out the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher the hight quality stone crusher"
                    />
                    <FurnitureCard id=""
                        imgUrl={["https://homefactree.com/wp-content/uploads/2021/07/CADIZ-WARDROBE-HF.jpg", "https://images.woodenstreet.de/image/cache/data%2Fwardrobes-mdf%2Fzyra-4-door-wardrobe-without-mirror-gothic-grey-classic-oak-finish%2F1-750x650.jpg"]}
                        title="Cupboard for hanging purpose" price="300"
                         available="Yes" category="Cabinets"
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
