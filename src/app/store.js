import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "../components/Products/ProductsSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }),
});
