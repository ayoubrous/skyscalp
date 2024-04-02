import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';
import Blog from '../cards/Blog';


export default function BlogSection() {
    const [t] = useTranslation()
    return (
        <section className="blogs-section">
            <div className="custom-container">
                <h3 className='fw-bolder mb-4'>{t("articlesAndNews")}</h3>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Scrollbar, A11y, Autoplay]}
                    spaceBetween={10}
                    // slidesPerView={4}
                    // navigation
                    autoplay
                    // pagination={{ clickable: true }}
                    // scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    loop={true}
                    className="review-slider"
                    navigation={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        400: {
                            slidesPerView: 1,
                        },
                        639: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    <SwiperSlide>
                        <Blog id="" title="Financial aid for your renovation work" imgUrl="https://page-assets.foxtons.co.uk/img/masthead/newhome.jpg" description="A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport"/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Blog id="" title="Financial aid for your renovation work and propert building" imgUrl="https://page-assets.foxtons.co.uk/img/masthead/newhome.jpg" description="A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it 'sticks' in place (like position:fixed)."/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Blog id="" title="Financial aid for your renovation work" imgUrl="https://page-assets.foxtons.co.uk/img/masthead/newhome.jpg" description="A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it 'sticks' in place (like position:fixed)."/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Blog id="" title="Financial aid for your renovation work" imgUrl="https://page-assets.foxtons.co.uk/img/masthead/newhome.jpg" description="A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it 'sticks' in place (like position:fixed)."/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Blog id="" title="Financial aid for your renovation work" imgUrl="https://page-assets.foxtons.co.uk/img/masthead/newhome.jpg" description="A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it 'sticks' in place (like position:fixed)."/>
                    </SwiperSlide>

                </Swiper>

            </div>
        </section >
    )
}
