import React from 'react'

export default function Pagination({ hasNextPage, hasPrevPage, onPageChange, pages, currentPage, totalPages }) {
    return (
        <div className="pagination mt-5">
            <div
                className={`pagination-item previous ${!hasPrevPage ? 'disabled' : ''}`}
                onClick={() => hasPrevPage && onPageChange(1)}
            >
                First
            </div>
            {pages.map(page => (
                <div
                    key={page}
                    className={`pagination-item ${currentPage === page ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </div>
            ))}
            <div
                className={`pagination-item next ${!hasNextPage ? 'disabled' : ''}`}
                onClick={() => hasNextPage && onPageChange(totalPages)}
            >
                Last
            </div>
        </div>
    )
}
