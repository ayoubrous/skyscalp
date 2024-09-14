import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaEye, FaEdit, FaRegTrashCan } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../assets/images/skyscalp-loader.json'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'
import DataTable, { createTheme } from 'react-data-table-component';
import { formatPrice } from '../../utils/formatPrice'
import { FaPencilAlt } from 'react-icons/fa'

export default function Experts() {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [t] = useTranslation();

    const loadData = () => {
        setLoading(true);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const user = JSON.parse(localStorage.getItem("user"));

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getUserServices/${user.userID}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.status) {
                    setProducts(result.data);
                    setFilteredData(result.data); // Initialize filteredData
                } else {
                    toast.error(result.message);
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    }

    useEffect(() => {
        loadData();
    }, []);


    createTheme('customTheme', {
        rows: {
            style: {
                // backgroundColor: "red",
                minHeight: '50px', // Set row height
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)', // Add border between rows
            },
        },
        headCells: {
            style: {
                backgroundColor: '#f1f1f1', // Set background color for header cells
                fontWeight: 'bold', // Make header text bold
                // borderBottom: '1px solid rgba(0, 0, 0, 0.2)', // Add border below header row
                borderBottom: '1px solid rgba(0, 0, 0, 1)', // Add border below header row
            },
        },
        cells: {
            style: {
                borderRight: '1px solid rgba(0, 0, 0, 0.1)', // Add right border to table cells
            },
        },
    });

    const handleDelete = (id) => {
        let surity = window.confirm(t("Are you sure to delete this product?"));
        if (surity) {
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/deleteService/${id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.status) {
                        toast.success(t("Data deleted successfully"));
                        loadData();
                    } else {
                        toast.error(t("Error proceeding request, please try again!"));
                    }
                })
                .catch((error) => console.error(error));
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearch(query);
        const filtered = products.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.field.toLowerCase().includes(query) ||
            item.experty.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    };

    // Define the columns for the DataTable
    const columns = [
        {
            name: t('Name'),
            selector: row => row.name,
            sortable: true,
        },
        {
            name: t('Field'),
            selector: row => row.field,
            sortable: true,
        },
        {
            name: t('Experty'),
            selector: row => row.experty,
            sortable: true,
        },
        {
            name: t('Budget'),
            selector: row => `MAD ${formatPrice(row.budget)} ${t("per hour")}`,
            sortable: true,
        },
        {
            name: t('Published'),
            selector: row => row.createdAt && new Intl.DateTimeFormat('en-GB').format(new Date(row.createdAt)),
            sortable: true,
        },
        {
            name: t('Status'),
            selector: row => row.status ?
                (<span className="badge text-bg-success" style={{ fontSize: "12px" }}>{t("active")}</span>) :
                (<span className="badge text-bg-danger" style={{ fontSize: "12px" }}>{t("inactive")}</span>),
            sortable: true,
        },
        {
            name: t('Action'),
            cell: row => (
                <>
                    <Link className='mx-1' to={`../expert/${row._id}`}>
                        <FaEye className='color-secondary' />
                    </Link>
                    <Link className='mx-1' to={`../app/update-expert/${row._id}`}>
                        <FaPencilAlt className='text-warning' />
                    </Link>
                    <Link className='mx-1' onClick={() => handleDelete(row._id)}>
                        <FaRegTrashCan className='text-danger' />
                    </Link>
                </>
            ),
        },
    ];

    return (
        <>
            <Toaster />
            <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <h4 className='fw-bolder mb-3'>{t("Published Experts")}</h4>
                        <div className="d-flex justify-content-end">
                            <Link to='../app/add-expert'>
                                <button className="outline-btn py-1 px-2">+ {t("publish")} {t("new")}</button>
                            </Link>
                        </div>

                        <div className='my-4 shadow-lg p-4 rounded'>
                            <div className="form-group form-group-sm float-end">
                                <label htmlFor="">{t("search")}</label>
                                <input
                                    className='ms-1 custom-input'
                                    type="text"
                                    placeholder={t("search")}
                                    value={search}
                                    onChange={handleSearch}
                                    style={{ marginBottom: '10px', width: '240px' }}
                                />
                            </div>

                            <DataTable
                                columns={columns}
                                theme="customTheme"
                                data={filteredData}
                                // pagination
                                highlightOnHover
                            />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}
