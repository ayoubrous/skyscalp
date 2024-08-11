import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiShare2 } from "react-icons/fi";
import { Link } from 'react-router-dom';
import ShareProduct from '../utils/ShareProduct';
import Swal from 'sweetalert2';


export default function Blog({ imgUrl, id, title, description, datePosted }) {
    const [t] = useTranslation()

    const shareBlog = (id) => {
        const currentUrl = window.location.origin;
        let blogUrl = currentUrl + `/article/${id}`
        navigator.clipboard.writeText(blogUrl)
        Swal.fire({
            title: "Link Copied to clipboard",
            text: "Share this link to engage more people",
            icon: "success"
        });
    }

    return (
        <div className="blog-card custom-card">
            <div className="image">
                <img src={imgUrl} alt="" />
                <div className="custom-badge">{t("article")}</div>
            </div>
            <div className="content">
                <Link to={`../article/${id}`}>
                    <h5>{title && (title.slice(0, 30)) + (title.length > 30 ? "..." : "")}</h5>
                    <p className="color-secondary my-3" dangerouslySetInnerHTML={{ __html: description.substring(0, 133)+ (description.length > 133 ? "..." : "") }}></p>
                </Link>
                <div className="d-flex align-items-center justify-content-between my-2">
                    <small className="color-secondary">{t("datePosted")}: {datePosted && new Intl.DateTimeFormat('en-GB').format(new Date(datePosted))}</small>
                    <FiShare2 className='color-secondary' style={{ cursor: "pointer" }} onClick={() => shareBlog(id)} />
                </div>
            </div>
        </div>
    )
}
