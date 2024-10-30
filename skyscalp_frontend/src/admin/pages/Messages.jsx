// import React, { useEffect, useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
// import { FaBuilding, FaEye, FaRegTrashCan, FaTrash, FaUser } from 'react-icons/fa6'
// import { FaEdit, FaTools } from 'react-icons/fa'
// import { BsBuildingsFill } from 'react-icons/bs'
// import { TbCarCrane } from 'react-icons/tb'
// import logo from '../assets/images/profile/user-1.jpg'
// import { Link } from 'react-router-dom'
// import toast, { Toaster } from 'react-hot-toast'
// import Lottie from 'lottie-react'
// import loader from '../../assets/images/skyscalp-loader.json'
// import Swal from 'sweetalert2'
// import Footer from '../components/Footer'
// import { useTranslation } from 'react-i18next'

// export default function Messages() {
//     console.log("Component rendering"); 
//     const [t] = useTranslation()

//     const [messages, setMessages] = useState([])
//     const [loading, setLoading] = useState(false)


//     useEffect(() => {
//         console.log("useEffect running");
//         setLoading(true);
//         const user = JSON.parse(localStorage.getItem("user"));
//         const requestOptions = {
//             method: "GET",
//             redirect: "follow"
//         };

//         fetch(`${process.env.REACT_APP_SERVER_URL}/api/getMessagesByUserID?id=${user.userID}`, requestOptions)
//             .then((response) => response.json())
//             .then((result) => {
//                 console.log("API Response:", result);
//                 if (result.status) {
//                     console.log("ih")
//                     console.log(result.data)
//                     // Fetch product details for each message
//                     const promises = result.data.map(message => {
//                         if (message.productID !== null) {
//                             return fetchProductDetails(message.productID, message.collectionReference);
//                         }
//                         return Promise.resolve(null);
//                     });

//                     Promise.all(promises)
//                         .then(details => {
//                             // Merge product details with messages

//                             const messagesWithDetails = result.data.map((message, index) => {
//                                 return {
//                                     ...message,
//                                     details: details[index] === undefined ? 'Product Not Found' : details[index]
//                                 };
//                             });
//                             setMessages(messagesWithDetails);
//                             setLoading(false);

//                         })
//                         .catch(error => {
//                             console.error("Error fetching product details:", error);
//                             toast.error("Error fetching product details");
//                         });
//                 } else {
//                     toast.error(result.message);
//                 }
//             })
//             .catch((error) => {
//                 setLoading(false);
//                 console.error(error);
//             });
//     }, []);

//     const fetchProductDetails = async (productID, collectionReference) => {
//         // const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductDetails?id=${productID}`);
//         // const result = await response.json();
//         // if (result.status) {
//         //     return result.data;
//         // } 


//         try {
//             if (collectionReference === "properties") {
//                 const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getPropertyById/${productID}`);
//                 const result = await response.json();
//                 if (result.status) {
//                     return { ...result.data, collectionReference: collectionReference };
//                 } else {
//                     return null;
//                 }
//             }
//             else if (collectionReference === "materials") {
//                 const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductById/${productID}`);
//                 const result = await response.json();
//                 if (result.status) {
//                     // return result.data;
//                     return { ...result.data, collectionReference: collectionReference };

//                 } else {
//                     return null;
//                 }
//             }
//             else if (collectionReference === "services") {
//                 const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/getServiceById/${productID}`);
//                 const result = await response.json();
//                 if (result.status) {
//                     // return result.data;
//                     return { ...result.data, collectionReference: collectionReference };

//                 } else {
//                     return null;
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching product details:", error);
//             return null;
//         }
//     };


//     const handleViewMessage = (id) => {
//         const message = messages.find(msg => msg._id === id);

//         if (message) {
//             // If message is found, display it in SweetAlert2
//             Swal.fire({
//                 title: t('Message Details'),
//                 html: `
//                 <div>
//                     <p className="mb-1" style={{fontSize: "12px"}}><b>${t("email")}:</b> ${message.email}</p>
//                     <p className="mb-1" style={{fontSize: "12px"}}><b>${t("phone")}:</b> ${message.phone}</p>
//                     <p className="mb-1" style={{fontSize: "12px"}}><b>${t("message")}:</b></p>
//                     <p className="mb-1" style={{fontSize: "12px"}}>${message.message}</p>
                    
//                 </div>
//                 `,
//                 showCloseButton: true,
//                 showCancelButton: false,
//                 focusConfirm: false,
//                 confirmButtonText: t('Close'),
//             });
//         } else {
//             // If message is not found, show error message
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Message not found!',
//             });
//         }
//     }


//     return (
//         <>
//             <Toaster />
//             <div className={`lottie-wrapper ${loading ? 'show' : ''}`}>
//                 <Lottie className='loader' animationData={loader} loop={true} />
//             </div>
//             <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
//                 data-sidebar-position="fixed" data-header-position="fixed">
//                 <Sidebar />

//                 <div className="body-wrapper">
//                     <Header />
//                     <div className="container-fluid">
//                         <h4 className='fw-bolder mb-3'>{t("messages")}</h4>

//                         <div className="d-flex justify-content-end">
//                             <a href=""></a>
//                             <Link to='/'>
//                                 {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
//                             </Link>
//                         </div>

