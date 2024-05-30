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
import { FaXmark } from 'react-icons/fa6'
import ConstructionFilter from '../components/filters/ConstructionFilter'
import AllConstruction from '../components/sections/AllConstruction'
import FurnitureFilter from '../components/filters/FurnitureFilter'
import AllFurniture from '../components/sections/AllFurnitures'
import toast, { Toaster } from 'react-hot-toast'
import loader from '../assets/images/skyscalp-loader.json'
import Lottie from 'lottie-react'
import AgentsFilter from '../components/filters/AgentsFilter'
import AllAgents from '../components/sections/AllAgents'


const AgentsMarket = () => {
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

    // filters for customLocationDropdown component 
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedStates, setSelectedStates] = useState([])
    const [selectedCities, setSelectedCities] = useState([])
    const [selectedStreets, setSelectedStreets] = useState([])

    const [checkedSubcategories, setCheckedSubcategories] = useState([]);

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
        selectedStreets: []
    })

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
        initialSlide: 0,
        arrows: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 6, slidesToScroll: 6 } },
            { breakpoint: 870, settings: { slidesToShow: 4, slidesToScroll: 4 } },
            { breakpoint: 590, settings: { slidesToShow: 3, slidesToScroll: 3 } },
            { breakpoint: 450, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        ],
    };

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

        const savedFilters = sessionStorage.getItem('appliedFilters');

        if (savedFilters && !JSON.parse(savedFilters).isProperties) {
            const parsedFilters = JSON.parse(savedFilters);
            updatedFiltersObj = parsedFilters
            if (queryType) {
                updatedFiltersObj = { ...updatedFiltersObj, type: queryType };
            }
            else {
                updatedFiltersObj = parsedFilters
            }
            setFiltersObj(parsedFilters);
            // Set individual state variables from the saved filters

            setType(parsedFilters.type);
            setMinPrice(parsedFilters.minPrice === 0 ? '' : parsedFilters.minPrice);
            setMaxPrice(parsedFilters.maxPrice === 0 ? '' : parsedFilters.maxPrice);
            setGuarantee(parsedFilters.guarantee);
            setSelectedMachineryType(parsedFilters.selectedMachineryType);
            setSelectedMaterialType(parsedFilters.selectedMaterialType);
            setSelectedBrands(parsedFilters.selectedBrands);
            setYearBuild(parsedFilters.yearBuild);
            setSelectedConditions(parsedFilters.selectedConditions);
            setSelectedCountries(parsedFilters.selectedCountries);
            setSelectedStates(parsedFilters.selectedStates);
            setSelectedCities(parsedFilters.selectedCities);
            setSelectedStreets(parsedFilters.selectedStreets);
            setCheckedSubcategories(parsedFilters.checkedSubcategories);

            const combinedFilters = [
                ...parsedFilters.yearBuild,
                ...parsedFilters.selectedBrands,
                ...parsedFilters.selectedMachineryType,
                ...parsedFilters.selectedMaterialType,
                ...parsedFilters.selectedConditions,
                ...parsedFilters.selectedCountries,
                ...parsedFilters.selectedStates,
                ...parsedFilters.selectedCities,
                ...parsedFilters.selectedStreets,
            ];

            setSelectedFilters(combinedFilters);
        }



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
        const queryParams = new URLSearchParams(location.search);
        const type = queryParams.get('market') || 1;
        setActiveCatId(parseInt(type));
    }, [location]);

    useEffect(() => {
        loadData();
    }, [activeCatId, paginationData.currentPage, sortby, order, activeSubcats]);

    const handleActiveCategory = (id) => {
        setActiveCatId(id);
        resetAllFilters()
    };

    const handleActiveSubcategories = (subcat) => {
        setActiveSubcats((prev) =>
            prev.includes(subcat) ? prev.filter((item) => item !== subcat) : [...prev, subcat]
        );
    };

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
            selectedBrands: selectedBrands,
            selectedConditions: selectedConditions,
            yearBuild: yearBuild,
            selectedCountries: selectedCountries,
            selectedStates: selectedStates,
            selectedCities: selectedCities,
            selectedStreets: selectedStreets
        };
        // console.log(searchFilters)
        sessionStorage.setItem('appliedFilters', JSON.stringify(searchFilters))
        setFiltersObj(searchFilters)
        loadData()
    }

    const resetAllFilters = () => {
        sessionStorage.clear()

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
            selectedStreets: []
        })
    }

   


    return (
        <>
            <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <Toaster />
            <Navbar />

            <Breadcrumb title={t('skyscalpAgents')} link={t('agents')} />

            <div className='categories top-section-categories'>
                <div className='custom-container'>
                    <div className='category-cards-grid agents-cards-grid'>
                        {agentsCategories.map((category) => (
                            <div
                                key={category.id}
                                className={`category-card ${activeCatId === category.id ? 'active' : ''}`}
                                onClick={() => handleActiveCategory(category.id)}
                            >
                                <div className='image'>
                                    <img src={category.image} alt={category.name} />
                                </div>
                                <h5 className='mt-3 text-center mx-auto fw-bolder'>{category.categoryName}</h5>
                            </div>
                        ))}
                    </div>

                    <div className='subcategories mt-3'>
                        <Slider {...settings}>
                            {agentsCategories.map((category) => {
                                if (activeCatId === category.id) {
                                    return category.subcategories.map((sub, i) => (
                                        <div
                                            key={i}
                                            className={`subcat-tab ${activeSubcats.includes(sub.subCatName) ? 'active' : ''}`}
                                            onClick={() => handleActiveSubcategories(sub.subCatName)}
                                        >
                                            {sub.subCatName.slice(0, 13) + (sub.subCatName.length > 13 ? '...' : '')}
                                            {activeSubcats.includes(sub.subCatName) && <FaXmark className='closeTab' />}
                                        </div>
                                    ));
                                }
                                return null;
                            })}
                        </Slider>
                    </div>
                </div>
            </div>

            <AgentsFilter

                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
                setSelectedCountries={setSelectedCountries}
                setSelectedStates={setSelectedStates}
                setSelectedCities={setSelectedCities}
                setSelectedStreets={setSelectedStreets}
                setCheckedSubcategories={setCheckedSubcategories}

                minPrice={minPrice}
                maxPrice={maxPrice}
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
            <AllAgents
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



            <ContactUs
                supportTitle={"Communicate directly with your advisor for getting Agents services"}
                supportDescription={"Communicate directly with your advisor for getting Agents services"}
            />
            <Footer />
        </>
    );
};

export default AgentsMarket;
