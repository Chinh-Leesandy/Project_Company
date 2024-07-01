import { configureStore } from "@reduxjs/toolkit";
import { apiProductSlice } from "../features/products/product-api-slice";
import cartReducer from "../features/carts/cart-slice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [apiProductSlice.reducerPath]: apiProductSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiProductSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;