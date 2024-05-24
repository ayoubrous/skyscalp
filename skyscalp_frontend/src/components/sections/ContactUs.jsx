import { t } from 'i18next'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { FaEnvelope, FaLocationArrow, FaLocationDot, FaPhone } from 'react-icons/fa6'
import { sendMessage } from '../../APIs/messages'

const ContactUs = ({ supportTitle, supportDescription }) => {
    const [t] = useTranslation()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')


    const handleMessageSend = (e) => {
        e.preventDefault()
        if (email.length === 0 || phone.length === 0 || message.length === 0) {
            toast.error("Fill out required fields to send a message")
            return
        }

        sendMessage(true, null, null, email, phone, firstName, lastName, message)
            .then(res => {
                if (res.status) {
                    toast.success("Message sent successfully")
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');

                }
                else {
                    toast.error(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <>
            <Toaster />
            <section className="contactUs">
                <div className="custom-container">

                    <h1 className='mb-4 color-primary fw-bolder'>{t("contactUsTitle")}</h1>
                    <div className="wraper">
                        <div className="support">
                            <h2 className='mb-2 text-white supportTitle'>{supportTitle}</h2>
                            <p className="supportDescription ">{supportDescription}</p>

                            <div className="information">
                                <div className="info-group d-flex align-items-center gap-2 mb-4">
                                    <FaPhone className='text-white' />
                                    <p className="paragraph text-white">+33 99 99 883</p>
                                </div>
                                <div className="info-group d-flex align-items-center gap-2 mb-4">
                                    <FaEnvelope className='text-white' />
                                    <p className="paragraph text-white">demo@gmail.com</p>
                                </div>
                                <div className="info-group d-flex align-items-start gap-2 mb-4">
                                    <FaLocationDot className='text-white mt-1' />
                                    <p className="paragraph text-white pe-4">132 Dartmouth Street Boston, Massachusetts 02156 United States</p>
                                </div>
                            </div>

                        </div>
                        <div className="form">
                            <form action="" onSubmit={handleMessageSend}>
                                <div className="split">
                                    <div className="form-group">
                                        <label >First Name</label>
                                        <input type="text" maxLength={50} className="custom-input" placeholder='John' value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label >Last Name</label>
                                        <input type="text" maxLength={50} className="custom-input" placeholder='Stewart' value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="split">
                                    <div className="form-group ">
                                        <label >Email*</label>
                                        <input type="email" className="custom-input" required placeholder='youremail@account.com' value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group ">
                                        <label >Phone*</label>
                                        <input type="text" maxLength={15} className="custom-input" required placeholder='+33 99 334 449' value={phone} onChange={e => setPhone(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea id="" cols="30" rows="5" className='custom-textarea' placeholder='Your message' value={message} onChange={e => setMessage(e.target.value)} ></textarea>
                                </div>
                                <div className="form-group">
                                    <button className='custom-btn float-end'>Send Message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default ContactUs