import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllMachinery from '../components/sections/AllMachinery'
import MachineryFilter from '../components/filters/MachineryFilter'
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
import toast, { Toaster } from 'react-hot-toast'
import loader from '../assets/images/skyscalp-loader.json'
import Lottie from 'lottie-react'


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
    const [products, setProducts] = useState([])
    const [paginationData, setPaginationData] = useState({});
    const [sortby, setSortby] = useState('createdAt')
    const [order, setOrder] = useState('desc')

    const [loading, setLoading] = useState(false)

    const location = useLocation();

    const getApiUrl = (id) => {
        let apiUrl;
        if (id === 1) {
            apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/getMachinery`;
        }
        else if (id === 2) {
            apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/getConstruction`;
        }
        else if (id === 3) {
            apiUrl = `${process.env.REACT_APP_SERVER_URL}/api/getFurniture`;
        }
        return apiUrl;
    }

    const loadData = (id) => {
        setLoading(true)


        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let apiUrl = getApiUrl(id)

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                if (result.status) {
                    // console.log(result)
                    setProducts(result.data.documents)

                    setPaginationData({
                        currentPage: result.data.currentPage,
                        totalPages: result.data.totalPages,
                        hasNextPage: result.data.hasNextPage,
                        hasPrevPage: result.data.hasPrevPage,
                        totalItems: result.data.totalProperties,
                    })
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    }



    const loadDataWithQueries = (pageNumber, sort, sortOrder) => {
        setLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let apiUrl = getApiUrl(activeCatId)

        fetch(`${apiUrl}?page=${pageNumber}&sortby=${sort}&order=${sortOrder}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false)
                console.log(result)
                if (result.status) {
                    setProducts(result.data.documents)

                    setPaginationData({
                        currentPage: result.data.currentPage,
                        totalPages: result.data.totalPages,
                        hasNextPage: result.data.hasNextPage,
                        hasPrevPage: result.data.hasPrevPage,
                        totalItems: result.data.totalProperties,
                    })
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });

    }

    const handlePageChange = (pageNumber) => {
        // Update paginationData with the new currentPage
        setPaginationData(prevState => ({
            ...prevState,
            currentPage: pageNumber
        }));
        loadDataWithQueries(pageNumber, sortby, order)
    };

    const handleSortby = (sortby) => {
        setSortby(sortby)
        loadDataWithQueries(paginationData.currentPage, sortby, order)

    }

    const handleSortOrder = (order) => {
        setOrder(order)
        loadDataWithQueries(paginationData.currentPage, sortby, order)

    }


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        // 1: machinery, 2: construction, 3: furniture
        const type = queryParams.get('market') || '1';
        setActiveCatId(parseInt(type))
        loadData(parseInt(type))
    }, [location])



    const handleActiveCategory = (id) => {
        setActiveCatId(id); // Update active category ID
        loadData(parseInt(id))

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
            <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Toaster />
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
                <div className="custom-container">
                    <div className="category-cards-grid">
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
                            <AllMachinery
                                data={products && products}
                                hasNextPage={paginationData.hasNextPage}
                                hasPrevPage={paginationData.hasPrevPage}
                                totalItems={paginationData.totalItems}
                                totalPages={paginationData.totalPages}
                                currentPage={paginationData.currentPage}
                                onPageChange={handlePageChange}
                                handleSortby={handleSortby}
                                handleSortOrder={handleSortOrder}
                            />
                        </>
                    )
                }
                else if (activeCatId === 2) {
                    return (
                        <>
                            <ConstructionFilter />
                            <AllConstruction
                                data={products && products}
                                hasNextPage={paginationData.hasNextPage}
                                hasPrevPage={paginationData.hasPrevPage}
                                totalItems={paginationData.totalItems}
                                totalPages={paginationData.totalPages}
                                currentPage={paginationData.currentPage}
                                onPageChange={handlePageChange}
                                handleSortby={handleSortby}
                                handleSortOrder={handleSortOrder}
                            />

                        </>
                    )
                }
                else if (activeCatId === 3) {
                    return (
                        <>
                            <FurnitureFilter />
                            <AllFurniture
                                data={products && products}
                                hasNextPage={paginationData.hasNextPage}
                                hasPrevPage={paginationData.hasPrevPage}
                                totalItems={paginationData.totalItems}
                                totalPages={paginationData.totalPages}
                                currentPage={paginationData.currentPage}
                                onPageChange={handlePageChange}
                                handleSortby={handleSortby}
                                handleSortOrder={handleSortOrder}
                            />
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
