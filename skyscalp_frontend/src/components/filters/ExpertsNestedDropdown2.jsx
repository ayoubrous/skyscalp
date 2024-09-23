import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown } from 'react-icons/fa';
import { FaAngleUp } from 'react-icons/fa6';

export default function ExpertsNestedDropdown2({ show, categoriesRef, categories, setCheckedSubcategories, checkedSubcategories }) {
	const [t] = useTranslation()
	const [extendedCat, setExtendedCat] = useState(null)

	const handleExtendCategory = (i) => {
		if (extendedCat === i) {
			setExtendedCat(null)
		} else {
			setExtendedCat(i)
		}
	}

	// Function to select only one subcategory at a time
	const toggleSubcategory = (subcategoryName) => {
		if (checkedSubcategories.includes(subcategoryName)) {
			// If the same subcategory is clicked, deselect it
			setCheckedSubcategories([]);
		} else {
			// Select only the clicked subcategory, unchecking others
			setCheckedSubcategories([subcategoryName]);
		}
	};

	return (
		<>
			{
				checkedSubcategories.length < 1 ? (
					<p>{t("selectCategory")}</p>
				) : (
					<p> {t("categories")} ({checkedSubcategories.length} {t("selections")})</p>
				)
			}

			{
				show ? (
					<FaAngleUp />
				): (
					<FaAngleDown />
				)
			}

			<ul className={`categories-select-dropdown ${show ? 'show' : ''}`} ref={categoriesRef}>
				{categories.map((category, i) => (
					<li key={i} className='dropdown-item extended p-0'>
						<div onClick={() => handleExtendCategory(i)} className="d-flex justify-content-between" style={{ backgroundColor: "#f7f7f7", padding: "5px" }}>
							{/* Remove category checkbox */}
							<label>{t(category.categoryName)}</label>
							{
								category.categoryName !== "Others" &&
								<FaAngleDown onClick={() => handleExtendCategory(i)} />
							}
						</div>

						{extendedCat === i && (
							<ul className='nested-dropdown'>
								{category.subcategories.map((subcategory, i) => (
									<li key={i} className='dropdown-item nested-dropdown-item'>
										<div className="d-flex gap-2">
											{/* Only one subcategory can be selected */}
											<input
												type="checkbox"
												name={subcategory}
												id={subcategory}
												checked={checkedSubcategories.includes(subcategory)}
												onChange={() => toggleSubcategory(subcategory)}
											/>
											<label htmlFor={subcategory}>{t(subcategory)}</label>
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
