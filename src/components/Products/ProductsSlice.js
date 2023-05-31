import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { getProduct, getProducts } from "../../api/products";

import { REQUEST } from "../../constants/requests";

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
    products: [],
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
      const { title, description, category } = payload;

      const filteredProducts = state.products.filter((product) => {
        if (title.text) {
          title.state = product.title
            .toLowerCase()
            .includes(title.text.toLowerCase());
        }
        if (description.text) {
          description.state = product.title
            .toLowerCase()
            .includes(description.text.toLowerCase());
        }
        if (category.text) {
          category.state = product.title
            .toLowerCase()
            .includes(category.text.toLowerCase());
        }

        return title.state && description.state && category.state;
      });

      console.log(filteredProducts);

      state.products = filteredProducts;
    },
    setProductId: (state, { payload }) => {
      state.product.id = payload.id;
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

export const { filterProducts, setProductId } = ProductsSlice.actions;

export default ProductsSlice.reducer;
