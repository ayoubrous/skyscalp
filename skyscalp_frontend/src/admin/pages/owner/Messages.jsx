import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/owner/Sidebar'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Lottie from 'lottie-react'
import loader from '../../../assets/images/skyscalp-loader.json'
import Swal from 'sweetalert2'
import { useTranslation } from 'react-i18next'
import ReactDOM from 'react-dom/client';

import ChatComponent from '../../../components/utils/ChatComponent'
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
                const response = await fetch(`http://localhost:5500/api/getAdminMessages?ownerID=${senderID}`);
                const result = await response.json();

                if (result && result.success) {
                    // Set the conversation state with the last message from each conversation
                    const formattedConv = result.data.map((data) => {
                        // Get the last message from the messages array
                        // const lastMessage = data.messages.length > 0 ? data.messages[data.messages.length - 1] : null;
                        const lastMessage = data.messages
                            .filter(message => message.senderID != senderID) // Filter messages from the specific sender
                            .slice(-1)[0] || null;
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
                console.log(data);
                
                // Render your ChatComponent here
                // You might need to use ReactDOM.render or similar to render it
                // ReactDOM.render(<ChatComponent conversationData={data} />, chatContainer);

                const root = ReactDOM.createRoot(chatContainer); // Create a root

                // Render your ChatComponent
                root.render(<ChatComponent conversationData={data} isVisible={true} />);
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
