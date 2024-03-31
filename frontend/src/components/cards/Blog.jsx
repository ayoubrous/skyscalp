import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiShare2 } from "react-icons/fi";


export default function Blog({imgUrl, id, title}) {
    const [t] = useTranslation()
    return (
        <div className="blog-card custom-card">
            <div className="image">
                <img src={imgUrl} alt="" />
            </div>
            <div className="content">
                <h5>{title && (title.slice(0, 37)) + (title.length > 37 ? "..." : "")}</h5>
                <div className="d-flex align-items-center justify-content-between my-2">
                    <div className="custom-badge">{t("blog")}</div>
                    <FiShare2 className='color-secondary' style={{ cursor: "pointer" }} />
                </div>
            </div>
        </div>
    )
}
