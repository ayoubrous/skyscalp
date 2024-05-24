import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'
import MachineryCard from '../cards/MachineryCard'
import ConstructionCard from '../cards/ConstructionCard'
import Sortby from '../utils/Sortby'
import FurnitureCard from '../cards/FurnitureCard'
import Pagination from '../utils/Pagination'

export default function AllFurniture({ data, hasPrevPage, hasNextPage, totalItems, totalPages, currentPage, onPageChange, handleSortby, handleSortOrder }) {
    const [t] = useTranslation()
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);


    const [sortby, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('ascending')
    return (
        <div className="allConstruction allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("furnitureAppliances")}</h2>

                    <Sortby handleSortby={handleSortby} handleSortOrder={handleSortOrder} />

                </div>

                <div className="cards-grid">
                    {
                        data.length === 0 && (
                            <h5 className='my-4'>No Products Found</h5>
                        )
                    }
                    {
                        data && data.map(item => {
                            return (
                                <FurnitureCard key={item._id} data={item} />
                            )
                        })
                    }

                </div>
                <Pagination hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} onPageChange={onPageChange} pages={pages} currentPage={currentPage} totalPages={totalPages} />

            </div>
        </div>
    )
}
