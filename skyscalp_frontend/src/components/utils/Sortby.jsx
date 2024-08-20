import { t } from 'i18next'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAngleDown, FaArrowDown, FaArrowUp } from 'react-icons/fa6'

export default function Sortby({ handleSortOrder, handleSortby }) {
    const sortbyRef = useRef()
    const [showSortDropdown, setShowSortDropdown] = useState(false)
    const [t] = useTranslation()

    const [sortBy, setSortBy] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')


    const handleClickOutside = (e) => {
        if (sortbyRef.current && !sortbyRef.current.contains(e.target)) {
            setShowSortDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSortChange = (value) => {
        handleSortby(value)
        setSortBy(value)
        setShowSortDropdown(false)
    }

    const handleSortOrderChange = order => {
        handleSortOrder(order)
        setSortOrder(order)
    }

    return (
        <div className="sortby" >
            <div className="arrow-icon">
                {
                    sortOrder === 'asc' ? (
                        <FaArrowUp className='color-primary' onClick={() => handleSortOrderChange('desc')} />
                    ) :
                        (
                            <FaArrowDown className='color-primary' onClick={() => handleSortOrderChange('asc')} />
                        )
                }
            </div>
            <div className="d-flex gap-2 align-items-center sorting" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                <p>
                    {sortBy === '' ? `${t("sortby")}` : (() => {
                        switch (sortBy) {
                            case 'budget':
                                return `${t("budget")}`;
                            case 'Relevance':
                                return `${t("relevance")}`;
                            case 'createdAt':
                                return 'Date';
                            default:
                                return `${t("sortBy")}`;
                        }
                    })()}
                </p>

                <FaAngleDown className='color-primary' />
            </div>

            <div className={`sortby-dropdown ${showSortDropdown ? 'show' : ''}`} ref={sortbyRef}>
                <p className="mb-2 dropdown-item" onClick={() => handleSortChange('Relevance')}>{t("relevance")}</p>
                <p className="mb-2 dropdown-item" onClick={() => handleSortChange('budget')}>{t("budget")}</p>
                <p className="mb-2 dropdown-item" onClick={() => handleSortChange('createdAt')}>{t("date")}</p>
            </div>
        </div>

    )
}
