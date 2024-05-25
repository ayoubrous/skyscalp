import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/Navbar'
import Breadcrumb from '../components/sections/Breadcrumb'
import { useTranslation } from 'react-i18next'
import ContactUs from '../components/sections/ContactUs'
import BlogSection from '../components/sections/BlogSection'
import Footer from '../components/sections/Footer'
import AllProperties from '../components/sections/AllProperties'
import PropertyFilter from '../components/filters/PropertyFilter'
import toast, { Toaster } from 'react-hot-toast'
import loader from '../assets/images/skyscalp-loader.json'
import Lottie from 'lottie-react'
import { getLocations } from '../assets/data/locations'
import { useLocation } from 'react-router-dom'
import LocationsByRadius from '../components/filters/LocationsByRadius'

export default function Properties() {
  const [t] = useTranslation()
  const [properties, setProperties] = useState([])
  const [paginationData, setPaginationData] = useState({});
  const [sortby, setSortby] = useState('createdAt')
  const [order, setOrder] = useState('desc')
  const [loading, setLoading] = useState(false)

  // filter states 
  const [type, setType] = useState('buy')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minSize, setMinSize] = useState('')
  const [maxSize, setMaxSize] = useState('')
  const [minBeds, setMinBeds] = useState('')
  const [maxBeds, setMaxBeds] = useState('')
  const [minBath, setMinBath] = useState('')
  const [maxBath, setMaxBath] = useState('')

  const [yearBuild, setYearBuild] = useState([])
  const [proximities, setProximities] = useState([])
  const [features, setFeatures] = useState([])
  const [selectedCondtions, setSelectedConditions] = useState([])

  const [selectedCountries, setSelectedCountries] = useState([])
  const [selectedStates, setSelectedStates] = useState([])
  const [selectedCities, setSelectedCities] = useState([])
  const [selectedStreets, setSelectedStreets] = useState([])

  const [checkedSubcategories, setCheckedSubcategories] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState([])


  const [filtersObj, setFiltersObj] = useState({
    type: '',
    checkedSubcategories: [],
    minPrice: '',
    maxPrice: '',
    minBeds: '',
    maxBeds: '',
    minSize: '',
    maxSize: '',
    minBath: '',
    maxBath: '',
    selectedConditions: [],
    yearBuild: [],
    proximities: [],
    features: [],
    selectedCountries: [],
    selectedStates: [],
    selectedCities: [],
    selectedStreets: []
  })
  const location = useLocation();

  const loadData = () => {
    setLoading(true)

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
    if (savedFilters && JSON.parse(savedFilters).isProperties) {
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
      setMinSize(parsedFilters.minSize === 0 ? '' : parsedFilters.minSize);
      setMaxSize(parsedFilters.maxSize === 0 ? '' : parsedFilters.maxSize);
      setMinBeds(parsedFilters.minBeds === 0 ? '' : parsedFilters.minBeds);
      setMaxBeds(parsedFilters.maxBeds === 0 ? '' : parsedFilters.maxBeds);
      setMinBath(parsedFilters.minBath === 0 ? '' : parsedFilters.minBath);
      setMaxBath(parsedFilters.maxBath === 0 ? '' : parsedFilters.maxBath);
      setYearBuild(parsedFilters.yearBuild);
      setProximities(parsedFilters.proximities);
      setFeatures(parsedFilters.features);
      setSelectedConditions(parsedFilters.selectedConditions);
      setSelectedCountries(parsedFilters.selectedCountries);
      setSelectedStates(parsedFilters.selectedStates);
      setSelectedCities(parsedFilters.selectedCities);
      setSelectedStreets(parsedFilters.selectedStreets);
      setCheckedSubcategories(parsedFilters.checkedSubcategories);

      const combinedFilters = [
        ...parsedFilters.yearBuild,
        ...parsedFilters.proximities,
        ...parsedFilters.features,
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
    const raw = JSON.stringify(updatedFiltersObj);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPropertiesByFilters?page=${paginationData.currentPage}&sortby=${sortby}&order=${order}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false)
        // console.log(result)
        if (result.status) {
          setProperties(result.data.documents)
          setPaginationData({
            currentPage: result.data.currentPage,
            totalPages: result.data.totalPages,
            hasNextPage: result.data.hasNextPage,
            hasPrevPage: result.data.hasPrevPage,
            totalItems: result.data.totalProperties,
          })
        }
        else {
          setProperties([])
          console.log(result.message)
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }



  useEffect(() => {
    loadData()
  }, [location, paginationData.currentPage, sortby, order])



  const handlePageChange = (pageNumber) => {
    setPaginationData(prevState => ({
      ...prevState,
      currentPage: pageNumber
    }));
  };

  const handleSortby = (sortby) => {
    setSortby(sortby)
  }

  const handleSortOrder = (newOrder) => {
    setOrder(newOrder)
  }

  const applyFilters = () => {

    const searchFilters = {
      type: type,
      checkedSubcategories: checkedSubcategories,
      minPrice: minPrice === '' ? 0 : parseInt(minPrice),
      maxPrice: maxPrice === '' ? 0 : parseInt(maxPrice),
      minBeds: minBeds === '' ? 0 : parseInt(minBeds),
      maxBeds: maxBeds === '' ? 0 : parseInt(maxBeds),
      minSize: minSize === '' ? 0 : parseInt(minSize),
      maxSize: maxSize === '' ? 0 : parseInt(maxSize),
      minBath: minBath === '' ? 0 : parseInt(minBath),
      maxBath: maxBath === '' ? 0 : parseInt(maxBath),
      selectedConditions: selectedCondtions,
      yearBuild: yearBuild,
      proximities: proximities,
      features: features,
      selectedCountries: selectedCountries,
      selectedStates: selectedStates,
      selectedCities: selectedCities,
      selectedStreets: selectedStreets,
      isProperties: true
    };



    sessionStorage.setItem('appliedFilters', JSON.stringify(searchFilters))
    setFiltersObj(searchFilters)
    
    loadData()
  }

  const resetAllFilters = () => {
    sessionStorage.clear()

    setType('');
    setMinPrice('');
    setMaxPrice('');
    setYearBuild([]);
    setSelectedConditions([]);
    setCheckedSubcategories([]);
    setMinBeds('')
    setMaxBeds('')
    setMinSize('')
    setMaxSize('')
    setMinBath('')
    setMaxBath('')
    setFeatures([])
    setProximities([])
    setSelectedCountries([])
    setSelectedStates([])
    setSelectedCities([])
    setSelectedStreets([])
    setSelectedFilters([])


    setFiltersObj({
      type: '',
      checkedSubcategories: [],
      minPrice: '',
      maxPrice: '',
      minBeds: '',
      maxBeds: '',
      minSize: '',
      maxSize: '',
      minBath: '',
      maxBath: '',
      selectedConditions: [],
      yearBuild: [],
      proximities: [],
      features: [],
      selectedCountries: [],
      selectedStates: [],
      selectedCities: [],
      selectedStreets: []
    })
    // loadData()
  }
  return (
    <>
      {/* <LocationsByRadius /> */}
      <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
        <Lottie className='loader' animationData={loader} loop={true} />
      </div>
      <Toaster />
      <Navbar />
      <Breadcrumb title={t("exploreProperties")} link={t("properties")} />
      <PropertyFilter
        type={type}
        setType={setType}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minSize={minSize}
        setMinSize={setMinSize}
        maxSize={maxSize}
        setMaxSize={setMaxSize}
        minBeds={minBeds}
        setMinBeds={setMinBeds}
        maxBeds={maxBeds}
        setMaxBeds={setMaxBeds}
        minBath={minBath}
        setMinBath={setMinBath}
        maxBath={maxBath}
        setMaxBath={setMaxBath}
        yearBuild={yearBuild}
        setYearBuild={setYearBuild}
        proximities={proximities}
        setProximities={setProximities}
        features={features}
        setFeatures={setFeatures}
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        selectedStates={selectedStates}
        setSelectedStates={setSelectedStates}
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
        selectedStreets={selectedStreets}
        setSelectedStreets={setSelectedStreets}
        selectedCondtions={selectedCondtions}
        setSelectedConditions={setSelectedConditions}
        checkedSubcategories={checkedSubcategories}
        setCheckedSubcategories={setCheckedSubcategories}
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        applyFilters={applyFilters}
        clearAllFilters={resetAllFilters}
      />
      <AllProperties
        data={properties}
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
      <ContactUs supportTitle={t("propertySupportTitle")} supportDescription={t("propertySupportDescription")} />
      <Footer />

    </>
  )
}
