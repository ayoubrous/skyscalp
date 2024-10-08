import React from 'react'
import Pagination from '../components/utils/Pagination'
import ExpertCard from '../components/cards/ExpertCard'
import Sortby from '../components/utils/Sortby'
import { useTranslation } from 'react-i18next'

export default function AllExperts({ data, hasPrevPage, hasNextPage, totalItems, totalPages, currentPage, onPageChange, handleSortby, handleSortOrder }) {
    const [t] = useTranslation()
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <>
            <div className="allMachinery allItems">
                <div className="custom-container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bolder color-primary text-uppercase">{t("Experts MarketPlace")}</h2>

                        {/* <Sortby sortBy={sortby} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} /> */}
                        {/* <Sortby handleSortby={handleSortby} handleSortOrder={handleSortOrder} /> */}
                        <Sortby handleSortby={handleSortby} handleSortOrder={handleSortOrder} />

                    </div>

                    <div className="cards-grid agents-cards-grid">
                        {
                            data.length === 0 && (
                                <h5 className='my-4'>{t("notProductsFound")}</h5>
                            )
                        }
                        {
                            data && data.map(item => {
                                return (
                                    <ExpertCard key={item._id} data={item} />
                                )
                            })
                        }
                    </div>

                    <Pagination hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} onPageChange={onPageChange} pages={pages} currentPage={currentPage} totalPages={totalPages} />

                </div>
            </div>
        </>
    )
}
