import React from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function MachineryCategories() {
    const options = {
        loop: true,
        center: false,
        items: 1,
        margin: 10,
        autoplay: false,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: true,
        responsive: {
            0: {
                items: 2
            },
            700: {
                items: 4
            },
            1000: {
                items: 5
            }
        }
    };
    return (
        <div className='categories machineryCategories'>
            <div className="custom-container">
                <OwlCarousel id="" className="owl-carousel owl-theme" {...options}>
                    <div className="category-card">
                        <div className="image">
                        <img src="https://housing.com/news/wp-content/uploads/2023/03/Different-types-of-road-roller-and-their-uses-04.png" alt="" />
                        </div>
                        <h5 className='mt-3 text-center mx-auto fw-bolder'>Foundation</h5>
                    </div>
                    <div className="category-card">
                        <div className="image">
                        <img src="https://w7.pngwing.com/pngs/21/308/png-transparent-yellow-crane-illustration-india-mobile-crane-heavy-equipment-architectural-engineering-crane-company-service-technic-thumbnail.png" alt="" />
                        </div>
                        <h5 className='mt-3 text-center mx-auto fw-bolder'>Construction</h5>
                    </div>
                    <div className="category-card">
                        <div className="image">
                        <img src="https://w7.pngwing.com/pngs/21/308/png-transparent-yellow-crane-illustration-india-mobile-crane-heavy-equipment-architectural-engineering-crane-company-service-technic-thumbnail.png" alt="" />
                        </div>
                        <h5 className='mt-3 text-center mx-auto fw-bolder'>Roofing</h5>
                    </div>
                    <div className="category-card">
                        <div className="image">
                        <img src="https://w7.pngwing.com/pngs/21/308/png-transparent-yellow-crane-illustration-india-mobile-crane-heavy-equipment-architectural-engineering-crane-company-service-technic-thumbnail.png" alt="" />
                        </div>
                        <h5 className='mt-3 text-center mx-auto fw-bolder'>Foundation</h5>
                    </div>
                    
                </OwlCarousel>
            </div>
        </div>
    )
}
