import React, { memo } from 'react';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import "../../assets/style/style.css"

const CarouselImages = memo(function CarouselImages({ images }) {
    const options = {
        loop: true,
        center: true,
        items: 1,
        margin: 0 ,
        autoplay: false,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    };
    return (
        <OwlCarousel className="owl-carousel owl-theme" {...options}>
            {images.map((image) => (
                <img key={image} src={image} alt="" className="carousel-image" />
            ))}
        </OwlCarousel>
    )
})

export default CarouselImages