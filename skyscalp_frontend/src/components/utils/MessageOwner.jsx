import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sendMessage } from '../../APIs/messages'
import toast, { Toaster } from 'react-hot-toast'
import { useLocation, useParams } from 'react-router-dom'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function MessageOwner({ userID }) {
    const [t] = useTranslation()


    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')


    let params = useParams()
    const handleMessageSend = (e) => {
        e.preventDefault()
        if (email.length === 0 || phone.length === 0 || message.length === 0) {
            toast.error("Fill out required fields to send a message")
            return
        }
        sendMessage(false, userID, params.id, email, phone, null, null, message)
            .then(res => {
                if (res.status) {
                    toast.success("Message sent successfully")
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
            <form className="side mb-2" onSubmit={handleMessageSend}>
                <h5 className="fw-bold mb-3">{t("messageOwner")}</h5>

                <div className="form-group mb-2">
                    {/* <input type="text" className="custom-input" placeholder={t("phone")} value={phone} onChange={e => setPhone(e.target.value)} /> */}
                    <PhoneInput
                    className="contactPhone"
                        country={'fr'}
                        value={phone}
                        onChange={setPhone}
                    />
                </div>
                <div className="form-group mb-2">
                    <input type="email" className="custom-input" placeholder={t("email")} value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group mb-2">
                    <textarea name="" id="" cols="30" rows="3" placeholder={t("message")} className="custom-textarea" value={message} onChange={e => setMessage(e.target.value)}></textarea>
                </div>
                <div className="form-group mb-2">
                    <button className="custom-btn w-100">{t("sendMessage")}</button>
                </div>
            </form>
        </>
    )
}
