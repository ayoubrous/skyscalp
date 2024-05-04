import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllProperties from '../components/sections/AllProperties'
import AllMachinery from '../components/sections/AllMachinery'
import MachineryCategories from '../components/categories/MachineryCategories'
import MachineryFilter from '../components/filters/MachineryFilter'
import TestNestedDropdown from '../components/filters/TestNestedDropdown'
import FilterTagsBackup from '../components/filters/FilterTagsBackup'
import Applications from '../components/categories/Applications'
import { constructionCategories, furnitureCategories, machineryCategories, marketplaceCategories } from '../assets/data/categories'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation } from 'react-router-dom'
import { FaXmark } from 'react-icons/fa6'
import ConstructionFilter from '../components/filters/ConstructionFilter'
import AllConstruction from '../components/sections/AllConstruction'
import FurnitureFilter from '../components/filters/FurnitureFilter'
import AllFurniture from '../components/sections/AllFurnitures'

export default function MarketPlace() {
    const [t] = useTranslation()


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,

                },
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,

                },
            },
            {
                breakpoint: 590,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,

                },
            },
            {
                breakpoint: 450,
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

    const [activeCatId, setActiveCatId] = useState(1);
    const [activeSubcats, setActiveSubcats] = useState([])
    const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);

        const type = queryParams.get('market') || '1';
        console.log(type)
        setActiveCatId(parseInt(type))
    }, [location])



    const handleActiveCategory = (id) => {
        setActiveCatId(id); // Update active category ID
    };

    const handleActiveSubcategories = (subcat) => {
        if (!activeSubcats.includes(subcat)) {
            setActiveSubcats([...activeSubcats, subcat]);
        }
        else {
            setActiveSubcats(item => item.filter(item => item !== subcat));
        }
    }

    return (
        <>
            <Navbar />

            {(() => {
                if (activeCatId === 1) {
                    return (
                        <>
                            <Breadcrumb title={t("machineryTools")} link={t("machineryTools")} />
                        </>
                    )
                }
                else if (activeCatId === 2) {
                    return (
                        <>
                            <Breadcrumb title={t("buildingMaterial")} link={t("buildingMaterial")} />
                        </>
                    )
                }
                else if (activeCatId === 3) {
                    return (
                        <>
                            <Breadcrumb title={t("furnitureAppliances")} link={t("furnitureAppliances")} />
                        </>
                    )
                }
            })()}

            {/* <MachineryCategories /> */}
            <div className="categories top-section-categories">
                <div className="container">
                    <div className="cards-grid">
                        {
                            marketplaceCategories.map(category => {
                                return (
                                    <div className={`category-card ${activeCatId === category.id ? 'active' : ''}`} key={category.id} onClick={() => handleActiveCategory(category.id)}>
                                        <div className="image">
                                            <img src={category.image} alt="" />
                                        </div>
                                        <h5 className='mt-3 text-center mx-auto fw-bolder'>{category.name}</h5>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="subcategories mt-3">
                        <Slider {...settings}>
                            {(() => {
                                let categories;
                                if (activeCatId === 1) {
                                    categories = machineryCategories;
                                } else if (activeCatId === 2) {
                                    categories = constructionCategories;
                                } else if (activeCatId === 3) {
                                    categories = furnitureCategories;
                                }

                                if (categories) {
                                    return categories.map(application => (
                                        application.subcategories.map((sub, i) => (
                                            <div key={i} className={`subcat-tab ${activeSubcats.includes(sub) ? 'active' : ''}`} onClick={() => handleActiveSubcategories(sub)}>
                                                {sub.slice(0, 13) + (sub.length > 13 ? '...' : '')}
                                                {activeSubcats.includes(sub) ? (
                                                    <FaXmark />
                                                ) : ''}
                                            </div>
                                        ))
                                    ));
                                } else {
                                    return null;
                                }
                            })()}
                        </Slider>


                    </div>
                </div>
            </div>
            {(() => {
                if (activeCatId === 1) {
                    return (
                        <>
                            <MachineryFilter />
                            <AllMachinery />
                        </>
                    )
                }
                else if (activeCatId === 2) {
                    return (
                        <>
                            <ConstructionFilter />
                            <AllConstruction />
                        </>
                    )
                }
                else if (activeCatId === 3) {
                    return (
                        <>
                            <FurnitureFilter />
                            <AllFurniture />
                        </>
                    )
                }
            })()}


            <BlogSection />
            <ContactUs supportTitle={t("machinerySupportTitle")} supportDescription={t("machinerySupportDescription")} />
            {/* <FilterTagsBackup /> */}
            <Footer />

        </>
    )
}
