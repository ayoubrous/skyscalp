
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
		if(!checkAll){
			setCheckedCategory([])
		}
	}, [checkAll])

	const handleCheckAll = () => {
		if (checkAll) {
			setCheckAll(false)

			// remove all the subcategories to state
			setCheckedSubcategories([]);
			setCheckedCategory([])

		}
		else {
			setCheckAll(true)

			// add all the subcategories to state
			const allSubcategories = categories.flatMap(item => item.subcategories);
			setCheckedSubcategories(allSubcategories);
			const allCategories = categories.flatMap(item => item.categoryName);
			setCheckedCategory(allCategories);
		}
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

			if (selectedCategory) {
				// Extract subcategories from the selected category
				const subCategoriesToRemove = selectedCategory.subcategories;

				// Update checkedSubcategories by filtering out subcategories to remove
				setCheckedSubcategories(prevSubcategories =>
					prevSubcategories.filter(subcategory =>
						!subCategoriesToRemove.includes(subcategory)
					)
				);
			}
		}
		else {
			setCheckedCategory([...checkedCategory, catName]);
			// Find the category that matches catName
			const selectedCategory = categories.find(cat => cat.categoryName === catName);

			if (selectedCategory) {
				// Extract subcategories from the selected category
				const subCategoriesToAdd = selectedCategory.subcategories;

				// Update checkedSubcategories using functional update to accumulate subcategories
				setCheckedSubcategories(prevSubcategories => [
					...prevSubcategories, // Spread previous state
					...subCategoriesToAdd // Spread new subcategories to add
				]);
			}
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
						<p>{t("selectCategory")}</p>
					)
					:
					(
						<>
							{
								checkAll ? (
									<p> {t("categories")} ({t("all")} {t("selections")})</p>
								)
									: (
										<p> {t("categories")} ({checkedSubcategories.length} {t("selections")})</p>

									)
							}
						</>
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
				<li className='dropdown-item extended p-0' >
					<div className="d-flex gap-2" style={{ backgroundColor: "#f7f7f7", padding: "5px" }}>
						<input
							type="checkbox"
							name="all"
							id="all"
							onChange={handleCheckAll}
							value={checkAll}
							checked={checkAll}
						/>
						<label htmlFor="all">{t("all")}</label>
					</div>
				</li>
				{categories.map((category, i) => (
					<li key={i} className='dropdown-item extended p-0' >
						<div className="d-flex justify-content-between" style={{ backgroundColor: "#f7f7f7", padding: "5px" }}>
							<div className="d-flex gap-2" >
								<input
									type="checkbox"
									name={category.categoryName}
									id={category.categoryName}
									checked={checkedCategory.includes(category.categoryName)}
									onChange={() => toggleCategory(category.categoryName)}
								/>
								<label htmlFor={category.categoryName}>{t(category.categoryName)}</label>
							</div>
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
											<input
												type="checkbox"
												name={subcategory}
												id={subcategory}
												checked={checkedSubcategories.includes(subcategory)}
												onChange={() => handleSubcategoryClick(subcategory)}
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
