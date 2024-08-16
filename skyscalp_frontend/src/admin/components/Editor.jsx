import React from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function Editor({ description, setDescription, maximumLength = null }) {

    const handleDescriptionChange = (event, editor) => {
        const data = editor.getData();
        setDescription(data);
    }

    const toolbar = [
        'bold',
        'italic',
        '|',
        'numberedList',
        '|',
        'heading',
        'blockQuote',
        '|',
    ];

    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={handleDescriptionChange}
                config={{
                    toolbar
                }}
            />
            {
                maximumLength !== null && (
                    <p style={{fontSize: "10px"}}>Characters: {description.length}/{maximumLength}</p>
                )
            }
        </>
    )

};