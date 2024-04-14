import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

export default function NestedDropdown({ show, categoriesRef, categories, setCheckedSubcategories, checkedSubcategories }) {


    const toggleCategory = (categoryName) => {
        if (checkedSubcategories.includes(categoryName)) {
            setCheckedSubcategories(checkedSubcategories.filter((name) => name !== categoryName));
        } else {
            setCheckedSubcategories([...checkedSubcategories, categoryName]);
        }
    };

    const toggleSubcategory = (subcategoryName) => {
        if (checkedSubcategories.includes(subcategoryName)) {
            setCheckedSubcategories(checkedSubcategories.filter((name) => name !== subcategoryName));
        } else {
            setCheckedSubcategories([...checkedSubcategories, subcategoryName]);
        }
    };

    const handleCategoryClick = (categoryName) => {
        toggleCategory(categoryName);
    };

    const handleSubcategoryClick = (subcategoryName) => {
        toggleSubcategory(subcategoryName);
    };

    const handleFinish = () => {
        console.log(checkedSubcategories)
    }
    return (
        <>

            <ul className={`categories-select-dropdown ${show ? 'show' : ''}`} ref={categoriesRef}>
                {categories.map((category) => (
                    <li key={category.categoryName} className='dropdown-item extended'>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex gap-2" onClick={() => handleCategoryClick(category.categoryName)}>
                                <input
                                    type="checkbox"
                                    name={category.categoryName}
                                    id={category.categoryName}
                                    checked={checkedSubcategories.includes(category.categoryName)}
                                    onChange={() => toggleCategory(category.categoryName)}
                                />
                                <label htmlFor={category.categoryName}>{category.categoryName}</label>
                            </div>
                            <FaAngleDown onClick={() => handleCategoryClick(category.categoryName)} />
                        </div>

                        {checkedSubcategories.includes(category.categoryName) && (
                            <ul className='nested-dropdown'>
                                {category.subcategories.map((subcategory) => (
                                    <li key={subcategory} className='dropdown-item nested-dropdown-item'>
                                        <div className="d-flex gap-2">
                                            <input
                                                type="checkbox"
                                                name={subcategory}
                                                id={subcategory}
                                                checked={checkedSubcategories.includes(subcategory)}
                                                onChange={() => handleSubcategoryClick(subcategory)}
                                            />
                                            <label htmlFor={subcategory}>{subcategory}</label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    )
}
