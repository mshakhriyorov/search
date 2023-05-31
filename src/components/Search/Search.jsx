import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchProducts, filterProducts } from "../Products/ProductsSlice";

export const Search = () => {
  const dispatch = useDispatch();

  const handleFetchProducts = () => {
    dispatch(
      filterProducts({
        title: { text: "men", state: true },
        description: { text: "slim", state: true },
        category: { text: "Men", state: true },
      })
    );
  };

  useEffect(() => {
    dispatch(fetchProducts({ sort: "" }));
  }, [dispatch]);

  return (
    <div>
      <button onClick={handleFetchProducts}>Search</button>
    </div>
  );
};
