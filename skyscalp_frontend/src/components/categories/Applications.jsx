import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Applications = ({
  constructionCategories,
  activeCatId,
  handleActiveCategory,
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,

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
        breakpoint: 650,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,

        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,

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

  return (
    <>
      {/* React Slick */}
      <div className="slider-container">
        <Slider {...settings}>
          {constructionCategories.map((cat) => (
            <div
              key={cat.id}
              className={`category-card ${activeCatId === cat.id ? 'active' : ''}`}
              onClick={() => handleActiveCategory(cat.id)}
            >
              <div className="image">
                <img src={cat.image} alt="" />
              </div>
              <p className="mt-3 text-center mx-auto fw-bolder">
                {cat.categoryName.slice(0, 17) +
                  (cat.categoryName.length > 17 ? '...' : '')}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Applications;
