import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.scss";

import { ProductsItem } from "./components/Products/Item/ProductsItem";
import { Search } from "./components/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/product/:id",
    element: <ProductsItem />,
  },
]);

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
