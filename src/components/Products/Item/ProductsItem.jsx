import React from "react";
import { useLocation } from "react-router-dom";

import "./ProductsItem.scss";

export const ProductsItem = ({
  id,
  title,
  description,
  price,
  image,
  category,
}) => {
  const { pathname } = useLocation();

  return (
    <div className="products-item">
      <div className="products-item__image-box">
        <div className="products-item__image">
          <img src={image} alt={title} />
        </div>
        <div className="products-item__image-bottom">
          <div className="products-item__price-title">
            Price
            <div className="products-item__price">
              <span>${price}</span>
            </div>
          </div>
          <div className="products-item__category">{category}</div>
        </div>
      </div>
      <div className="products-item__text-box">
        <div className="products-item__title">{title}</div>
        <div className="products-item__description">{description}</div>

        <div className="products-item__more">View more...</div>
      </div>
    </div>
  );
};
