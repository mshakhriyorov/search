import { axiosInstance } from "../utils/axios";

export const getProducts = ({ sort }, extraData) =>
  axiosInstance(`/products?sort=${sort}`, extraData);

export const getProduct = ({ id }, extraData) =>
  axiosInstance(`/products/${id}`, extraData);
