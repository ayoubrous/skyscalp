import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import Header from '../../components/Header'
import { FaEye, FaEdit, FaRegTrashCan } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../../assets/images/skyscalp-loader.json'
import { useTranslation } from 'react-i18next'
import DataTable, { createTheme } from 'react-data-table-component';
import { formatPrice } from '../../../utils/formatPrice'
import { FaPencilAlt } from 'react-icons/fa'

export default function Experts() {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [paginationData, setPaginationData] = useState({})
    const [currentPage, setCurrentPage] = useState(1)

    const [t] = useTranslation();

    const loadData = (page) => {
        setLoading(true);
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getServices?page=${page}&limit=15`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.status) {
                    setPaginationData({
                        currentPage: result.data.currentPage,
                        totalPages: result.data.totalPages,
                        hasNextPage: result.data.hasNextPage,
                        hasPrevPage: result.data.hasPrevPage,
                        totalItems: result.data.totalProperties,
                    })
                    setProducts(result.data.documents);
                    setFilteredData(result.data.documents); // Initialize filteredData
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
        loadData(1);
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


    const handleNextPage = (page) => {
        loadData(page)
        setCurrentPage(page)
    };

    const handlePrevPage = (page) => {
        loadData(page)
        setCurrentPage(page)
    };

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
            name: t('Updated At'),
            selector: row => row.updatedAt && new Intl.DateTimeFormat('en-GB').format(new Date(row.createdAt)),
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
                        <div className="buttons-pagination mb-3">
                            <button className="btn btn-outline btn-primary btn-sm " disabled={!paginationData.hasPrevPage} onClick={() => handlePrevPage(paginationData.currentPage - 1)}>{t("Previous")}</button>
                            <button className="btn btn-outline btn-primary btn-sm ms-1" disabled={!paginationData.hasNextPage} onClick={() => handleNextPage(paginationData.currentPage + 1)}>{t("Next")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
