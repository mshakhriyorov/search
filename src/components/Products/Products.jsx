import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";

import "./Products.scss";

import { ProductsItem } from "./Item";

import { setProductId } from "./ProductsSlice";

import { REQUEST } from "../../constants/requests";

export const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  const handleNavigateToProduct = (id) => {
    dispatch(setProductId({ id }));
  };

  return (
    <div className="products">
      <div className="products__sort">Sort</div>
      {products?.map(({ id, title, description, price, image, category }) => (
        <span
          key={id}
          onClick={() => handleNavigateToProduct(id)}
          aria-hidden="true"
        >
          <Link to={`/product/${id}`}>
            <ProductsItem
              id={id}
              title={title}
              description={description}
              price={price}
              image={image}
              category={category}
            />
          </Link>
        </span>
      ))}

      {loading === REQUEST.pending && (
        <>
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
        </>
      )}
    </div>
  );
};
