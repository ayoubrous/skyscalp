import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
import { FaEdit, FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import { Link } from 'react-router-dom'
import PropertyCard from '../../components/cards/PropertyCard'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../assets/images/skyscalp-loader.json'
import { formatPrice } from '../../utils/formatPrice'
import { removeFromFavourites } from '../../APIs/favourites'
import { getProductByID } from '../../APIs/products'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'

export default function Machinery() {
    const [t] = useTranslation()

    const [activeTab, setActiveTab] = useState('property')
    const [favouriteItems, setFavouriteItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getFavourites = () => {
        setIsLoading(true);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const user = JSON.parse(localStorage.getItem("user"));

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getFavourites/${user.userID}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status) {
                    // Fetch product details for each favourite item
                    const promises = result.data.map(item => {
                        if (item.productID !== null) {
                            return fetchProductDetails(item.productID);
                        }
                        // Return null or some other placeholder for items with no productID
                        return Promise.resolve(null);
                    });

                    Promise.all(promises)
                        .then(details => {
                            // Filter out items without valid product details
                            const favouritesWithDetails = result.data.map((message, index) => {
                                return {
                                    ...message,
                                    details: details[index] ? details[index] : 'Product Not Found'
                                };
                            }).filter(item => item.details !== 'Product Not Found');

                            setIsLoading(false);
                            setFavouriteItems(favouritesWithDetails);
                        })
                        .catch(error => {
                            setIsLoading(false);
                            console.error("Error fetching product details:", error);
                            toast.error("Error fetching product details");
                        });
                } else {
                    setIsLoading(false);
                    console.error(result.message);
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }

    const fetchProductDetails = async (productID) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductDetails?id=${productID}`);
            const result = await response.json();
            if (result.status) {
                return result.data;
            } else {
                return null; // Return null if the product details are not found
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
            return null;
        }
    };

    useEffect(() => {
        getFavourites()
    }, [])


    const handleDelete = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        removeFromFavourites(user.userID, id)
            .then(res => {
                if (res.status) {
                    toast.success(res.message);
                    setFavouriteItems(prevItems => prevItems.filter(item => item.details._id !== id));
                }
            }).catch(err => {
                console.log(err);
            });
    };


    return (
        <>
            <Toaster />
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <div className="page-wrapper favourites-page" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />


                    <div className="container-fluid">
                        {/* <div className="fav-tabs">
                            <div className={`fav-tab ${activeTab === 'property' ? 'active' : ''}`} onClick={() => setActiveTab('property')}>
                                <p>Properties</p>
                            </div>
                            <div className={`fav-tab ${activeTab === 'machinery' ? 'active' : ''}`} onClick={() => setActiveTab('machinery')}>
                                <p>Machinery</p>
                            </div>
                            <div className={`fav-tab ${activeTab === 'construction' ? 'active' : ''}`} onClick={() => setActiveTab('construction')}>
                                <p>Construction</p>
                            </div>
                        </div> */}
                        <h4 className='fw-bolder mb-3'>{t("favourites")} {t("items")}</h4>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        {/* <div className="cards-grid">
                            {
                                favouriteItems &&
                                favouriteItems
                                    .map(item => {
                                        return (
                                            <PropertyCard key={item.details._id} propertyData={item.details} />
                                        )
                                    })
                            }
                        </div> */}

                        <div className="table-container mt-2">
                            <table className="table table-bordered dashboard-table">
                                <thead>
                                    <tr>
                                        <th className='col-1'>S. No</th>
                                        <th className='col-2'>{t("favourites")}</th>
                                        <th className='col-2'>{t("address")}</th>
                                        <th className='col-1'>{t("budget")}</th>
                                        <th className='col-1'>{t("published")}</th>
                                        <th className='col-1'>{t("action")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        favouriteItems &&
                                            favouriteItems.length > 0 ?
                                            favouriteItems.map((data, i) => {
                                                return (
                                                    <tr key={data.details._id}>
                                                        <td>{i + 1}</td>
                                                        <td>{data.details.title}</td>
                                                        <td>{data.details.city} - {data.details.country}</td>
                                                        <td>MAD {formatPrice(data.details.budget)}</td>
                                                        <td>{data.createdAt && new Intl.DateTimeFormat('en-GB').format(new Date(data.createdAt))}</td>
                                                        <td>
                                                            <Link className='mx-1' to={`../${data.details.materialGroup ? data.details.materialGroup : 'property'}/${data.details._id}`}>
                                                                <FaEye className='color-secondary' />
                                                            </Link>
                                                            <Link className='mx-1' onClick={() => handleDelete(data.details._id)}>
                                                                <FaRegTrashCan className='text-danger' />
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            : (
                                                <tr className='border'>
                                                    <td colSpan="7" className="text-center">{t("noProductsFound")}</td>
                                                </tr>
                                            )
                                    }

                                </tbody>
                            </table>
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}
