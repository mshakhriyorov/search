import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { Products } from "./components/Products";
import { Product } from "./components/Product";
import { Search } from "./components/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Search />
        <Products />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: <Product />,
  },
]);

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
