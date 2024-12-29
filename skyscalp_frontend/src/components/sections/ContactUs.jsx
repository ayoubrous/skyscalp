import { t } from 'i18next'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { FaEnvelope, FaLocationArrow, FaLocationDot, FaPhone } from 'react-icons/fa6'
import { sendMessage } from '../../APIs/messages'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ContactUs = ({ supportTitle, supportDescription, contactEmail, contactPhone }) => {
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

        sendMessage(true, null, null, null, email, phone, firstName, lastName, message)
            .then(res => {
                if (res.status) {
                    toast.success(t("Message sent successfully"))
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
                            <h2 className='mb-2 text-white supportTitle'>{t(supportTitle)}</h2>
                            <p className="supportDescription ">{t(supportDescription)}</p>

                            <div className="information">
                                {/* <div className="info-group d-flex align-items-center gap-2 mb-4">
                                    <FaPhone className='text-white' />
                                    <p className="paragraph text-white">{contactPhone}</p>
                                </div> */}
                                <div className="info-group d-flex align-items-center gap-2 mb-4">
                                    <FaEnvelope className='text-white' />
                                    <p className="paragraph text-white">{contactEmail}</p>
                                </div>
                                {/* <div className="info-group d-flex align-items-start gap-2 mb-4">
                                    <FaLocationDot className='text-white mt-1' />
                                    <p className="paragraph text-white pe-4">132 Dartmouth Street Boston, Massachusetts 02156 United States [Test Address]</p>
                                </div> */}
                            </div>

                        </div>
                        <div className="form">
                            <form action="" onSubmit={handleMessageSend}>
                                <div className="split">
                                    <div className="form-group">
                                        <label >{t("firstName")}</label>
                                        <input type="text" maxLength={50} className="custom-input" placeholder={t("firstName")} value={firstName} onChange={e => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label >{t("lastName")}</label>
                                        <input type="text" maxLength={50} className="custom-input" placeholder={t("lastName")} value={lastName} onChange={e => setLastName(e.target.value)} />
                                    </div>
                                </div>
                                <div className="split">
                                    <div className="form-group ">
                                        <label >{t("email")}*</label>
                                        <input type="email" className="custom-input" required placeholder={t("yourEmail")} value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group ">
                                        <label >{t("phone")}*</label>
                                        {/* <input type="text" maxLength={15} className="custom-input" required placeholder='Phone Number' value={phone} onChange={e => setPhone(e.target.value)} /> */}
                                        <PhoneInput
                                            className="contactPhone"
                                            country={'fr'}
                                            value={phone}
                                            onChange={setPhone}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>{t("message")}</label>
                                    <textarea id="" cols="30" rows="5" className='custom-textarea' placeholder={t("iAmIntereseted")} value={message} onChange={e => setMessage(e.target.value)} ></textarea>
                                </div>
                                <div className="form-group">
                                    <button className='custom-btn float-end'>{t("sendMessage")}</button>
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