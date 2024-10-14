import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllMachinery from '../components/sections/AllMachinery'
import MachineryFilter from '../components/filters/MachineryFilter'
import { constructionCategories, machineryCategories, marketplaceCategories } from '../assets/data/categories'
import { furnitureCategories } from '../assets/data/furnitureCategories'
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
import { materialCategories } from '../assets/data/materialsCategory'


const MarketPlace = () => {
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

    const [guarantee, setGuarantee] = useState(false)
    const [yearBuild, setYearBuild] = useState([])

    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedConditions, setSelectedConditions] = useState([])
    const [selectedMachineryType, setSelectedMachineryType] = useState([])
    const [selectedMaterialType, setSelectedMaterialType] = useState([])

    const [selectedMaterials, setSelectedMaterials] = useState([])
    const [materialItemType, setMaterialItemType] = useState([])

    // filters for customLocationDropdown component 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedStates, setSelectedStates] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [selectedStreets, setSelectedStreets] = useState([])

    const [checkedSubcategories, setCheckedSubcategories] = useState([]);


    useEffect(() => {
        // console.log(location.state?.filters)

        if (location.state?.filters) {
            location.state.filters.checkedSubcategories.forEach(subcat => {
                setCheckedSubcategories(prevState => {
                    if (!prevState.includes(subcat)) {
                        return [...prevState, subcat];
                    }
                    return prevState;
                });
            });

            if (location.state.filters.selectedCountries) {

                location.state.filters?.selectedCountries.forEach(data => {
                    settingTheOvarallFilters(data)
                    setSelectedCountries(prevState => {
                        if (!prevState.includes(data)) {
                            return [...prevState, data];
                        }
                        return prevState;
                    });
                });
                location.state.filters?.selectedStates.forEach(data => {
                    settingTheOvarallFilters(data)
                    setSelectedStates(prevState => {
                        if (!prevState.includes(data)) {
                            return [...prevState, data];
                        }
                        return prevState;
                    });
                });
                location.state.filters?.selectedCities.forEach(data => {
                    settingTheOvarallFilters(data)
                    setSelectedStates(prevState => {
                        if (!prevState.includes(data)) {
                            return [...prevState, data];
                        }
                        return prevState;
                    });
                });
                location.state.filters?.selectedStreets.forEach(data => {
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


        // code for navigating from categories cards 
        // if (location.state?.type && !checkedSubcategories.includes(location.state.type)) {
        //     setCheckedSubcategories([...checkedSubcategories, location.state.type])

        // }
    }, [])


    const [filtersObj, setFiltersObj] = useState({
        type: '',
        checkedSubcategories: [],
        minPrice: '',
        maxPrice: '',
        selectedMachineryType: [],
        selectedMaterialType: [],
        guarantee: false,
        selectedBrands: [],
        selectedConditions: [],
        yearBuild: [],
        selectedCountries: [],
        selectedStates: [],
        selectedCities: [],
        selectedStreets: [],
        materialItemType: [],
        selectedMaterials: [],
    })

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
            { breakpoint: 870, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 590, settings: { slidesToShow: 2, slidesToScroll: 2 } },
            { breakpoint: 450, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        ],
    };


    // const [currentCountry, setCurrentCountry] = useState(null)

    // useEffect(() => {
    //     let getCountry = localStorage.getItem('country')
    //     console.log(getCountry)
    //     setCurrentCountry(getCountry)
    // }, [])

    const getApiUrl = (id) => {
        switch (id) {
            case 1:
                // return `${process.env.REACT_APP_SERVER_URL}/api/getMachinery`;
                return `${process.env.REACT_APP_SERVER_URL}/api/getProductsByFilters?materialGroup=${'machinery'}`;
            case 2:
                // return `${process.env.REACT_APP_SERVER_URL}/api/getConstruction`;
                return `${process.env.REACT_APP_SERVER_URL}/api/getProductsByFilters?materialGroup=${'construction'}`;
            case 3:
                // return `${process.env.REACT_APP_SERVER_URL}/api/getFurniture`;
                return `${process.env.REACT_APP_SERVER_URL}/api/getProductsByFilters?materialGroup=${'furniture'}`;
            default:
                return '';
        }
    };

    const loadData = (pageNumber = paginationData.currentPage, sort = sortby, sortOrder = order) => {
        // console.log("LOad data called")
        // return
        setLoading(true);

        let updatedFiltersObj = { ...filtersObj };

        const queryParams = new URLSearchParams(location.search);
        const queryType = queryParams.get('type');

        if (queryType) {
            updatedFiltersObj = { ...updatedFiltersObj, type: queryType };
        }
        else {
            updatedFiltersObj = { ...updatedFiltersObj, type: '' };
            setFiltersObj(updatedFiltersObj);
        }

        // const savedFilters = sessionStorage.getItem('appliedFilters');

        // if (savedFilters && !JSON.parse(savedFilters).isProperties) {
        //     const parsedFilters = JSON.parse(savedFilters);
        //     updatedFiltersObj = parsedFilters
        //     if (queryType) {
        //         updatedFiltersObj = { ...updatedFiltersObj, type: queryType };
        //     }
        //     else {
        //         updatedFiltersObj = parsedFilters
        //     }
        //     setFiltersObj(parsedFilters);
        //     // Set individual state variables from the saved filters

        //     setType(parsedFilters.type);
        //     setMinPrice(parsedFilters.minPrice === 0 ? '' : parsedFilters.minPrice);
        //     setMaxPrice(parsedFilters.maxPrice === 0 ? '' : parsedFilters.maxPrice);
        //     setGuarantee(parsedFilters.guarantee);
        //     setSelectedMachineryType(parsedFilters.selectedMachineryType);
        //     setSelectedMaterialType(parsedFilters.selectedMaterialType);
        //     setSelectedBrands(parsedFilters.selectedBrands);
        //     setYearBuild(parsedFilters.yearBuild);
        //     setSelectedConditions(parsedFilters.selectedConditions);
        //     setSelectedCountries(parsedFilters.selectedCountries);
        //     setSelectedStates(parsedFilters.selectedStates);
        //     setSelectedCities(parsedFilters.selectedCities);
        //     setSelectedStreets(parsedFilters.selectedStreets);
        //     setCheckedSubcategories(parsedFilters.checkedSubcategories);

        //     const combinedFilters = [
        //         ...parsedFilters.yearBuild,
        //         ...parsedFilters.selectedBrands,
        //         ...parsedFilters.selectedMachineryType,
        //         ...parsedFilters.selectedMaterialType,
        //         ...parsedFilters.selectedConditions,
        //         ...parsedFilters.selectedCountries,
        //         ...parsedFilters.selectedStates,
        //         ...parsedFilters.selectedCities,
        //         ...parsedFilters.selectedStreets,
        //         ...parsedFilters.selectedStreets,
        //         ...parsedFilters.selectedMaterials,
        //         ...parsedFilters.materialItemType,
        //     ];

        //     setSelectedFilters(combinedFilters);
        // }



        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if (activeCatId === 2 || activeCatId === 3) {
            updatedFiltersObj.type = ''
        }
        else {
            updatedFiltersObj.type = type
        }

        if (activeSubcats.length > 0) {
            updatedFiltersObj.checkedSubcategories = activeSubcats
        }
        else {
            updatedFiltersObj.checkedSubcategories = checkedSubcategories
        }

        const raw = JSON.stringify(updatedFiltersObj);
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const apiUrl = getApiUrl(activeCatId);

        fetch(`${apiUrl}&page=${pageNumber}&sortby=${sort}&order=${sortOrder}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.status) {
                    let currentCountry = localStorage.getItem('country');
                    let locationBasedCountry = result.data.documents.filter(doc =>
                        doc.country.toLowerCase() === currentCountry.toLowerCase()
                    );
                    setProducts(locationBasedCountry);
                    // setProducts(result.data.documents);
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
        const queryParams = new URLSearchParams(location.search);
        const type = queryParams.get('market') || 1;
        setActiveCatId(parseInt(type));
    }, [location]);

    // useEffect(() => {
    //     loadData();
    // }, [activeCatId, paginationData.currentPage, sortby, order, activeSubcats]);

    useEffect(() => {
        loadData();
    }, [activeCatId, paginationData.currentPage, sortby, order]);

    const handleActiveCategory = (id) => {
        setActiveCatId(id);
        resetAllFilters()

        const queryParams = new URLSearchParams(location.search);
        queryParams.set('market', id);
        window.history.replaceState({}, '', `${location.pathname}?${queryParams}`);
    };

    const handleActiveSubcategories = (subcat) => {
        setActiveSubcats((prev) =>
            prev.includes(subcat) ? prev.filter((item) => item !== subcat) : [...prev, subcat]
        );

        setCheckedSubcategories((prev) =>
            prev.includes(subcat) ? prev.filter((item) => item !== subcat) : [...prev, subcat]
        );

        // setSelectedFilters((prev) =>
        //     prev.includes(subcat) ? prev.filter((item) => item !== subcat) : [...prev, subcat]
        // );
        // setSelectedFilters(activeSubcats)
    };

    useEffect(() => {
        setActiveSubcats(checkedSubcategories);

    }, [checkedSubcategories])

    // useEffect(() => {
    //     const updatedActiveSubcats = activeSubcats.filter(actSub => {
    //         return selectedFilters.includes(actSub);
    //     });
    //     setActiveSubcats(updatedActiveSubcats);

    // }, [selectedFilters])




    // useEffect(() => {
    //     const combinedFilters = Array.from(new Set([...selectedFilters, ...activeSubcats]));
    //     setSelectedFilters(combinedFilters);
    // }, [activeSubcats])

    const handlePageChange = (pageNumber) => {
        setPaginationData((prev) => ({ ...prev, currentPage: pageNumber }));
    };

    const handleSortby = (sortby) => setSortby(sortby);
    const handleSortOrder = (order) => setOrder(order);



    const applyFilters = () => {

        const searchFilters = {
            type: type,
            checkedSubcategories: checkedSubcategories,
            guarantee: guarantee,
            minPrice: minPrice === '' ? 0 : parseInt(minPrice),
            maxPrice: maxPrice === '' ? 0 : parseInt(maxPrice),
            selectedMachineryType: selectedMachineryType,
            selectedMaterialType: selectedMaterialType,
            materialItemType: materialItemType,
            selectedMaterials: selectedMaterials,
            selectedBrands: selectedBrands,
            selectedConditions: selectedConditions,
            yearBuild: yearBuild,
            selectedCountries: selectedCountries,
            selectedStates: selectedStates,
            selectedCities: selectedCities,
            selectedStreets: selectedStreets
        };
        // console.log("marketplace", searchFilters)
        // sessionStorage.setItem('appliedFilters', JSON.stringify(searchFilters))
        setFiltersObj(searchFilters)
        loadData()
    }

    const resetAllFilters = () => {
        // sessionStorage.clear()
        setType('');
        setMinPrice('');
        setMaxPrice('');
        setGuarantee(false);
        setSelectedMachineryType([]);
        setSelectedMaterialType([]);
        setYearBuild([]);
        setSelectedBrands([]);
        setSelectedConditions([]);
        setCheckedSubcategories([]);
        setSelectedCountries([])
        setSelectedStates([])
        setSelectedCities([])
        setSelectedStreets([])
        setSelectedFilters([])

        setMaterialItemType([])
        setSelectedMaterials([])

        setActiveSubcats([])

        setFiltersObj({
            type: '',
            checkedSubcategories: [],
            minPrice: '',
            maxPrice: '',
            selectedMachineryType: [],
            selectedMaterialType: [],
            guarantee: false,
            selectedBrands: [],
            selectedConditions: [],
            yearBuild: [],
            selectedCountries: [],
            selectedStates: [],
            selectedCities: [],
            selectedStreets: [],
            materialItemType: [],
            selectedMaterials: [],
        })


        // loadData()
        // window.location.reload()

    }


    const renderCategoryComponent = () => {
        switch (activeCatId) {
            case 1:
                return (
                    <>
                        <MachineryFilter
                            type={type}
                            setType={setType}
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                            setGuarantee={setGuarantee}
                            setSelectedMachineryType={setSelectedMachineryType}
                            setSelectedCountries={setSelectedCountries}
                            setYearBuild={setYearBuild}
                            setSelectedBrands={setSelectedBrands}
                            setSelectedStates={setSelectedStates}
                            setSelectedCities={setSelectedCities}
                            setSelectedStreets={setSelectedStreets}
                            setSelectedConditions={setSelectedConditions}
                            setCheckedSubcategories={setCheckedSubcategories}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            guarantee={guarantee}
                            selectedBrands={selectedBrands}
                            selectedMachineryType={selectedMachineryType}
                            setSelectedFilters={setSelectedFilters}

                            yearBuild={yearBuild}
                            selectedCountries={selectedCountries}
                            selectedStates={selectedStates}
                            selectedCities={selectedCities}
                            selectedStreets={selectedStreets}
                            selectedConditions={selectedConditions}
                            checkedSubcategories={checkedSubcategories}
                            selectedFilters={selectedFilters}
                            applyFilters={applyFilters}
                            clearAllFilters={resetAllFilters}
                        />
                        <AllMachinery
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
                    </>
                );
            case 2:
                return (
                    <>
                        <ConstructionFilter
                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                            setGuarantee={setGuarantee}
                            setSelectedCountries={setSelectedCountries}
                            setSelectedStates={setSelectedStates}
                            setSelectedCities={setSelectedCities}
                            setSelectedStreets={setSelectedStreets}
                            setCheckedSubcategories={setCheckedSubcategories}

                            setSelectedMaterials={setSelectedMaterials}
                            setMaterialItemType={setMaterialItemType}

                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            guarantee={guarantee}
                            selectedMaterials={selectedMaterials}
                            materialItemType={materialItemType}

                            selectedCountries={selectedCountries}
                            selectedStates={selectedStates}
                            selectedCities={selectedCities}
                            selectedStreets={selectedStreets}
                            checkedSubcategories={checkedSubcategories}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}

                            applyFilters={applyFilters}
                            clearAllFilters={resetAllFilters}
                        />
                        <AllConstruction
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
                    </>
                );
            case 3:
                return (
                    <>
                        <FurnitureFilter

                            setMinPrice={setMinPrice}
                            setMaxPrice={setMaxPrice}
                            setGuarantee={setGuarantee}
                            setSelectedCountries={setSelectedCountries}
                            setSelectedBrands={setSelectedBrands}
                            setSelectedStates={setSelectedStates}
                            setSelectedCities={setSelectedCities}
                            setSelectedStreets={setSelectedStreets}
                            setSelectedConditions={setSelectedConditions}
                            setCheckedSubcategories={setCheckedSubcategories}
                            setYearBuild={setYearBuild}
                            setSelectedMaterialType={setSelectedMachineryType}

                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            guarantee={guarantee}
                            selectedBrands={selectedBrands}
                            yearBuild={yearBuild}
                            selectedCountries={selectedCountries}
                            selectedStates={selectedStates}
                            selectedCities={selectedCities}
                            selectedStreets={selectedStreets}
                            selectedConditions={selectedConditions}
                            checkedSubcategories={checkedSubcategories}
                            selectedMaterialType={selectedMaterialType}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            applyFilters={applyFilters}
                            clearAllFilters={resetAllFilters}
                        />
                        <AllFurniture
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
                    </>
                );
            default:
                return null;
        }
    };


    let formattedMaterialCategories = materialCategories.map((cat, i) => {
        return {
            id: i,
            categoryName: cat.application,
            subcategories: cat.categories.map(subCat => {
                return subCat.materialName
            })
        }
    })

    // let formattedFurnitureCategories = furnitureCategories.map((cats, i) => {
    //     return {
    //         id: i,
    //         categoryName: cats.article,
    //         subcategories: cats.materials
    //     }
    // })
    let formattedFurnitureCategories = furnitureCategories.reduce((acc, curr) => {
        let category = acc.find(item => item.categoryName === curr.cateogry);

        if (category) {
            category.subcategories.push(curr.article);
        } else {
            acc.push({
                id: curr.id,
                categoryName: curr.cateogry,
                subcategories: [curr.article]
            });
        }

        return acc;
    }, []);


    return (
        <>
            <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Toaster />
            <Navbar />

            {activeCatId === 1 && <Breadcrumb title={t('machineryTools')} link={t('machineryTools')} />}
            {activeCatId === 2 && <Breadcrumb title={t('buildingMaterial')} link={t('buildingMaterial')} />}
            {activeCatId === 3 && <Breadcrumb title={t('furnitureAppliances')} link={t('furnitureAppliances')} />}

            <div className='categories top-section-categories'>
                <div className='custom-container'>
                    <div className='category-cards-grid'>
                        {marketplaceCategories.map((category) => (
                            <div
                                key={category.id}
                                className={`category-card ${activeCatId === category.id ? 'active' : ''}`}
                                onClick={() => handleActiveCategory(category.id)}
                            >
                                <div className='image'>
                                    <img src={category.image} alt={category.name} />
                                </div>
                                <h5 className='mt-3 text-center mx-auto fw-bolder'>{t(category.name)}</h5>
                            </div>
                        ))}
                    </div>

                    <div className='subcategories mt-3'>
                        <Slider {...settings}>
                            {(activeCatId === 1 ? machineryCategories :
                                activeCatId === 2 ? formattedMaterialCategories :
                                    activeCatId === 3 ? formattedFurnitureCategories : []
                            ).map((category) =>
                                category.subcategories.map((sub, i) => (
                                    <div
                                        key={i}
                                        className={`subcat-tab ${activeSubcats.includes(sub) ? 'active' : ''}`}
                                        onClick={() => handleActiveSubcategories(sub)}
                                    >
                                        {t(sub).slice(0, 25) + (sub.length > 25 ? '...' : '')}
                                        {activeSubcats.includes(sub) && <FaXmark className='closeTab' />}
                                    </div>
                                ))
                            )}
                        </Slider>
                    </div>
                </div>
            </div>

            {renderCategoryComponent()}

            <BlogSection />
            <ContactUs supportTitle={t("homeSupportTitle")} supportDescription={t("homeSupportDescription")} contactEmail={"information.marketplace@skyscalp.com"} contactPhone={"+33771759956"} />


            <Footer />
        </>
    );
};

export default MarketPlace;
