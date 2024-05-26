import React from 'react';
import { FaShareNodes } from 'react-icons/fa6';
import Swal from 'sweetalert2';

export default function ShareProduct() {
    const handleShare = () => {
        const currentUrl = window.location.href;

        // Check if the Clipboard API is supported
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(currentUrl).then(() => {
                Swal.fire({
                    title: "Link Copied to clipboard",
                    text: "Share this link to engage more people",
                    icon: "success"
                });
            }).catch(err => {
                console.error('Could not copy text: ', err);
                fallbackCopyTextToClipboard(currentUrl);
            });
        } else {
            fallbackCopyTextToClipboard(currentUrl);
        }
    };

    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // Avoid scrolling to bottom
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            const msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
            Swal.fire({
                title: "Link Copied to clipboard",
                text: "Share this link to engage more people",
                icon: "success"
            });
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            Swal.fire({
                title: "Failed to copy link",
                text: "Please copy the link manually",
                icon: "error"
            });
        }
        document.body.removeChild(textArea);
    };

    return (
        <FaShareNodes className='color-secondary' style={{ cursor: "pointer" }} onClick={handleShare} />
    );
}
