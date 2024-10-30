    // import React, { useEffect, useState } from 'react';
    // import { useTranslation } from 'react-i18next';
    // import { sendMessage } from '../../APIs/messages'; // Ensure you have this function
    // import toast, { Toaster } from 'react-hot-toast';
    // import { useParams } from 'react-router-dom';
    // import { io } from 'socket.io-client';
    // import '../../assets/style/style.css'

    // const SOCKET_URL = process.env.REACT_APP_SOCKET_URL; // Your socket server URL

    // export default function ChatComponent({ ownerID, collectionRef }) {
    //     const [t] = useTranslation();
    //     const [message, setMessage] = useState('');
    //     const [messages, setMessages] = useState([]);
    //     const [userIDs, setUserIDs] = useState(null);
    //     const [ownerID,  setOwnerID] = useState(null);

        
    //     // State to store messages
    //     let params = useParams();

    //     const socket = io(SOCKET_URL); // Initialize socket connection
        
    //     useEffect(() => {
            
    //         // Fetch product information to get the ownerID
    //         fetch(`${process.env.REACT_APP_SERVER_URL}/api/getProductById/${params.id}`)
    //             .then(response => response.json())
    //             .then(result => {
    //                 if (result.status) {
    //                     setOwnerID(result.data.userID); // Assuming the ownerID is part of the product data
    //                     fetchMessages(user.userID, result.data.ownerID);
    //                 } else {
    //                     toast.error(result.message);
    //                 }
    //             })
    //             .catch(error => {
    //                 console.error("Error fetching product details:", error);
    //             });
    //     }, [params.id]);


    //     useEffect(() => {
            
    //         // setLoading(true);
    //         const user = JSON.parse(localStorage.getItem("user"));
    //         setUserIDs(user.userID);
    //         // Use the userID here
    //         console.log("UserID:", userIDs);
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
    //                             // setLoading(false);

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
    //                 // setLoading(false);
    //                 console.error(error);
    //             });
    //     }, []);
    //     const fetchProductDetails = async (productID, collectionReference) => {
            


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
    //     useEffect(() => {
    //         // Listen for new messages
    //         socket.on('receiveMessage', (newMessage) => {
    //             setMessages((prevMessages) => [...prevMessages, newMessage]);
    //         });

    //         // Cleanup on component unmount
    //         return () => {
    //             socket.off('receiveMessage');
    //             socket.disconnect();
    //         };
    //     }, [socket]);

    //     const handleMessageSend = (e) => {
    //         e.preventDefault();
    //         if (message.length === 0) {
    //             toast.error(t("Fill out all the required fields"));
    //             return;
    //         }

    //         const messageData = {
    //             userIDs,
    //             ownerID,
    //             text: message,
    //             roomID: params.id,
    //             collectionRef,
    //         };

    //         sendMessage(false, userIDs, ownerID ,params.id, null, null, null, null, null, message)
    //             .then(res => {
    //                 if (res.status) {
    //                     toast.success(t("Message sent successfully"));
    //                     console.log(messageData)
    //                     socket.emit('sendMessage', messageData); // Emit message to server
    //                     setMessage(''); // Clear the message input after sending
    //                 } else {
    //                     toast.error(t("Error proceeding request"));
    //                 }
    //             })
    //             .catch(err => {
    //                 console.error(err);
    //             });
    //     };

    //     return (
    //         <>
    //             <Toaster />
    //             <div className="message-container" style={{ padding: '10px', height: '400px', overflowY: 'scroll' }}>
    //                 {messages.map((msg, index) => (
    //                     <div
    //                         key={index}
    //                         className={`message-bubble ${msg.userID === userIDs ? 'sent' : 'received'}`}
    //                     >
    //                         {/* <strong>{msg.userID !== userIDs ? msg.userID : 'You'}:</strong> */}
    //                         <span>{msg.message}</span>
    //                     </div>
    //                 ))}
    //             </div>
    //             <form className="side mb-2" onSubmit={handleMessageSend}>
    //                 <div className="form-group mb-2">
    //                     <textarea
    //                         cols="30"
    //                         rows="3"
    //                         placeholder={t("message")}
    //                         className="custom-textarea"
    //                         value={message}
    //                         onChange={e => setMessage(e.target.value)}
    //                     ></textarea>
    //                 </div>
    //                 <div className="form-group mb-2">
    //                     <button className="custom-btn w-100">{t("sendMessage")}</button>
    //                 </div>
    //             </form>
    //         </>
    //     );
    // }


    import React, { useEffect, useState , useRef} from 'react';
    import { useTranslation } from 'react-i18next';
    import { sendMessage } from '../../APIs/messages';
    import toast, { Toaster } from 'react-hot-toast';
    import { useParams } from 'react-router-dom';
    import  io  from 'socket.io-client';
    import '../../assets/style/style.css';
    // const io = require('socket.io');
    // import useWebSocket from 'react-use-websocket';

    // const WS_URL = 'ws://127.0.0.1:8000';

    
    export default function ChatComponentService({conversationData , isVisible , isFixed}) {
        const socket = useRef(null)
        const [t] = useTranslation();
        const [message, setMessage] = useState('');
        const [messages, setMessages] = useState([]);
        const [senderID, setSenderID] = useState(null);
        const [ownerID, setOwnerID] = useState(null);
        const [userID, setUserID] = useState(null);
        const messageContainerRef = useRef(null);   
        // const [room , setRoom] = useState(null);
        
        let params = useParams();
        console.log("conversation :", conversationData);

        // useEffect(() => {
        //     if (lastMessage !== null && lastMessage !== undefined) {
        //         console.log('Received message:', lastMessage.data);
        //         const newMessage = JSON.parse(lastMessage.data);
        //         setMessages((prevMessages) => [...prevMessages, newMessage]);
        //     }
        // }, [lastMessage]);

        useEffect(() => {
            if (conversationData === undefined) {
            const fetchData = async () => {
                    try {
                        console.log("FE");
                        
                        const user = JSON.parse(localStorage.getItem("user"));
                        const senderID = String(user.userID); // Convert senderID to string
                        setSenderID(senderID); // Set sender ID
                        setUserID(senderID); // Set user ID
            
                        console.log(typeof user.userID); // Check userID type
            
                        // Fetch product information to get the ownerID
                        const response = await fetch(`http://localhost:5500/api/getServiceById/${params.id}`);
                        const result = await response.json();
            
                        if (result.status) {
                            const ownerID = String(result.data.userID); // Convert ownerID to string
                            setOwnerID(ownerID); // Set owner ID in state
            
                            console.log("Owner ID:", ownerID);
                            console.log("Sender ID:", senderID);
            
                            // Fetch messages using the fetched senderID and ownerID
                            fetchMessages(senderID, ownerID); 
                        } else {
                            toast.error(result.message);
                        }
                    } catch (error) {
                        console.error("Error fetching product details:", error);
                    }}
                    fetchData(); // Call the async function inside useEffect
            }
            else {
                try {
                    const user = JSON.parse(localStorage.getItem("user"));
                    setUserID(String(user.userID)); // Set user ID
                }
                catch (error) {
                    console.error("Error retreving  user data:", error);

                }
                setMessages(conversationData.messages);
                setSenderID(conversationData.userID);
                setOwnerID(conversationData.ownerID);
                console.log(messages);
                console.log(senderID);
                console.log(ownerID);

                
                

            }
        }, [params.id]); // Add params.id as a dependency

        // socket.emit('register' , userID)
        

        const fetchMessages = (userID, ownerID) => {
            console.log("UserID:", userID, "OwnerID:", ownerID);
        
            // Assuming the productID comes from route parameters (e.g., params.id)
            fetch(`http://localhost:5500/api/getMessages?userID=${userID}&ownerID=${ownerID}&productID=${params.id}`)
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        console.log("Messages fetched successfully:", result.data);
                        setMessages(result.data);  // Assuming result.data contains the messages
                    } else {
                        toast.error(result.message);
                    }
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                });
        };

        

        // useEffect(() => {
        //     socket.on("receiveMessage" , (data) => {
        //         setMessages((prevMessages) => [...prevMessages, data]);
        //         console.log("Received message:", messages);
        //     })
                
        // }, [socket]);

        useEffect(() => {
            socket.current = io('http://localhost:5500');
        
            socket.current.on('connect', () => {
                console.log('Socket connected:', socket.current.id);
                if (userID) {
                    socket.current.emit('register', userID); // Register the user
                }
            });
        
            socket.current.on('receiveMessage', (newMessage) => {
                // setMessages((prevMessages) => [...prevMessages, newMessage]);
                setMessages((prevMessages) => {
                    if (!Array.isArray(prevMessages)) return [newMessage]; // Default to a new array if prevMessages is not an array
                    return [...prevMessages, newMessage];
                });
            });
        
            // Cleanup on unmount
            return () => {
                socket.current.disconnect();
            };
        }, [userID]); 

        // useEffect(() => {
        //     socket.current.on('receiveMessage', (newMessage) => {
        //         setMessages((prevMessages) => [...prevMessages, newMessage]);
        //     });
        // }, []);

        const handleMessageSend = (e) => {
            e.preventDefault();
            if (message.length === 0) {
                toast.error(t("Fill out all the required fields"));
                return;
            }
            
            const messageData = {
                receiverID: senderID !== userID ? senderID : ownerID,
                senderID : userID,
                text: message,
                roomID: params.id?params.id:conversationData.productID,
            };
            
            sendMessage( senderID, ownerID, message,userID,params.id?params.id:conversationData.productID)
                .then(res => {  
                    console.log("Response from API:", res);
                    if (res && res.message === "Message sent successfully!") {
                        toast.success(t("Message sent successfully"));
                        console.log('Sending message:', messageData); 
                        // sendJsonMessage(JSON.stringify(messageData))

                        socket.current.emit('sendMessage', messageData); // Emit message to server
                        console.log(senderID)
                        setMessage(''); 
                    } else {
                        toast.error(t("Error proceeding request"));
                    }
                })
                .catch(err => {
                    console.error(err);
                });
            
            
        };

        // function filterMessagesByUserAndProduct(messages, userID, prodID) {
        //     return messages.filter(msg => msg.senderID === userID && msg.productID === prodID || msg.receiverID === userID && msg.senderID === ownerID && msg.productID === prodID);
        // }

        // const filteredMessages = filterMessagesByUserAndProduct(messages, senderID, params.id);

        useEffect(() => {
            // Scroll to the bottom of the message container when messages change
            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTo({
                    top: messageContainerRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }, [messages]);
        

        return (
            <div className={`chat-container ${isVisible ? 'active' : ''} ${isFixed ? 'fixed-position' : ''}`} >
                <Toaster />
                <div ref={messageContainerRef} className="message-container" style={{ padding: '10px', maxHeight: '400px', overflowY: 'scroll'}}>
                    {messages && messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message-bubble ${msg.senderID === userID ? 'sent' : 'received'}`}
                        >
                            <span>{msg.message}</span>
                        </div>
                    ))}
                </div>
                <form className="form-inline" onSubmit={handleMessageSend}>
                    <div className="form-group">
                    <input
                    type="text"
                    placeholder={t("message")}
                    className="custom-input"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    />
                    </div>
                    <div className="form-group">
                        <button className="custom-btn">{t("send")}</button>
                    </div>
                </form>
            </div>
        );
    }
