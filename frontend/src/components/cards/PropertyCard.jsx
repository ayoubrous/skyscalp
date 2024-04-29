import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LuBath } from 'react-icons/lu';
import { MdOutlineGarage, MdOutlinePool } from 'react-icons/md';
import { PiFlowerTulip } from 'react-icons/pi';
import { TbBed, TbCar } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CarouselImages from './CarouselImages';
import { formatPrice } from '../../utils/formatPrice';


const PropertyCard = React.memo(({ propertyData }) => {
    const { imgUrl, title, description, category, type, price, streetAddress, city, rooms, baths, area, sellerName, datePosted, pool, garage, garden } = propertyData;

    const [favourite, setFavourite] = useState(false);
    const [t] = useTranslation();

    const handleFavourite = () => {
        setFavourite(!favourite);
    };

    return (
        <div className="custom-card property-card">
            <div className="image">
                <CarouselImages images={imgUrl} />
                <div className="custom-badge">{type}</div>
                <div className="icon-area">
                    {favourite ? (
                        <FaHeart className="icon favourite-icon filled" onClick={handleFavourite} />
                    ) : (
                        <FaRegHeart className="icon favourite-icon" onClick={handleFavourite} />
                    )}
                </div>
            </div>
            <Link to="../property/123">
                <div className="content">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="card-title">{title && (title.slice(0, 18)) + (title.length > 18 ? "..." : "")}</h1>
                        <h5 className="color-primary">MAD {formatPrice(price)}</h5>
                    </div>
                    <p className="paragraph mb-0">{category}, ({area} m<sup>2</sup>)</p>
                    <p className="">{city}</p>
                    {description && <p className="mb-3 mt-1 color-secondary">{description.slice(0, 120) + (description.length > 120 ? "..." : "")}</p>}
                    <div className="d-flex justify-content-between align-items-center property-features mb-3">
                        <div className="d-flex align-items-center gap-1">
                            <TbBed className="feature-icon" />
                            <p className="feature-text">{rooms}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <LuBath className="feature-icon" />
                            <p className="feature-text">{baths}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <MdOutlinePool className="feature-icon" />
                            <p className="feature-text">{pool}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <TbCar className="feature-icon" />
                            <p className="feature-text">{garage}</p>
                        </div>
                        <div className="d-flex align-items-center">
                            <PiFlowerTulip className="feature-icon" />
                            <p className="feature-text">{garden}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center property-features">
                        <p className="feature-text ms-0">{t("datePosted")}: {datePosted}</p>
                    </div>
                    <hr className="line-break my-2" />
                    <div className="seller-info">
                        <div className="seller-img">{/* Seller Image Placeholder */}</div>
                        <p>{sellerName}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
});


export default PropertyCard;
