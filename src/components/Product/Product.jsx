import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import { useLocation } from "react-router-dom";

import { fetchProduct } from "../Products/ProductsSlice";

import { REQUEST } from "../../constants/requests";

export const Product = () => {
  const dispatch = useDispatch();
  const { product, currentLoading } = useSelector((state) => state.products);
  const { title, description, price, image, category, rating } = product;
  const { pathname } = useLocation();
  const [, , productId] = pathname.split("/");

  console.log(productId);

  useEffect(() => {
    dispatch(fetchProduct({ id: 1 }));
  }, [dispatch, productId]);

  return (
    <>
      <div>{title}</div>
      <div>{description}</div>
      <div>{price}</div>
      <img src={image} alt={title} />
      <div>{category}</div>
      <div>{rating}</div>

      {currentLoading[productId] === REQUEST.pending && (
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
    </>
  );
};
