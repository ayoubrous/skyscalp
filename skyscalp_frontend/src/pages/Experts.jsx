import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllMachinery from '../components/sections/AllMachinery'
import MachineryFilter from '../components/filters/MachineryFilter'
import { agentsCategories, constructionCategories, furnitureCategories, machineryCategories, marketplaceCategories } from '../assets/data/categories'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import loader from '../assets/images/skyscalp-loader.json'
import Lottie from 'lottie-react'
import ExpertCard from '../components/cards/ExpertCard'
import { experienceData, services } from '../assets/data/services'
import { FaXmark } from 'react-icons/fa6'
import ExpertsFilter from '../components/filters/ExpertsFilter'
import Sortby from '../components/utils/Sortby'
import Pagination from '../components/utils/Pagination'
import AllExperts from './AllExperts'


const Experts = () => {
    const [t] = useTranslation();
    const [activeCatId, setActiveCatId] = useState(1);
    const [activeSubcats, setActiveSubcats] = useState([]);
    const [products, setProducts] = useState([]);
    const [paginationData, setPaginationData] = useState({});
    const [sortby, setSortby] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [loading, setLoading] = useState(false);
    const location = useLocation();


    // -------- Filter states:
    const [type, setType] = useState('buy')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    // all selected filters which will show as tags 
    const [selectedFilters, setSelectedFilters] = useState([])



    const [availibilities, setAvailibilities] = useState([])

    const [selectedLanguages, setSelectedLanguages] = useState([])
    const [selectedExperience, setSelectedExperience] = useState([])
    const [selectedEducations, setSelectedEducations] = useState([])

    const [selectedFilters1, setSelectedFilters1] = useState([])
    const [selectedFilters2, setSelectedFilters2] = useState([])
    const [selectedFilters3, setSelectedFilters3] = useState([])

    // filters for customLocationDropdown component 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedStates, setSelectedStates] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [selectedStreets, setSelectedStreets] = useState([])



    const [filter1, setFilter1] = useState(null)
    const [filter2, setFilter2] = useState(null)
    const [filter3, setFilter3] = useState(null)


    const [checkedSubcategories, setCheckedSubcategories] = useState([]);

    const [filtersObj, setFiltersObj] = useState({
        minPrice: "",
        maxPrice: "",
        selectedExperty: [],

        selectedField: '',

        selectedEducations: [],
        selectedLanguages: [],
        selectedAvailibilities: [],
        selectedExperience: [],



        selectedCountries: [],
        selectedStates: [],
        selectedCities: [],
        selectedStreets: [],



        selectedFilters1: {},
        selectedFilters2: {},
        selectedFilters3: {},
    })

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
            { breakpoint: 870, settings: { slidesToShow: 4, slidesToScroll: 4 } },
            { breakpoint: 590, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 450, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        ],
    };
    const fieldsCategoriesSliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        responsive: [
            { breakpoint: 1124, settings: { slidesToShow: 4, slidesToScroll: 4 } },
            { breakpoint: 870, settings: { slidesToShow: 4, slidesToScroll: 4 } },
            { breakpoint: 590, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 450, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        ],
    };


    //setting the default country as selected by the user in localstorage
    useEffect(() => {
        // let currentCountry = localStorage.getItem('country');
        // setFiltersObj({ ...filtersObj, selectedCountries: [currentCountry] })
        let currentService = services.filter(service => service.id === activeCatId)
        setFiltersObj({ ...filtersObj, selectedField: currentService[0].field })

    }, [])


    const loadData = (pageNumber = paginationData.currentPage, sort = sortby, sortOrder = order) => {
        setLoading(true);


        let currentCountry = localStorage.getItem('country');

        // Check if currentCountry is not already in selectedCountries array
        if (!filtersObj.selectedCountries.includes(currentCountry)) {
            filtersObj.selectedCountries = [...filtersObj.selectedCountries, currentCountry];
        }

        if (filtersObj.selectedExperty.length === 0) {
            let currentService = services.filter(service => service.id === activeCatId)[0];
            filtersObj.selectedField = currentService.field
        }

        let currentService = services.filter(service => service.id === activeCatId)
        filtersObj.selectedField = currentService[0].field

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // console.log(filtersObj)
        const raw = JSON.stringify(filtersObj);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getFilteredServices?page=${paginationData.currentPage}&sortby=${sortby}&order=${order}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.status) {
                    // let currentCountry = localStorage.getItem('country');
                    // let locationBasedCountry = result.data.documents.filter(doc =>
                    //     doc.country.toLowerCase() === currentCountry.toLowerCase()
                    // );
                    // setProducts(locationBasedCountry);
                    setProducts(result.data.documents);
                    setPaginationData({
                        currentPage: result.data.currentPage,
                        totalPages: result.data.totalPages,
                        hasNextPage: result.data.hasNextPage,
                        hasPrevPage: result.data.hasPrevPage,
                        totalItems: result.data.totalProperties,
                    });
                } else {
                    // console.log(result.message);
                    setProducts([])
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };


    useEffect(() => {
        // if (location.state?.activeID) {
        //     setActiveCatId(location.state?.activeID);
        // }
        // if (location.state?.type && !checkedSubcategories.includes(location.state.type)) {
        //     setCheckedSubcategories([location.state.type]);
        //     setFiltersObj((prevFiltersObj) => ({
        //         ...prevFiltersObj,
        //         selectedExperty: [location.state.type]  // Add the selected subcategory
        //     }));
        // }

        // console.log(location.state)
        // ------------ 


        if (location.state?.filters) {
            location.state.filters.checkedSubcategories.forEach(subcat => {
                //checking where the subcat is present in experts catgegories
                services.forEach(service => {
                    service.expertise.forEach(experty => {
                        if (experty.expertyName === subcat) {
                            // setting the id of service in which the subcat is present 
                            setActiveCatId(service.id)
                        }
                    })
                })
                setCheckedSubcategories(prevState => {
                    if (!prevState.includes(subcat)) {
                        return [...prevState, subcat];
                    }
                    return prevState;
                });
                setFiltersObj((prevFiltersObj) => ({
                    ...prevFiltersObj,
                    selectedExperty: [subcat]  // Add the selected subcategory
                }));
            });


            if (location.state.filters.selectedCountries) {

                location.state.filters.selectedCountries.forEach(data => {
                    settingTheOvarallFilters(data)
                    setSelectedCountries(prevState => {
                        if (!prevState.includes(data)) {
                            return [...prevState, data];
                        }
                        return prevState;
                    });
                });
                location.state.filters.selectedStates.forEach(data => {
                    settingTheOvarallFilters(data)
                    setSelectedStates(prevState => {
                        if (!prevState.includes(data)) {
                            return [...prevState, data];
                        }
                        return prevState;
                    });
                });
                location.state.filters.selectedCities.forEach(data => {
                    settingTheOvarallFilters(data)
                    setSelectedStates(prevState => {
                        if (!prevState.includes(data)) {
                            return [...prevState, data];
                        }
                        return prevState;
                    });
                });
                location.state.filters.selectedStreets.forEach(data => {
                    settingTheOvarallFilters(data)

                    setSelectedStreets(prevState => {
                        if (!prevState.includes(data)) {
                            return [...prevState, data];
                        }
                        return prevState;
                    });
                });
            }


            function settingTheOvarallFilters(value) {
                setSelectedFilters(prevState => {
                    if (!prevState.includes(value)) {
                        return [...prevState, value];
                    }
                    return prevState;
                });
            }

        }
    }, [])


    useEffect(() => {
        loadData();
    }, [activeCatId, paginationData.currentPage, sortby, order, activeSubcats]);


    const handleActiveCategory = (id) => {
        setActiveCatId(id);
        let currentService = services.filter(service => service.id === id)
        setFiltersObj({ ...filtersObj, selectedField: currentService[0].field })
        resetAllFilters()
    };

    // CODE BEFORE LOCATION FROM HOMEPAGE 
    // const handleActiveSubcategories = (subcat) => {
    //     // Check if the subcategory is already selected
    //     if (activeSubcats.includes(subcat)) {
    //         setActiveSubcats([])
    //         setCheckedSubcategories([]);

    //     }
    //     else {
    //         // If it's not selected, set it as the active one
    //         setActiveSubcats(subcat);
    //         setCheckedSubcategories([subcat]);
    //     }
    // };

    const handleActiveSubcategories = (subcat) => {
        if (activeSubcats.includes(subcat)) {
            setActiveSubcats([]);
            setCheckedSubcategories([]);

            setFiltersObj((prevFiltersObj) => ({
                ...prevFiltersObj,
                selectedExperty: []
            }));
        } else {
            setActiveSubcats(subcat);
            setCheckedSubcategories([subcat]);

            setFiltersObj((prevFiltersObj) => ({
                ...prevFiltersObj,
                selectedExperty: [subcat]  // Add the selected subcategory
            }));
        }
    };

    useEffect(() => {
        // console.log(checkedSubcategories)
        setActiveSubcats(checkedSubcategories);
        if (checkedSubcategories.length > 0) {
            services.forEach(service => {
                let matchedExpertise = service.expertise.find(expertise => expertise.expertyName === checkedSubcategories[0]);

                if (matchedExpertise) {

                    setFilter1(matchedExpertise.filter1)
                    setFilter2(matchedExpertise.filter2)
                    setFilter3(matchedExpertise.filter3)

                }
            });
        }


        services.forEach(service => {
            service.expertise.forEach(experty => {
                if (experty.expertyName === checkedSubcategories[0]) {
                    // setting the id of service in which the subcat is present 
                    setActiveCatId(service.id)
                }
            })
        })
        
        setFiltersObj({
            ...filtersObj,
            selectedExperty: checkedSubcategories,
        })

    }, [checkedSubcategories]);

    const handlePageChange = (pageNumber) => {
        setPaginationData((prev) => ({ ...prev, currentPage: pageNumber }));
    };

    const handleSortby = (sortby) => setSortby(sortby);
    const handleSortOrder = (order) => setOrder(order);



    const applyFilters = () => {
        let currentCountry = localStorage.getItem('country');


        const searchFilters = {
            minPrice: minPrice === '' ? 0 : parseInt(minPrice),
            maxPrice: maxPrice === '' ? 0 : parseInt(maxPrice),
            selectedExperty: checkedSubcategories,

            selectedEducations: selectedEducations,
            selectedLanguages: selectedLanguages,
            selectedAvailibilities: availibilities,
            selectedExperience: selectedExperience,

            selectedCountries: [...selectedCountries, currentCountry],
            selectedStates: selectedStates,
            selectedCities: selectedCities,
            selectedStreets: selectedStreets,

            selectedFilters1: selectedFilters1,
            selectedFilters2: selectedFilters2,
            selectedFilters3: selectedFilters3,

        };

        // console.log(selectedFilters1)
        // console.log(selectedFilters2)
        // console.log(selectedFilters3)

        // console.log(searchFilters)
        setFiltersObj(searchFilters)
        // loadData()
    }

    useEffect(() => {
        loadData()
    }, [filtersObj])





    const resetAllFilters = () => {
        sessionStorage.clear()

        setMinPrice('');
        setMaxPrice('');
        setSelectedEducations([]);
        setAvailibilities([]);
        setSelectedLanguages([]);
        setSelectedExperience([]);
        setCheckedSubcategories([]);
        setSelectedCountries([])
        setSelectedStates([])
        setSelectedCities([])
        setSelectedStreets([])
        setSelectedFilters([])
        setCheckedSubcategories([])

        setSelectedCountries([])
        setSelectedStates([])
        setSelectedCities([])
        setSelectedStreets([])

        setFilter1(null)
        setFilter2(null)
        setFilter3(null)

        setSelectedFilters1([])
        setSelectedFilters2([])
        setSelectedFilters3([])

        setActiveSubcats([])


        let currentCountry = localStorage.getItem('country');
        let currentService = services.filter(service => service.id === activeCatId)

        setFiltersObj({
            minPrice: "",
            maxPrice: "",
            selectedExperty: "",

            selectedField: currentService[0].field,

            selectedEducations: [],
            selectedLanguages: [],
            selectedAvailibilities: [],
            selectedExperience: [],

            selectedCountries: [currentCountry],
            selectedStates: [],
            selectedCities: [],
            selectedStreets: [],


            selectedFilters1: {},
            selectedFilters2: {},
            selectedFilters3: {},
        })
    }


    const resetSearchFilters = () => {
        sessionStorage.clear()

        setMinPrice('');
        setMaxPrice('');
        setSelectedEducations([]);
        setAvailibilities([]);
        setSelectedLanguages([]);
        setSelectedExperience([]);
        setCheckedSubcategories([]);
        setSelectedCountries([])
        setSelectedStates([])
        setSelectedCities([])
        setSelectedStreets([])
        setSelectedFilters([])
        setCheckedSubcategories([])

        setSelectedCountries([])
        setSelectedStates([])
        setSelectedCities([])
        setSelectedStreets([])

        setFilter1(null)
        setFilter2(null)
        setFilter3(null)

        setSelectedFilters1([])
        setSelectedFilters2([])
        setSelectedFilters3([])

        setActiveSubcats([])
    }




    return (
        <>
            <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Toaster />
            <Navbar />

            <Breadcrumb title={t('Experts')} link={t('Experts')} />

            <div className='categories top-section-categories '>
                <div className='custom-container'>
                    {/* <div className='category-cards-grid agents-cards-grid'> */}
                    <Slider {...fieldsCategoriesSliderSettings}>

                        {services.map((category, i) => (
                            <div
                                key={category.id}
                                className={`category-card ${activeCatId === category.id ? 'active' : ''}`}
                                onClick={() => handleActiveCategory(category.id)}
                            >
                                <div className='image'>
                                    <img src={category.image} alt={category.image} />
                                </div>
                                <h5 className='mt-3 text-center mx-auto fw-bolder'>{t(category.field)}</h5>
                            </div>
                        ))}
                    </Slider>
                    {/* </div> */}

                    <div className='subcategories mt-3'>
                        {/* <Slider {...settings}>
                            {services.map((category) => {
                                if (activeCatId === category.id) {
                                    return category.expertise.map((sub, i) => (
                                        <div
                                            key={i}
                                            className={`subcat-tab ${activeSubcats.includes(sub.expertyName) ? 'active' : ''}`}
                                            onClick={() => handleActiveSubcategories(sub.expertyName)}
                                        >
                                            {t(sub.expertyName).slice(0, 13) + (sub.expertyName.length > 13 ? '...' : '')}

                                            {activeSubcats.includes(sub.expertyName) && <FaXmark className='closeTab' />}
                                        </div>
                                    ));
                                }
                                return null;
                            })}
                        </Slider> */}
                        <Slider {...settings}>
                            {services.map((category) => {
                                if (activeCatId === category.id) {
                                    // Create an array of unique expertise names
                                    const uniqueExpertise = Array.from(new Set(category.expertise.map(sub => sub.expertyName)));

                                    return uniqueExpertise.map((subName, i) => (
                                        <div
                                            key={i}
                                            className={`subcat-tab ${activeSubcats.includes(subName) ? 'active' : ''}`}
                                            onClick={() => handleActiveSubcategories(subName)}
                                        >
                                            {t(subName).slice(0, 25) + (subName.length > 25 ? '...' : '')}

                                            {activeSubcats.includes(subName) && <FaXmark className='closeTab' />}
                                        </div>
                                    ));
                                }
                                return null;
                            })}
                        </Slider>
                    </div>
                </div>
            </div>

            <ExpertsFilter

                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                setSelectedCountries={setSelectedCountries}
                setSelectedStates={setSelectedStates}
                setSelectedCities={setSelectedCities}
                setSelectedStreets={setSelectedStreets}
                setCheckedSubcategories={setCheckedSubcategories}
                setSelectedLanguages={setSelectedLanguages}
                selectedExperience={selectedExperience}
                availibilities={availibilities}
                selectedEducations={selectedEducations}

                minPrice={minPrice}
                maxPrice={maxPrice}
                selectedCountries={selectedCountries}
                selectedStates={selectedStates}
                selectedCities={selectedCities}
                selectedStreets={selectedStreets}
                checkedSubcategories={checkedSubcategories}
                selectedLanguages={selectedLanguages}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                applyFilters={applyFilters}
                clearAllFilters={resetAllFilters}
                setSelectedExperience={setSelectedExperience}
                setAvailibilities={setAvailibilities}
                setSelectedEducations={setSelectedEducations}

                filter1={filter1}
                filter2={filter2}
                filter3={filter3}
                setFilter1={setFilter1}
                setFilter2={setFilter2}
                setFilter3={setFilter3}

                selectedFilters1={selectedFilters1}
                selectedFilters2={selectedFilters2}
                selectedFilters3={selectedFilters3}

                setSelectedFilters1={setSelectedFilters1}
                setSelectedFilters2={setSelectedFilters2}
                setSelectedFilters3={setSelectedFilters3}


            />
            {/* <div className="allMachinery allItems">
                <div className="custom-container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bolder color-primary text-uppercase">{t("Experts MarketPlace")}</h2>

                        <Sortby handleSortby={handleSortby} handleSortOrder={handleSortOrder} />

                    </div>

                    <div className="cards-grid agents-cards-grid">
                        {
                            products.length === 0 && (
                                <h5 className='my-4'>{t("notProductsFound")}</h5>
                            )
                        }
                        {
                            products && products.map(item => {
                                return (
                                    <ExpertCard key={item._id} data={item} />
                                )
                            })
                        }
                    </div>

                    <Pagination hasNextPage={hasNextPage} hasPrevPage={hasPrevPage} onPageChange={onPageChange} pages={pages} currentPage={currentPage} totalPages={totalPages} />

                </div>
            </div> */}

            <AllExperts
                data={products}
                hasNextPage={paginationData.hasNextPage}
                hasPrevPage={paginationData.hasPrevPage}
                totalItems={paginationData.totalItems}
                totalPages={paginationData.totalPages}
                currentPage={paginationData.currentPage}
                onPageChange={handlePageChange}
                handleSortby={handleSortby}
                handleSortOrder={handleSortOrder}
            />
            <BlogSection />



            {/* <ContactUs supportTitle={t("homeSupportTitle")} supportDescription={t("homeSupportDescription")} contactEmail={"information.marketplace@skyscalp.com"} contactPhone={"+33771759956"} /> */}

            <Footer />
        </>
    );
};

export default Experts;