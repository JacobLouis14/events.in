import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authslice";
import categorySlice from "./slices/categorySlice";
import eventslice from "./slices/eventslice";
import authslice from "./slices/authslice";

export const store = configureStore({
  reducer: {
    auth: authslice,
    category: categorySlice,
    events: eventslice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
