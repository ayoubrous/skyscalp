// ConstructionCategories.js

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Applications from './Applications';
import { constructionCategories, machineryCategories } from '../../assets/data/categories';

export default function ConstructionCategories() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7,

                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,

                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                },
            },
        ],
        // **Solution:** Add margin using the `slick-carousel` class
        className: 'slick-carousel slick-initialized slick-slider', // Include base classes
        slickPrev: '.slider-container .slick-prev', // Adjust selectors if needed
        slickNext: '.slider-container .slick-next', // Adjust selectors if needed
        afterChange: (currentSlide) => {
            // Optional: Update other components based on slide change (e.g., indicators)
        },
    };

    const [activeCatId, setActiveCatId] = useState(null);


    const handleActiveCategory = (id) => {
        setActiveCatId(id); // Update active category ID
    };

    return (
        <div className="categories machineryCategories">
            <div className="custom-container">
                <Applications
                    constructionCategories={constructionCategories}
                    activeCatId={activeCatId}
                    handleActiveCategory={handleActiveCategory}
                />
                <div className="subcategories">
                    <Slider {...settings}>
                        {activeCatId === null
                            ? constructionCategories[0].subcategories.map((sub, i) => (
                                <div key={i} className="subcat-tab">
                                    {sub.slice(0, 13) + (sub.length > 13 ? '...' : '')}
                                </div>
                            ))
                            : constructionCategories.find(cat => cat.id === activeCatId)?.subcategories.map((sub, i) => (
                                <div key={i} className="subcat-tab">
                                    {sub.slice(0, 13) + (sub.length > 13 ? '...' : '')}
                                </div>
                            ))
                        }
                    </Slider>


                </div>
            </div>
        </div>
    );
}
