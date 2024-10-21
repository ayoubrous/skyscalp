import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Blog from '../cards/Blog';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function BlogSection() {
    const [t] = useTranslation()




    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadData = () => {
        setLoading(true);
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/getArticles`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoading(false);
                if (result.status) {
                    setProducts(result.data);
                } else {
                    // toast.error(result.message);
                    console.log(result.message)

                }
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    const options = {
        loop: true,
        center: false,
        items: 1,
        margin: 10,
        autoplay: false,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 1
            },
            1000: {
                items: 3
            }
        }
    };
    return (
        <>
            <section className="blogs-section">
                <div className="custom-container">
                    <h3 className='fw-bolder mb-4'>{t("articlesAndNews")}</h3>

                    <OwlCarousel id="" className="owl-carousel owl-theme" {...options}>
                        {
                            products.length > 0 && products.map(article => {
                                return (
                                    <Blog key={article._id} id={article._id} datePosted={article.createdAt} title={article.title} imgUrl={article.image} description={article.description} />
                                )
                            })
                        }
                    </OwlCarousel>
                </div>
            </section >
        </>
    )
}
