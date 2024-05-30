import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowUp } from 'react-icons/fa6'
import PropertyCard from '../cards/PropertyCard'
import MachineryCard from '../cards/MachineryCard'
import Sortby from '../utils/Sortby'
import Pagination from '../utils/Pagination'
import AgentCard from '../cards/AgentCard'

export default function AllAgents({ data, hasPrevPage, hasNextPage, totalItems, totalPages, currentPage, onPageChange, handleSortby, handleSortOrder }) {
    const [t] = useTranslation()
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    

    return (
        <div className="allMachinery allItems">
            <div className="custom-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder color-primary text-uppercase">{t("agents")}</h2>

                    {/* <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} /> */}
                    <Sortby handleSortby={handleSortby} handleSortOrder={handleSortOrder} />
                </div>

                <div className="cards-grid agents-cards-grid">
                    {
                        data.length === 0 && (
                            <h5 className='my-4'>No Products Found</h5>
                        )
                    }
                    {
                        data && data.map(item => {
                            return (
                                <AgentCard key={item._id} data={item} />
                            )
                        })
                    }
                </div>

                <Pagination hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} onPageChange={onPageChange} pages={pages} currentPage={currentPage} totalPages={totalPages} />

            </div>
        </div>
    )
}
