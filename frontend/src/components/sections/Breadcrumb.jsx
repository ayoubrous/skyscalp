import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Breadcrumb(props) {
  const [t] = useTranslation()
  return (
    <section className="breadcrumb">
        <div className="custom-container">
            <h1 className="fw-bolder mb-2 text-white text-uppercase">{props.title}</h1>
            <p>{t("home")} / {props.link}</p>
        </div>
    </section>
  )
}
