import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { getProduct, getProducts } from "../../api/products";

import { REQUEST } from "../../constants/requests";

import vehiclesData from "./../testData/vehicles.json";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ sort }, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    try {
      const response = await getProducts(sort, {
        cancelToken: source.token,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async ({ id }, { signal, rejectWithValue }) => {
    const source = axios.CancelToken.source();
    signal.addEventListener("abort", () => {
      source.cancel();
    });
    try {
      const response = await getProduct(id, {
        cancelToken: source.token,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

export const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: vehiclesData.vehicles,
    product: {
      id: null,
      byId: {},
    },
    currentRequestId: {},
    currentLoading: {},
    currentError: {},
    loading: REQUEST.idle,
    error: null,
    requestId: undefined,
  },
  reducers: {
    filterProducts: (state, { payload }) => {
      const { id, year, model, color, country, driver, type } = payload;

      const filteredProduct = state.products.filter((product) => {
        if (year.text) {
          year.state = product.year
            .toString()
            .toLowerCase()
            .includes(year.text.toLowerCase());
        }
        if (model.text) {
          model.state = product.model
            .toLowerCase()
            .includes(model.text.toLowerCase());
        }
        if (color.text) {
          color.state = product.color
            .toLowerCase()
            .includes(color.text.toLowerCase());
        }
        if (country.text) {
          country.state = product.country.name
            .toLowerCase()
            .includes(country.text.toLowerCase());
        }
        if (driver.text) {
          driver.state = product.driver.username
            .toLowerCase()
            .includes(driver.text.toLowerCase());
        }
        if (type.text) {
          type.state = product.type
            .toLowerCase()
            .includes(type.text.toLowerCase());
        }

        return (
          id === product.id &&
          year.state &&
          model.state &&
          color.state &&
          country.state &&
          driver.state &&
          type.state
        );
      });

      state.product.byId[id] = filteredProduct;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      if (state.loading === REQUEST.idle || state.requestId === undefined) {
        state.loading = REQUEST.pending;
        state.requestId = action.meta.requestId;
      }
    },
    [fetchProducts.fulfilled]: (state, action) => {
      const { meta, payload } = action;
      const { requestId } = meta;

      if (state.loading === REQUEST.pending && state.requestId === requestId) {
        state.products = payload;

        state.loading = REQUEST.idle;
        state.requestId = undefined;
      }
    },
    [fetchProducts.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === REQUEST.pending && state.requestId === requestId) {
        state.loading = REQUEST.idle;
        state.error = action.error;
        state.requestId = undefined;
      }
    },
    [fetchProduct.pending]: (state, action) => {
      const { id } = action.meta.arg;
      if (
        state.currentLoading[id] === REQUEST.idle ||
        state.currentRequestId[id] === undefined
      ) {
        state.currentLoading[id] = REQUEST.pending;
        state.currentRequestId[id] = action.meta.requestId;
      }
    },
    [fetchProduct.fulfilled]: (state, action) => {
      const { meta, payload } = action;
      const { requestId, arg } = meta;
      const { id } = arg;

      if (
        state.currentLoading[id] === REQUEST.pending &&
        state.currentRequestId[id] === requestId
      ) {
        state.product.byId[id] = payload;

        state.currentLoading[id] = REQUEST.idle;
        state.currentRequestId[id] = undefined;
      }
    },
    [fetchProduct.rejected]: (state, action) => {
      const { requestId, arg } = action.meta;
      const { id } = arg;

      if (
        state.currentLoading[id] === REQUEST.pending &&
        state.currentRequestId[id] === requestId
      ) {
        state.currentLoading[id] = REQUEST.idle;
        state.currentError[id] = action.error;
        state.currentRequestId[id] = undefined;
      }
    },
  },
});

export const { filterProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;
