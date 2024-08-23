import React from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useTranslation } from 'react-i18next';


export default function Editor({ description, setDescription, maximumLength = null }) {
const [t] = useTranslation()
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
                    <p style={{fontSize: "10px"}}>{t("characters")}: {description.length}/{maximumLength}</p>
                )
            }
        </>
    )

};