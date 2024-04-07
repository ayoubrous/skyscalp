import React from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function ConstructionCategories() {
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
                        <img src="https://previews.123rf.com/images/farakos/farakos1505/farakos150500012/40511364-cement-bag-paper-sack-isolated-on-white-background.jpg" alt="" />
                        </div>
                        <h5 className='mt-3 text-center mx-auto fw-bolder'>Steel</h5>
                    </div>
                    <div className="category-card">
                        <div className="image">
                        <img src="https://media.istockphoto.com/id/1307923167/vector/ribbed-metal-reinforcement-rods-for-building-reinforcement-3d-vector-illustration.jpg?s=612x612&w=0&k=20&c=C7V5AYnEIfOdYKLzcd9lp3B-MrZ2Ii0_kWsTBAmFMl0=" alt="" />
                        </div>
                        <h5 className='mt-3 text-center mx-auto fw-bolder'>Cement</h5>
                    </div>
                </OwlCarousel>
            </div>
        </div>
    )
}
