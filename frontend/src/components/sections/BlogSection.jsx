import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';
import Blog from '../cards/Blog';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


export default function BlogSection() {
    const [t] = useTranslation()


    const options = {
        loop: true,
        center: true,
        items: 1,
        margin: 10,
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
                items: 3
            }
        }
    };
    return (
        <section className="blogs-section">
            <div className="custom-container">
                <h3 className='fw-bolder mb-4'>{t("articlesAndNews")}</h3>

                <OwlCarousel id="" className="owl-carousel owl-theme" {...options}>
                    <Blog id="" datePosted="12 March 2024" title="Financial aid for your renovation work" imgUrl="https://page-assets.foxtons.co.uk/img/masthead/newhome.jpg" description="A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport" />
                    <Blog id="" datePosted="12 March 2024" title="Financial aid for your renovation work" imgUrl="https://page-assets.foxtons.co.uk/img/masthead/newhome.jpg" description="A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport" />
                    <Blog id="" datePosted="12 March 2024" title="Financial aid for your renovation work" imgUrl="https://page-assets.foxtons.co.uk/img/masthead/newhome.jpg" description="A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport" />
                </OwlCarousel>

            </div>
        </section >
    )
}