//                         <div className="table-container mt-2">
//                             <table className="table dashboard-table">
//                                 <thead>
//                                     <tr>
//                                         <th className='col-1'>S. No</th>
//                                         <th className='col-2'>{t("User email")}</th>
//                                         <th className='col-3'>{t("message")}</th>
//                                         <th className='col-2'>{t("received")} {t("on")}</th>
//                                         <th className='col-2'>{t("date")}</th>
//                                         <th className='col-2'>{t("action")}</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {
//                                         messages &&
//                                             messages.length > 0 ?
//                                             messages.map((data, i) => {
//                                                 return (
//                                                     <tr key={i}>
//                                                         <td>{i + 1}</td>
//                                                         <td>{data.email}</td>
//                                                         <td>
//                                                             {data.message && data.message.length > 0 ?
//                                                                 (data.message.length > 30 ?
//                                                                     data.message.substring(0, 30) + '...' :
//                                                                     data.message)
//                                                                 : ""}
//                                                         </td>
//                                                         <td>{data.details.title ? data.details.title : data.details}</td>
//                                                         <td>{data.createdAt && new Intl.DateTimeFormat('en-GB').format(new Date(data.createdAt))}</td>
//                                                         <td>
//                                                             {/* <a href={`mailto:${data.email}`}>
//                                                                 <button className="custom-btn px-2 py-1" style={{ fontSize: "12px" }}>Reply</button>
//                                                             </a> */}
//                                                             <button className="custom-btn px-2 py-1 ms-1" style={{ fontSize: "12px" }} onClick={() => handleViewMessage(data._id)}>{t("view")}</button>
//                                                         </td>
//                                                     </tr>
//                                                 )
//                                             })
//                                             : (
//                                                 <tr className='border'>
//                                                     <td colSpan="7" className="text-center">{t("noProductsFound")}</td>
//                                                 </tr>
//                                             )
//                                     }



//                                 </tbody>
//                             </table>
//                         </div>
//                         <Footer />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }


import React, { useEffect, useState } from 'react'
import Sidebar from '../components/owner/Sidebar'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../assets/images/skyscalp-loader.json'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'
import ReactDOM from 'react-dom/client';

import ChatComponent from '../../components/utils/ChatComponent'
// import ReactDOM from 'react-dom';

export default function Messages() {
    const [t] = useTranslation()
    const [conv, setConv] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                // Retrieve user info from localStorage
                const user = JSON.parse(localStorage.getItem("user"));

                if (!user || !user.userID) {
                    toast.error("User not found");
                    return;
                }

                const senderID = String(user.userID);
                setLoading(true); // Start loading

                // Fetch messages using the senderID
                const response = await fetch(`http://localhost:5500/api/getUserMessages?senderID=${senderID}`);
                const result = await response.json();

                if (result && result.success) {
                    // Set the conversation state with the last message from each conversation
                    const formattedConv = result.data.map((data) => {
                        // Get the last message from the messages array
                        const lastMessage = data.messages.length > 0 ? data.messages[data.messages.length - 1] : null;
                        return {
                            ...data,
                            lastMessage, // Add the last message to the conversation object
                        };
                    });
                    setConv(formattedConv); // Update messages state
                    
                    
                } else {
                    toast.error("No messages found");
                }

                setLoading(false); // End loading
            } catch (error) {
                console.error("Error fetching messages:", error);
                toast.error("Error processing request");
                setLoading(false); // End loading even in case of an error
            }
        };

        fetchMessages(); // Call the async function inside useEffect
    }, []); // Empty dependency array, runs only once on mount
    


   

    const handleViewMessage = (data) => {
        Swal.fire({
            title: 'Conversation',
            html: `<div id="chat-container"></div>`, // Create a container for the chat component
            showCloseButton: true,
            showCancelButton: false,
            focusConfirm: false,
            didOpen: () => {
                const chatContainer = document.getElementById('chat-container');
                console.log("open conv");
                
                // Render your ChatComponent here
                // You might need to use ReactDOM.render or similar to render it
                // ReactDOM.render(<ChatComponent conversationData={data} />, chatContainer);

                const root = ReactDOM.createRoot(chatContainer); // Create a root

                // Render your ChatComponent
                root.render(<ChatComponent conversationData={data} isVisible={true}/>);
            },
            confirmButtonText: 'Close',
        });
    }


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
                        <h2 className='fw-bolder mb-3'>{t("messages")}</h2>

                        <div className="d-flex justify-content-end">
                            <a href=""></a>
                            <Link to='/'>
                                {/* <button className="outline-btn py-1 px-2">+ Add New</button> */}
                            </Link>
                        </div>

                        <div className="table-container mt-2">
                            <table className="table dashboard-table">
                                <thead>
                                    <tr>
                                        <th className='col-1'>S. No</th>
                                        {/* <th className='col-2'>{t("Name")}</th>
                                        <th className='col-2'>{t("User email")}</th> */}

                                        <th className='col-3'>{t("message")}</th>
                                        <th className='col-2'>{t("received")} {t("on")}</th>
                                        <th className='col-2'>{t("action")}</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        conv && conv.length > 0 ?
                                            conv.map((data, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>
                                                            {data.lastMessage ? data.lastMessage.message : "No messages available"}
                                                        </td>
                                                        <td>{new Date(data.createdAt).toDateString()}</td>
                                                        <td>
                                                            {/* Implement reply action if needed */}
                                                            <button className="custom-btn px-2 py-1" style={{ fontSize: "12px" }} onClick={() => handleViewMessage(data)}>{t("View")}</button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                            : (
                                                <tr className='border'>
                                                    <td colSpan="7" className="text-center">No Items Found</td>
                                                </tr>
                                            )
                                    }



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

