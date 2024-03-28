import React from 'react'
import map from '../../assets/images/hero-map.png'

export default function Hero() {
  return (
    <section className="hero">
        <div className="custom-container">
            <h1 className="hero-heading">Your All-in-One Real Estate Partner</h1>
            <p className="slogan">From Search to Success</p>
            <p>Streamline your real estate journey: Buy, Rent or Build with confidence.</p>
            <img src={map} alt="hero-img" />
        </div>
    </section>
  )
}
