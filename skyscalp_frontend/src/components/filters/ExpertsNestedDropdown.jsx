
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa6';

export default function ExpertsNestedDropdown({ show, categoriesRef, categories, setCheckedSubcategories, checkedSubcategories }) {
    const [t] = useTranslation()
    const [extendedCat, setExtendedCat] = useState(null)
    const [checkedCategory, setCheckedCategory] = useState([])


    const handleCheckAll = () => {

            // remove all the subcategories to state
            setCheckedSubcategories([]);
            setCheckedCategory([])

    }

    const handleExtendCategory = (i) => {
        if (extendedCat === i) {
            setExtendedCat(null)
        }
        else {
            setExtendedCat(i)
        }
    }

    const toggleCategory = (catName) => {
        if (checkedCategory.includes(catName)) {
            setCheckedCategory(checkedCategory.filter((name) => name !== catName));
            const selectedCategory = categories.find(cat => cat.categoryName === catName);

            
        }
        else {
            setCheckedCategory([...checkedCategory, catName]);
            // Find the category that matches catName
            const selectedCategory = categories.find(cat => cat.categoryName === catName);
        }
    };

    const toggleSubcategory = (subcategoryName) => {
        if (checkedSubcategories.includes(subcategoryName)) {
            setCheckedSubcategories(checkedSubcategories.filter((name) => name !== subcategoryName));
        } else {
            setCheckedSubcategories([...checkedSubcategories, subcategoryName]);
        }
    };


    const handleSubcategoryClick = (subcategoryName) => {
        toggleSubcategory(subcategoryName);
    };

    return (
        <>
            {
                checkedSubcategories.length < 1 ?
                    (
                        <p>{t("Select Expert")}</p>
                    )
                    :
                    (
                        null
                    )
            }

            {
                show ? (
                    <FaAngleUp />
                ) : (
                    <FaAngleDown />
                )
            }
            <ul className={`categories-select-dropdown ${show ? 'show' : ''}`} ref={categoriesRef}>
                {categories.map((category, i) => (
                    <li key={i} className='dropdown-item extended p-0' >
                        <div className="d-flex justify-content-between" style={{ backgroundColor: "#f7f7f7", padding: "5px" }}>
                            <div className="d-flex gap-2" >
                                <input
                                    type="checkbox"
                                    name={category}
                                    id={category}
                                    checked={checkedCategory.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                />
                                <label htmlFor={category}>{t(category)}</label>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
