import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown, FaArrowDown, FaArrowUp } from 'react-icons/fa6'

export default function Sortby({sortBy, setSortBy, sortOrder, setSortOrder}) {
    const sortbyRef = useRef()
    const [showSortDropdown, setShowSortDropdown] = useState(false)

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

    const handleSortby = (value) => {
        setSortBy(value)
        setShowSortDropdown(false)
    }

    const handleSortOrder = order => {
        setSortOrder(order)
    }

    return (
        <div className="sortby">
            <div className="arrow-icon">
                {
                    sortOrder === 'ascending' ? (
                        <FaArrowUp className='color-primary' onClick={() => handleSortOrder('descending')}/>
                    ):
                    (
                        <FaArrowDown className='color-primary' onClick={() => handleSortOrder('ascending')}/>
                    )
                }
            </div>
            <div className="d-flex gap-2 align-items-center sorting" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                {
                    console.log(sortBy)
                }
                <p>{sortBy === '' ? 'Sort By' : sortBy}</p>
                <FaAngleDown className='color-primary' />
            </div>

            <div className={`sortby-dropdown ${showSortDropdown ? 'show' : ''}`} ref={sortbyRef}>
                <p className="mb-2 dropdown-item" onClick={() => handleSortby('Relevance')}>Relevance</p>
                <p className="mb-2 dropdown-item" onClick={() => handleSortby('Price')}>Price</p>
                <p className="mb-2 dropdown-item" onClick={() => handleSortby('Date')}>Date</p>
            </div>
        </div>
    )
}
