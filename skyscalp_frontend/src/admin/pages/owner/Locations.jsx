import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import Header from '../../components/Header'
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import { all } from 'axios';

export default function Locations() {
    // addcountry
    const [countryName, setCountryName] = useState('')
    const [countLat, setCountLat] = useState('')
    const [countLong, setCountLong] = useState('')

    const [countryForState, setCountryForState] = useState('')
    const [stateName, setStateName] = useState('')
    const [stateLat, setStateLat] = useState('')
    const [stateLong, setStateLong] = useState('')

    const [stateInCity, setStateInCity] = useState('')
    const [cityName, setCityName] = useState('')
    const [cityLat, setCityLat] = useState('')
    const [cityLong, setCityLong] = useState('')


    const [countryForStreet, setCountryForStreet] = useState('')
    const [stateForStreet, setStateForStreet] = useState('')
    const [cityInStreet, setCityInStreet] = useState('')
    const [streetName, setStreetName] = useState('')
    const [streetLat, setStreetLat] = useState('')
    const [streetLong, setStreetLong] = useState('')

    const [allCountries, setAllCountries] = useState([])
    const [allStates, setAllStates] = useState([])
    const [allCities, setAllCities] = useState([])

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/getCountries`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    const countriesArray = result.data.map(country => ({
                        label: country.name,
                        value: country.name
                    }));
                    setAllCountries(countriesArray)
                }
                else {
                    toast.error("Error getting countries data")
                }
            })
            .catch((error) => console.error(error));
    }, [])

    const loadStates = country => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/getStatesByCountry?country=${country}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status) {
                    const statesArray = result.data.map(country => ({
                        label: country.name,
                        value: country.name
                    }));
                    setAllStates(statesArray)
                }
                else {
                    toast.error("Error getting states data")
                }
            })
            .catch((error) => console.error(error));
    }

    const loadCities = state => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/getCitiesByState?state=${state}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                if (result.status) {
                    const citiesArray = result.data.map(city => ({
                        label: city.name,
                        value: city.name
                    }));
                    setAllCities(citiesArray)
                }
                else {
                    toast.error("Error getting states data")
                }
            })
            .catch((error) => console.error(error));
    }

    const handleCountryChangeInCity = (selectedOption) => {
        setCountryForState(selectedOption.value)
        loadStates(selectedOption.value)
    }


    const handleStatesChangeInStreet = (selectedOption) => {
        setStateForStreet(selectedOption.value)
        loadCities(selectedOption.value)
    }

    const handleAddCountry = (e) => {
        e.preventDefault()

        if (countryName.length === 0 || countLat.length === 0 || countLong.length === 0) {
            toast.error("Fill out empty fields")
            return
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            country: countryName,
            latitude: countLat,
            longitude: countLong
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/addCountry`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    toast.success(result.message)
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => console.error(error));
    }
    const handleAddState = (e) => {
        e.preventDefault()

        if (stateName.length === 0 || stateLat.length === 0 || stateLong.length === 0) {
            toast.error("Fill out empty fields")
            return
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            country: countryForState,
            state: stateName,
            latitude: stateLat,
            longitude: stateLong
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/addState`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    toast.success(result.message)
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => console.error(error));
    }
    const handleAddCity = (e) => {
        e.preventDefault()

        if (cityName.length === 0 || cityLat.length === 0 || cityLong.length === 0) {
            toast.error("Fill out empty fields")
            return
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            country: countryForState,
            state: stateInCity,
            city: cityName,
            latitude: cityLat,
            longitude: cityLong
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/addCity`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    toast.success(result.message)
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => console.error(error));
    }
    const handleAddStreet = (e) => {
        e.preventDefault()

        if (streetName.length === 0 || streetLat.length === 0 || streetLong.length === 0) {
            toast.error("Fill out empty fields")
            return
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            country: countryForState,
            state: stateForStreet,
            city: cityInStreet,
            street: streetName,
            latitude: streetLat,
            longitude: streetLong
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/location/addStreet`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    toast.success(result.message)
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        <>
            <Toaster />
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <div className="row gap-3 justify-content-center">
                            <div className="col-5 card p-3">
                                <h5>Add New Country</h5>
                                <form action="" className='my-3' onSubmit={handleAddCountry}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">Country*</label>
                                        <input type="text" className="custom-input" value={countryName} onChange={e => setCountryName(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-2 row">
                                        <div className="col-6">
                                            <label htmlFor="">Latitude*</label>
                                            <input type="text" className="custom-input" value={countLat} onChange={e => setCountLat(e.target.value)} />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Longitude*</label>
                                            <input type="text" className="custom-input" value={countLong} onChange={e => setCountLong(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <button className="custom-btn">Add</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-5 card p-3">
                                <h5>Add New Region</h5>
                                <form action="" className='my-3' onSubmit={handleAddState}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">Select Country</label>
                                        <Select
                                            className="custom-input bordor-0 p-0"
                                            classNamePrefix="select"
                                            name="color"
                                            options={allCountries}
                                            onChange={(selectedOption) => setCountryForState(selectedOption.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">Region Name</label>
                                        <input type="text" className="custom-input" value={stateName} onChange={e => setStateName(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-2 row">
                                        <div className="col-6">
                                            <label htmlFor="">Latitude*</label>
                                            <input type="text" className="custom-input" value={stateLat} onChange={e => setStateLat(e.target.value)} />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Longitude*</label>
                                            <input type="text" className="custom-input" value={stateLong} onChange={e => setStateLong(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <button className="custom-btn">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="row gap-3 justify-content-center">
                            <div className="col-5 card p-3">
                                <h5>Add New City</h5>
                                <form action="" className='my-3' onSubmit={handleAddCity}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">Select Country*</label>
                                        <Select
                                            className="custom-input bordor-0 p-0"
                                            classNamePrefix="select"
                                            name="color"
                                            options={allCountries}
                                            // onChange={(selectedOption) => setCountryForState(selectedOption.value)}
                                            onChange={handleCountryChangeInCity}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">Select Region*</label>
                                        <Select
                                            className="custom-input bordor-0 p-0"
                                            classNamePrefix="select"
                                            name="color"
                                            options={allStates}
                                            onChange={(selectedOption) => setStateInCity(selectedOption.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">City Name*</label>
                                        <input type="text" className="custom-input" value={cityName} onChange={e => setCityName(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-2 row">
                                        <div className="col-6">
                                            <label htmlFor="">Latitude*</label>
                                            <input type="text" className="custom-input" value={cityLat} onChange={e => setCityLat(e.target.value)} />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Longitude*</label>
                                            <input type="text" className="custom-input" value={cityLong} onChange={e => setCityLong(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <button className="custom-btn">Add</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-5 card p-3">
                                <h5>Add New District</h5>
                                <form action="" className='my-3' onSubmit={handleAddStreet}>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">Select Country*</label>
                                        <Select
                                            className="custom-input bordor-0 p-0"
                                            classNamePrefix="select"
                                            name="color"
                                            options={allCountries}
                                            // onChange={(selectedOption) => setCountryForState(selectedOption.value)}
                                            onChange={handleCountryChangeInCity}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">Select Region*</label>
                                        <Select
                                            className="custom-input bordor-0 p-0"
                                            classNamePrefix="select"
                                            name="color"
                                            options={allStates}
                                            onChange={handleStatesChangeInStreet}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">Select City*</label>
                                        <Select
                                            className="custom-input bordor-0 p-0"
                                            classNamePrefix="select"
                                            name="color"
                                            options={allCities}
                                            onChange={selectedOption => setCityInStreet(selectedOption.value)}
                                        />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label htmlFor="">District Name*</label>
                                        <input type="text" className="custom-input" value={streetName} onChange={e => setStreetName(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-2 row">
                                        <div className="col-6">
                                            <label htmlFor="">Latitude*</label>
                                            <input type="text" className="custom-input" value={streetLat} onChange={e => setStreetLat(e.target.value)} />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="">Longitude*</label>
                                            <input type="text" className="custom-input" value={streetLong} onChange={e => setStreetLong(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <button className="custom-btn">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
