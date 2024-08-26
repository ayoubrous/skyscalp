import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { FaBuilding, FaUser } from 'react-icons/fa6'
import { FaTools } from 'react-icons/fa'
import { BsBuildingsFill } from 'react-icons/bs'
import { TbCarCrane } from 'react-icons/tb'
import logo from '../assets/images/profile/user-1.jpg'
import toast, { Toaster } from 'react-hot-toast'
import { uploadImage } from '../utils/uploadImage'
import Lottie from 'lottie-react'
import loader from '../../assets/images/skyscalp-loader.json'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function Dashboard() {
  const [t] = useTranslation()

  const [isLoading, setIsLoading] = useState(false)

  const [userInfo, setUserInfo] = useState({})
  const [phone, setPhone] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [username, setUsername] = useState('')

  const [totalProperties, setTotalProperties] = useState(0)
  const [totalConstruction, setTotalConstruction] = useState(0)
  const [totalMachinery, setTotalMachinery] = useState(0)
  const [totalFurniture, setTotalFurniture] = useState(0)

  useEffect(() => {
    document.title = "Skyscalp "
  }, [])

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

    const user = JSON.parse(localStorage.getItem("user"))

    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getUserProperties/${user.userID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false)
        // console.log(result)
        if (result.status) {
          setTotalProperties(result.data.length)
        }
        else {
          toast.error(result.message)
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });



    fetch(`${process.env.REACT_APP_SERVER_URL}/api/getUserProducts/${user.userID}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsLoading(false)
        // console.log(result)
        if (result.status) {
          let machinery = 0
          let construction = 0
          let furniture = 0
          result.data.forEach(data => {
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
          toast.error(result.message)
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
            <div className="row gap-2">
              <div className="col-4">

                <Link to="../app/properties" className="card overflow-hidden mb-2" style={{ borderRight: "2px solid blue" }}>
                  <div className="card-body p-3">
                    <h5 className="card-title mb-2 fw-semibold">{t("Published Properties")}</h5>
                    <div className="row align-items-center">
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                          {totalProperties && totalProperties}
                        </h1>
                        <BsBuildingsFill className='color-primary' style={{ fontSize: "3rem" }} />
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="../app/machines" className="card overflow-hidden mb-2" style={{ borderRight: "2px solid green" }}>
                  <div className="card-body p-3">
                    <h5 className="card-title mb-2 fw-semibold">{t("Published Machines")}</h5>
                    <div className="row align-items-center">
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                          {totalMachinery}
                        </h1>
                        <TbCarCrane className='color-primary' style={{ fontSize: "3rem" }} />
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="../app/materials" className="card overflow-hidden mb-2" style={{ borderRight: "2px solid orange" }}>
                  <div className="card-body p-3">
                    <h5 className="card-title mb-2 fw-semibold">{t("Published Materials")}</h5>
                    <div className="row align-items-center">
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                          {totalConstruction}
                        </h1>
                        <FaTools className='color-primary' style={{ fontSize: "3rem" }} />
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="../app/furniture" className="card overflow-hidden mb-2" style={{ borderRight: "2px solid blue" }}>
                  <div className="card-body p-3">
                    <h5 className="card-title mb-2 fw-semibold">{t("Published Furniture")}</h5>
                    <div className="row align-items-center">
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="fw-bolder color-primary" style={{ fontSize: "3rem" }}>
                          {totalFurniture}
                        </h1>
                        <FaTools className='color-primary' style={{ fontSize: "3rem" }} />
                      </div>
                    </div>
                  </div>
                </Link>


              </div>
              <div className="col-7">
                <div className="card p-4">
                  <h5>{t("personalInfo")}</h5>

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
                        <label htmlFor="">{t("updateProfileImage")}</label>
                        <input type="file" onChange={handleImageChange} className='custom-input my-1' id="" accept='image/*' />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="">{t("phone")}</label>
                        {/* <input type="text" className='custom-input my-1' value={phone} onChange={e => setPhone(e.target.value)} /> */}
                        <PhoneInput
                          country={'fr'}
                          value={phone}
                          onChange={setPhone}
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label htmlFor="">{t("username")}</label>
                        <input type="text" className='custom-input my-1' value={username} onChange={e => setUsername(e.target.value)} />
                      </div>
                      <div className="form-group mb-2">
                        <button className="custom-btn">{t("update")}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}
