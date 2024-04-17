import React from 'react'
import { useTranslation } from 'react-i18next'

export default function MessageOwner() {
    const [t] = useTranslation()
    return (
        <form className="side mb-2">
            <h5 className="fw-bold mb-3">{t("messageOwner")}</h5>

            <div className="form-group mb-2">
                <input type="text" className="custom-input" placeholder={t("phone")} />
            </div>
            <div className="form-group mb-2">
                <input type="email" className="custom-input" placeholder={t("email")} />
            </div>
            <div className="form-group mb-2">
                <textarea name="" id="" cols="30" rows="3" placeholder={t("message")} className="custom-textarea"></textarea>
            </div>
            <div className="form-group mb-2">
                <button className="custom-btn w-100">Send Message</button>
            </div>
        </form>
    )
}
