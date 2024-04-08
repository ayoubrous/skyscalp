import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiShare2 } from "react-icons/fi";
import { Link } from 'react-router-dom';


export default function Blog({ imgUrl, id, title, description, datePosted }) {
    const [t] = useTranslation()
    return (
        <div className="blog-card custom-card">
            <div className="image">
                <img src={imgUrl} alt="" />
                <div className="custom-badge">{t("article")}</div>
            </div>
            <Link to='../blog/123'>
                <div className="content">
                    <h5>{title && (title.slice(0, 37)) + (title.length > 37 ? "..." : "")}</h5>
                    <p className="color-secondary my-3">{description && (description.slice(0, 120)) + (description.length > 120 ? "..." : "")}</p>
                    <div className="d-flex align-items-center justify-content-between my-2">
                        <small className="color-secondary">{t("datePosted")}: {datePosted}</small>
                        <FiShare2 className='color-secondary' style={{ cursor: "pointer" }} />
                    </div>
                </div>
            </Link>
        </div>
    )
}
