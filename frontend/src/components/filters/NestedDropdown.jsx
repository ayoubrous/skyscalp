// import React, { useState } from 'react';
// import { FaAngleDown } from 'react-icons/fa';

// export default function NestedDropdown({ show, categoriesRef, categories, setCheckedSubcategories, checkedSubcategories }) {


//     const toggleCategory = (categoryName) => {
//         if (checkedSubcategories.includes(categoryName)) {
//             setCheckedSubcategories(checkedSubcategories.filter((name) => name !== categoryName));
//         } else {
//             setCheckedSubcategories([...checkedSubcategories, categoryName]);
//         }
//     };

//     const toggleSubcategory = (subcategoryName) => {
//         if (checkedSubcategories.includes(subcategoryName)) {
//             setCheckedSubcategories(checkedSubcategories.filter((name) => name !== subcategoryName));
//         } else {
//             setCheckedSubcategories([...checkedSubcategories, subcategoryName]);
//         }
//     };

//     const handleCategoryClick = (categoryName) => {
//         toggleCategory(categoryName);
//     };

//     const handleSubcategoryClick = (subcategoryName) => {
//         toggleSubcategory(subcategoryName);
//     };

//     const handleFinish = () => {
//         console.log(checkedSubcategories)
//     }
//     return (
//         <>

//             <ul className={`categories-select-dropdown ${show ? 'show' : ''}`} ref={categoriesRef}>
//                 {categories.map((category) => (
//                     <li key={category.categoryName} className='dropdown-item extended p-0' >
//                         <div className="d-flex justify-content-between" style={{backgroundColor: "#f7f7f7", padding: "5px"}}>
//                             <div className="d-flex gap-2" >
//                                 <input
//                                     type="checkbox"
//                                     name={category.categoryName}
//                                     id={category.categoryName}
//                                     checked={checkedSubcategories.includes(category.categoryName)}
//                                     onChange={() => toggleCategory(category.categoryName)}
//                                 />
//                                 <label htmlFor={category.categoryName}>{category.categoryName}</label>
//                             </div>
//                             <FaAngleDown onClick={() => handleCategoryClick(category.categoryName)} />
//                         </div>

//                         {checkedSubcategories.includes(category.categoryName) && (
//                             <ul className='nested-dropdown'>
//                                 {category.subcategories.map((subcategory) => (
//                                     <li key={subcategory} className='dropdown-item nested-dropdown-item'>
//                                         <div className="d-flex gap-2">
//                                             <input
//                                                 type="checkbox"
//                                                 name={subcategory}
//                                                 id={subcategory}
//                                                 checked={checkedSubcategories.includes(subcategory)}
//                                                 onChange={() => handleSubcategoryClick(subcategory)}
//                                             />
//                                             <label htmlFor={subcategory}>{subcategory}</label>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </>
//     )
// }



import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

export default function NestedDropdown({ show, categoriesRef, categories, setCheckedSubcategories, checkedSubcategories, checkAll, setCheckAll }) {
	const [extendedCat, setExtendedCat] = useState(null)
	const [checkedCategory, setCheckedCategory] = useState([])

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
						<p>Select Category</p>
					)
					:
					(
						<>
							{
								checkAll ? (
									<p> Categories (All Selections)</p>
								)
									: (
										<p> Categories ({checkedSubcategories.length} Selections)</p>

									)
							}
						</>
					)
			}

			<FaAngleDown />
			<ul className={`categories-select-dropdown ${show ? 'show' : ''}`} ref={categoriesRef}>
				<li className='dropdown-item extended p-0' >
					<div className="d-flex gap-2" style={{ backgroundColor: "#f7f7f7", padding: "5px" }}>
						<input
							type="checkbox"
							name="all"
							id="all"
							onChange={handleCheckAll}
							value={checkAll}
						/>
						<label htmlFor="all">All</label>
					</div>
				</li>
				{categories.map((category, i) => (
					<li key={category.categoryName} className='dropdown-item extended p-0' >
						<div className="d-flex justify-content-between" style={{ backgroundColor: "#f7f7f7", padding: "5px" }}>
							<div className="d-flex gap-2" >
								<input
									type="checkbox"
									name={category.categoryName}
									id={category.categoryName}
									checked={checkedCategory.includes(category.categoryName)}
									onChange={() => toggleCategory(category.categoryName)}
								/>
								<label htmlFor={category.categoryName}>{category.categoryName}</label>
							</div>
							{
								category.categoryName !== "Others" &&
								<FaAngleDown onClick={() => handleExtendCategory(i)} />
							}
						</div>

						{extendedCat === i && (
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
