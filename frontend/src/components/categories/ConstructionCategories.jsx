import React from 'react'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
export default function ConstructionCategories({ activeCategory }) {
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
                    <Link to='../categories/123'>
                        <div className={`category-card ${activeCategory && 'active'}`}>
                            <div className="image">
                                <img src="https://previews.123rf.com/images/farakos/farakos1505/farakos150500012/40511364-cement-bag-paper-sack-isolated-on-white-background.jpg" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Concrete</h5>
                        </div>
                    </Link>

                    <Link to='../categories/123'>

                        <div className="category-card">
                            <div className="image">
                                <img src="https://media.istockphoto.com/id/1307923167/vector/ribbed-metal-reinforcement-rods-for-building-reinforcement-3d-vector-illustration.jpg?s=612x612&w=0&k=20&c=C7V5AYnEIfOdYKLzcd9lp3B-MrZ2Ii0_kWsTBAmFMl0=" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Steel</h5>
                        </div>
                    </Link>
                    <Link to='../categories/123'>

                        <div className="category-card">
                            <div className="image">
                                <img src="https://i.pinimg.com/originals/3e/26/ed/3e26ed623f422047b853cab232ff0438.jpg" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Wood</h5>
                        </div>
                    </Link>
                    <Link to='../categories/123'>

                        <div className="category-card">
                            <div className="image">
                                <img src="https://media.istockphoto.com/id/1307923167/vector/ribbed-metal-reinforcement-rods-for-building-reinforcement-3d-vector-illustration.jpg?s=612x612&w=0&k=20&c=C7V5AYnEIfOdYKLzcd9lp3B-MrZ2Ii0_kWsTBAmFMl0=" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Steel</h5>
                        </div>
                    </Link>
                    <Link to='../categories/123'>

                        <div className="category-card">
                            <div className="image">
                                <img src="https://i.pinimg.com/originals/3e/26/ed/3e26ed623f422047b853cab232ff0438.jpg" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Wood</h5>
                        </div>
                    </Link>
                    <Link to='../categories/123'>

                        <div className="category-card">
                            <div className="image">
                                <img src="https://media.istockphoto.com/id/1307923167/vector/ribbed-metal-reinforcement-rods-for-building-reinforcement-3d-vector-illustration.jpg?s=612x612&w=0&k=20&c=C7V5AYnEIfOdYKLzcd9lp3B-MrZ2Ii0_kWsTBAmFMl0=" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Steel</h5>
                        </div>
                    </Link>
                    <Link to='../categories/123'>

                        <div className="category-card">
                            <div className="image">
                                <img src="https://i.pinimg.com/originals/3e/26/ed/3e26ed623f422047b853cab232ff0438.jpg" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Wood</h5>
                        </div>
                    </Link>
                    <Link to='../categories/123'>

                        <div className="category-card">
                            <div className="image">
                                <img src="https://media.istockphoto.com/id/1307923167/vector/ribbed-metal-reinforcement-rods-for-building-reinforcement-3d-vector-illustration.jpg?s=612x612&w=0&k=20&c=C7V5AYnEIfOdYKLzcd9lp3B-MrZ2Ii0_kWsTBAmFMl0=" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Steel</h5>
                        </div>
                    </Link>
                    <Link to='../categories/123'>

                        <div className="category-card">
                            <div className="image">
                                <img src="https://i.pinimg.com/originals/3e/26/ed/3e26ed623f422047b853cab232ff0438.jpg" alt="" />
                            </div>
                            <h5 className='mt-3 text-center mx-auto fw-bolder'>Wood</h5>
                        </div>
                    </Link>
                </OwlCarousel>
            </div>
        </div>
    )
}
