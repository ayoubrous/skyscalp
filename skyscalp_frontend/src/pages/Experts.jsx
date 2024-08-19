import React, { useState } from 'react';
import { expertsCategories } from '../assets/data/categories';
import Slider from 'react-slick';
import { FaXmark } from 'react-icons/fa6';
import Navbar from '../components/navbar/Navbar';
import Breadcrumb from '../components/sections/Breadcrumb';
import { useTranslation } from 'react-i18next'

const Experts = () => {
	const [activeCatId, setActiveCatId] = useState(1);
	const [activeSubcats, setActiveSubcats] = useState([]);
	const [t] = useTranslation();

	const handleActiveCategory = (id) => {
		setActiveCatId(id);

	};

	const handleActiveSubcategories = (subcat) => {
		setActiveSubcats((prev) =>
			prev.includes(subcat) ? prev.filter((item) => item !== subcat) : [...prev, subcat]
		);
	};

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 7,
		slidesToScroll: 7,
		initialSlide: 0,
		arrows: true,
		responsive: [
			{ breakpoint: 1024, settings: { slidesToShow: 6, slidesToScroll: 6 } },
			{ breakpoint: 870, settings: { slidesToShow: 4, slidesToScroll: 4 } },
			{ breakpoint: 590, settings: { slidesToShow: 3, slidesToScroll: 3 } },
			{ breakpoint: 450, settings: { slidesToShow: 2, slidesToScroll: 2 } },
		],
	};

	return (
		<>
			<Navbar />
			<Breadcrumb title={t('experts')} link={t('experts')} />
			<div className='categories top-section-categories'>
				<div className='custom-container experts-container'>
					<div className='category-cards-grid'>
						{expertsCategories.map((category) => (
							<div
								key={category.id}
								className={`category-card ${activeCatId === category.id ? 'active' : ''}`}
								onClick={() => handleActiveCategory(category.id)}
							>
								<div className='image'>
									<img src={category.image} alt={category.categoryName} />
								</div>
								<h5 className='mt-3 text-center mx-auto fw-bolder'>{category.categoryName}</h5>
							</div>
						))}
					</div>
					<div className='subcategories mt-3'>
						<Slider {...settings}>
							{expertsCategories.find(it => it.id === activeCatId).subcategories.map((sub, i) => (
								<div
									key={i}
									className={`subcat-tab ${activeSubcats.includes(sub) ? 'active' : ''}`}
									onClick={() => handleActiveSubcategories(sub)}
								>
									{sub.slice(0, 13) + (sub.length > 13 ? '...' : '')}
									{activeSubcats.includes(sub) && <FaXmark className='closeTab' />}
								</div>
							))}
						</Slider>
					</div>
				</div>
			</div>
		</>
	)
};
export default Experts;