// import React from 'react'
// import { useTranslation } from 'react-i18next'

// export default function Pagination({ hasNextPage, hasPrevPage, onPageChange, pages, currentPage, totalPages }) {
//     const [t] = useTranslation()
//     return (
//         <div className="pagination mt-5">
//             <div
//                 className={`pagination-item previous ${!hasPrevPage ? 'disabled' : ''}`}
//                 onClick={() => hasPrevPage && onPageChange(1)}
//             >
//                 {t("First")}
//             </div>
//             {pages.map(page => (
//                 <div
//                     key={page}
//                     className={`pagination-item ${currentPage === page ? 'active' : ''}`}
//                     onClick={() => onPageChange(page)}
//                 >
//                     {page}
//                 </div>
//             ))}
//             <div
//                 className={`pagination-item next ${!hasNextPage ? 'disabled' : ''}`}
//                 onClick={() => hasNextPage && onPageChange(totalPages)}
//             >
//                 {t("Last")}
//             </div>
//         </div>
//     )
// }




// NEW PAGINATION FORMAT 

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Pagination({
    hasNextPage,
    hasPrevPage,
    onPageChange,
    currentPage,
    totalPages
}) {

    const [t] = useTranslation();

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    if (totalPages <= 1) return null;




    return (
        <div className="pagination mt-5">
            {/* First Page */}
            <div
                className={`pagination-item ${!hasPrevPage ? 'disabled' : ''}`}
                onClick={() => handlePageChange(1)}
            >
                1
            </div>

            {/* Previous Button */}
            <div
                className={`pagination-item previous ${!hasPrevPage ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                {t("Previous")}
            </div>

            {/* Current Page */}
            {currentPage !== 1 && currentPage !== totalPages && (
                <div className="pagination-item active">
                    {currentPage}
                </div>
            )}

            {/* Next Button */}
            <div
                className={`pagination-item next ${!hasNextPage ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                {t("Next")}
            </div>

            {/* Last Page */}
            {totalPages > 1 && (
                <div
                    className={`pagination-item ${!hasNextPage ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </div>
            )}
        </div>
    );
}