import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./ProductsItem.scss";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import { REQUEST } from "../../../constants/requests";
import { filterProducts } from "../ProductsSlice";

export const ProductsItem = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [, , vehicleId] = pathname.split("/");
  const { product, currentLoading } = useSelector((state) => state.products);
  const products = product.byId[vehicleId];

  // filter vehicles according to active states
  useEffect(() => {
    dispatch(
      filterProducts({
        id: vehicleId,
        year: { text: "", state: true },
        model: { text: "", state: true },
        color: { text: "", state: true },
      })
    );
  }, [dispatch, vehicleId]);

  return products?.map(
    ({ image, make, model, color, year, id }) =>
      id === vehicleId && (
        <div className="products-item" key={id}>
          <div className="products-item__image-box">
            <div className="products-item__image">
              <img src={image} alt={id} />
            </div>
            <div className="products-item__image-bottom">
              <div className="products-item__price-title">
                Model
                <div className="products-item__price">
                  <span>{model}</span>
                </div>
              </div>
              <div className="products-item__category">{year}</div>
            </div>
          </div>
          <div className="products-item__text-box">
            <div className="products-item__title">{make}</div>
            <div className="products-item__description">{color}</div>

            <div className="products-item__more">View more...</div>
          </div>

          {currentLoading[id] === REQUEST.pending && (
            <ContentLoader
              speed={2}
              width={350}
              height={530}
              viewBox="0 0 350 530"
              backgroundColor="#e3e3e3"
              foregroundColor="#d7cbcb"
            >
              <rect x="39" y="27" rx="0" ry="0" width="350" height="280" />
              <rect x="40" y="459" rx="0" ry="0" width="67" height="17" />
              <rect x="39" y="323" rx="0" ry="0" width="326" height="32" />
              <rect x="39" y="383" rx="0" ry="0" width="326" height="48" />
            </ContentLoader>
          )}
        </div>
      )
  );
};
