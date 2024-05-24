import React from 'react'
import { FaShareNodes } from 'react-icons/fa6';
import Swal from 'sweetalert2';

export default function ShareProduct() {
    const handleShare = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
        Swal.fire({
            title: "Link Copied to clipboard",
            text: "Share this link to engage more people",
            icon: "success"
        });
    }
    return (
        <FaShareNodes className='color-secondary' style={{ cursor: "pointer" }} onClick={handleShare} />

    )
}
