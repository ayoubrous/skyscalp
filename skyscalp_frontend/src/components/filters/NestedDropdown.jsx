import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa6';

export default function NestedDropdown({ show, categoriesRef, categories, setCheckedSubcategories, checkedSubcategories, checkAll, setCheckAll }) {
    const [t] = useTranslation()
    const [extendedCat, setExtendedCat] = useState(null)
    const [checkedCategory, setCheckedCategory] = useState([])

    useEffect(() => {
        if (!checkAll) {
            setCheckedCategory([])
        }
    }, [checkAll])

    useEffect(() => {
        // Update checked categories based on checked subcategories
        const newCheckedCategories = categories.filter(category =>
            category.subcategories.some(subcategory => checkedSubcategories.includes(subcategory))
        ).map(category => category.categoryName);

        setCheckedCategory(newCheckedCategories);
    }, [checkedSubcategories, categories]);

    const handleCheckAll = () => {
        if (checkAll) {
            setCheckAll(false)
            setCheckedSubcategories([]);
            setCheckedCategory([])
        } else {
            setCheckAll(true)
            const allSubcategories = categories.flatMap(item => item.subcategories);
            setCheckedSubcategories(allSubcategories);
            const allCategories = categories.map(item => item.categoryName);
            setCheckedCategory(allCategories);
        }
    }

    const handleExtendCategory = (i) => {
        setExtendedCat(extendedCat === i ? null : i)
    }

    const toggleCategory = (catName) => {
        const selectedCategory = categories.find(cat => cat.categoryName === catName);
        if (!selectedCategory) return;

        const subCategories = selectedCategory.subcategories;

        if (checkedCategory.includes(catName)) {
            // Uncheck the category and all its subcategories
            setCheckedCategory(checkedCategory.filter((name) => name !== catName));
            setCheckedSubcategories(prevSubcategories =>
                prevSubcategories.filter(subcategory => !subCategories.includes(subcategory))
            );
        } else {
            // Check the category and all its subcategories
            setCheckedCategory([...checkedCategory, catName]);
            setCheckedSubcategories(prevSubcategories => [
                ...prevSubcategories,
                ...subCategories.filter(subcategory => !prevSubcategories.includes(subcategory))
            ]);
        }
    };

    const toggleSubcategory = (e, subcategoryName, categoryName) => {
        e.preventDefault(); // Prevent default label behavior

        if (checkedSubcategories.includes(subcategoryName)) {
            setCheckedSubcategories(checkedSubcategories.filter((name) => name !== subcategoryName));
        } else {
            setCheckedSubcategories([...checkedSubcategories, subcategoryName]);
        }
    };

    return (
        <>
            {checkedSubcategories.length < 1 ? (
                <p>{t("category")}</p>
            ) : (
                <p>{t("categories")} ({checkAll ? t("all") : checkedSubcategories.length} {t("selections")})</p>
            )}

            {show ? <FaAngleUp /> : <FaAngleDown />}

            <ul className={`categories-select-dropdown ${show ? 'show' : ''}`} ref={categoriesRef}>
                <li className='dropdown-item extended p-0'>
                    <div className="d-flex gap-2" style={{ backgroundColor: "#f7f7f7", padding: "5px" }}>
                        <input
                            type="checkbox"
                            name="all"
                            id="all"
                            onChange={handleCheckAll}
                            checked={checkAll}
                        />
                        <label htmlFor="all">{t("all")}</label>
                    </div>
                </li>
                {categories.map((category, i) => (
                    <li key={i} className='dropdown-item extended p-0'>
                        <div className="d-flex justify-content-between" style={{ backgroundColor: "#f7f7f7", padding: "5px" }}>
                            <div className="d-flex gap-2">
                                <input
                                    type="checkbox"
                                    name={category.categoryName}
                                    id={category.categoryName}
                                    checked={checkedCategory.includes(category.categoryName)}
                                    onChange={() => toggleCategory(category.categoryName)}
                                />
                                <label htmlFor={category.categoryName}>{t(category.categoryName)}</label>
                            </div>
                            {category.categoryName !== "Others" && (
                                <div className='text-end' style={{ width: "50%" }} onClick={() => handleExtendCategory(i)}>
                                    <FaAngleDown className='' />
                                </div>
                            )}
                        </div>

                        {extendedCat === i && (
                            <ul className='nested-dropdown'>
                                {category.subcategories.map((subcategory, j) => (
                                    <li key={j} className='dropdown-item nested-dropdown-item' onClick={(e) => toggleSubcategory(e, subcategory, category.categoryName)}>
                                        <div className="d-flex gap-2">
                                            <input
                                                type="checkbox"
                                                name={subcategory}
                                                id={subcategory}
                                                checked={checkedSubcategories.includes(subcategory)}
                                                onChange={() => { }}
                                            />
                                            <label htmlFor={subcategory} onClick={(e) => e.preventDefault()}>{t(subcategory)}</label>
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