import { createSlice } from "@reduxjs/toolkit";
import {
  categoryAddApiHandler,
  categoryDeleteApiHandler,
  getCategoriesApiHandler,
} from "../../services/allapis";
import toastHandler from "../../utils/toast";

const initialCategoryData = {
  data: [],
  isLoading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialCategoryData,
  reducers: {},
  extraReducers: (builder) => {
    // add categories
    builder
      .addCase(categoryAddApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(categoryAddApiHandler.fulfilled, (state, action) => {
        state.data.push(action.payload.data);
        state.error = null;
        toastHandler({ data: action.payload.message });
        state.isLoading = false;
      })
      .addCase(categoryAddApiHandler.rejected, (state, action) => {
        toastHandler({ error: action.payload.response.data.message });
        state.isLoading = false;
      });
    // get Categories
    builder
      .addCase(getCategoriesApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategoriesApiHandler.fulfilled, (state, action) => {
        state.data = action.payload.data.data;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getCategoriesApiHandler.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
    //   delete category
    builder
      .addCase(categoryDeleteApiHandler.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(categoryDeleteApiHandler.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.error = null;
        state.isLoading = false;
        toastHandler({ data: action.payload.message });
      })
      .addCase(categoryDeleteApiHandler.rejected, (state, action) => {
        console.log(action.payload);
        toastHandler({ error: action.payload.response.data.message });
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
