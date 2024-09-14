import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import Header from '../../components/Header'
import { FaBuilding, FaChair, FaChartArea, FaUser, FaUsers } from 'react-icons/fa6'
import { FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import toast, { Toaster } from 'react-hot-toast'
import { uploadImage } from '../../utils/uploadImage'
import Lottie from 'lottie-react'
import loader from '../../../assets/images/skyscalp-loader.json'
import { Link, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'



export default function Dashboard() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [userInfo, setUserInfo] = useState({})
    const [phone, setPhone] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [username, setUsername] = useState('')

    const [registeredUsers, setRegisteredUsers] = useState(0)
    const [totalProperties, setTotalProperties] = useState(0)
    const [totalConstruction, setTotalConstruction] = useState(0)
    const [totalMachinery, setTotalMachinery] = useState(0)
    const [totalFurniture, setTotalFurniture] = useState(0)

    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)

    const [newPassword, setNewPassword] = useState('')
    const [newCPassword, setCNewPassword] = useState('')

    const [totalViewers, setTotalViewers] = useState(0)

    const getUserInfo = () => {
        setIsLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const user = JSON.parse(localStorage.getItem("user"))

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getUserById/${user.userID}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                // console.log(result)
                if (result.status) {
                    setUserInfo(result.data)
                    setPhone(result.data.phone)
                    setUsername(result.data.username)
                    setProfileImage(result.data.profileImage)
                }
                else {
                    toast.error(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }

    const loadData = () => {
        setIsLoading(true)
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };


        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProperties`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                // console.log(result)
                if (result.status) {
                    setTotalProperties(result.data.totalProperties)
                }
                else {
                    console.log(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getAllUsers`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                // console.log(result)
                if (result.status) {
                    setRegisteredUsers(result.data.length)
                }
                else {
                    console.log(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getAnalytics`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                // console.log(result)
                if (result.status) {
                    setTotalViewers(result.data.length)
                }
                else {
                    console.log(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });



        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProducts`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                // console.log(result)
                if (result.status) {
                    let machinery = 0
                    let construction = 0
                    let furniture = 0
                    result.data.documents.forEach(data => {
                        if (data.materialGroup === "machinery") {
                            machinery = machinery + 1
                        }
                        else if (data.materialGroup === "construction") {
                            construction = construction + 1
                        }
                        else if (data.materialGroup === "furniture") {
                            furniture = furniture + 1
                        }
                    })

                    setTotalMachinery(machinery)
                    setTotalConstruction(construction)
                    setTotalFurniture(furniture)
                }
                else {
                    console.log(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
    }

    useEffect(() => {
        loadData()
        getUserInfo()
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            username: username,
            profileImage: profileImage,
            phone: phone
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        const user = JSON.parse(localStorage.getItem('user'))
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/updateUserInfo/${user.userID}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                if (result.status) {
                    toast.success(result.message)
                } else {
                    toast.error(result.message)
                }
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)

            });

    }

    const handleImageChange = async (e) => {
        const files = e.target.files;
        setIsLoading(true)
        try {
            const response = await uploadImage(files[0]); // await the result of uploadImage
            if (response.status) {
                setProfileImage(response.url);
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.error("Error uploading images:", error);
        }
    };


    const handleEditPassword = (e) => {
        e.preventDefault()
        let data = {
            email: userInfo.email,
        }

        setIsLoading(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/forgotPassword`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setIsLoading(false)
                if (!result.status) {
                    toast.error(result.message)
                }
                else {
                    toast.success(result.message)
                }

            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error)
            });
    }


    const navigation = (path, activeMeterial) => {
        navigate(path, {state: { activeCat: activeMeterial}})
    }

    return (
        <>
            <Toaster />
            <div className={`lottie-wrapper ${isLoading ? 'show' : ''}`}>
                <Lottie className='loader' animationData={loader} loop={true} />
            </div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />

                <div className="body-wrapper">
                    <Header />
                    <div className="container-fluid">
                        <div className="d-flex align-items-center gap-1 mx-1 mb-2">
                            <Link to="../admin/users" className="card overflow-hidden col-4" style={{ borderRight: "2px solid blue" }}>
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-9 fw-semibold">REGISTERED USERS</h5>
                                    <div className="row align-items-center">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                                                {registeredUsers}
                                            </h1>
                                            <FaUsers className='color-primary' style={{ fontSize: "3rem" }} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="../admin/users" className="card overflow-hidden col-4" style={{ borderRight: "2px solid green" }}>
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-9 fw-semibold">TOTAL VIEWERS</h5>
                                    <div className="row align-items-center">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                                                {totalViewers}
                                            </h1>
                                            <FaChartArea className='color-primary' style={{ fontSize: "3rem" }} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to="../admin/properties" className="card overflow-hidden col-4" style={{ borderRight: "2px solid orange" }}>
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-9 fw-semibold">PUBLISHED PROPERTIES</h5>
                                    <div className="row align-items-center">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                                                {totalProperties}
                                            </h1>
                                            <BsBuildingsFill className='color-primary' style={{ fontSize: "3rem" }} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="d-flex align-items-center gap-1 mx-1 mb-2">
                            <div onClick={() => navigation('../admin/materials', 'machinery')} className="card overflow-hidden col-4" style={{ borderRight: "2px solid green", cursor: "pointer"  }}>
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-9 fw-semibold">PUBLISHED MACHINES</h5>
                                    <div className="row align-items-center">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                                                {totalMachinery}
                                            </h1>
                                            <TbCarCrane className='color-primary' style={{ fontSize: "3rem" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => navigation('../admin/materials', 'materials')} className="card overflow-hidden col-4" style={{ borderRight: "2px solid blue", cursor: "pointer" }}>
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-9 fw-semibold">PUBLISHED MATERIALS</h5>
                                    <div className="row align-items-center">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                                                {totalConstruction}
                                            </h1>
                                            <FaTools className='color-primary' style={{ fontSize: "3rem" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div onClick={() => navigation('../admin/materials', 'furniture')} className="card overflow-hidden col-4" style={{ borderRight: "2px solid orange", cursor: "pointer"  }}>
                                <div className="card-body p-4">
                                    <h5 className="card-title mb-9 fw-semibold">PUBLISHED FURNITURES</h5>
                                    <div className="row align-items-center">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                                                {totalFurniture}
                                            </h1>
                                            <FaChair className='color-primary' style={{ fontSize: "3rem" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-7">
                                <div className="card p-4">
                                    <h5>Personal Information</h5>

                                    <div className="info-wrapper ">
                                        <div className="basic-info d-flex align-items-center gap-4 my-3 border p-2">
                                            <div className="image" style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }}>
                                                {/* <FaUser className='color-primary' style={{ fontSize: "2.4rem" }} /> */}
                                                <img src={profileImage && profileImage} alt="" style={{ width: "100%" }} />
                                            </div>
                                            <div>
                                                <p className='fw-semibold'>{userInfo && userInfo.email}</p>
                                                <small>{userInfo ? userInfo.phone : 'null'}</small>
                                            </div>
                                        </div>

                                        <form action="" onSubmit={handleUpdate}>
                                            <div className="form-group mb-2">
                                                <label htmlFor="">Update Profile Image</label>
                                                <input type="file" onChange={handleImageChange} className='custom-input my-1' id="" accept='image/*' />
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="">Phone</label>
                                                {/* <input type="text" className='custom-input my-1' value={phone} onChange={e => setPhone(e.target.value)} /> */}
                                                <PhoneInput
                                                    country={'fr'}
                                                    value={phone}
                                                    onChange={setPhone}
                                                />
                                            </div>
                                            <div className="form-group mb-2">
                                                <label htmlFor="">Username</label>
                                                <input type="text" className='custom-input my-1' value={username} onChange={e => setUsername(e.target.value)} />
                                            </div>
                                            <div className="form-group mb-2">
                                                <button className="custom-btn">Update</button>
                                                <button className="custom-btn outline-btn ms-2 py-2" onClick={handleEditPassword}>Edit Password</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div className="custom-modal show">
                <div className="modal-content">
                    <h5>Edit Password</h5>
                    <form action="">
                        <div className="form-group mb-2">
                            <label htmlFor="">New Password</label>
                            <input type="password" className='custom-input my-1' />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="">Confirm Password</label>
                            <input type="password" className='custom-input my-1' />
                        </div>
                        <div className="form-group mb-2">
                            <button className="custom-btn">Update Password</button>
                        </div>
                    </form>
                </div>
            </div> */}

        </>
    )
}
