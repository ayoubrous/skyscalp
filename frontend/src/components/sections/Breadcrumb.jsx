import React from 'react'

export default function Breadcrumb(props) {
  return (
    <section className="breadcrumb">
        <div className="custom-container">
            <h1 className="fw-bolder mb-2 text-white text-uppercase">{props.title}</h1>
            <p>Home / {props.link}</p>
        </div>
    </section>
  )
}
