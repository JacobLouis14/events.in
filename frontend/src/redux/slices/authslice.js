import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApiHandler, userDataApiHandler } from "../../services/allapis";
import toastHandler from "../../utils/toast";

// Login api
export const authLoginApi = createAsyncThunk(
  "auth/authLoginApi",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await loginApiHandler(loginData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response : error);
    }
  }
);

const initialData = {
  isLoading: false,
  token: null,
  user: {},
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialData,
  reducers: {
    logOuthandler: (state, action) => {
      console.log("from logout handler");
      state.token = null;
      state.user = {};
    },
    updateAccessToken: (state, action) => {
      console.log("updated access token");

      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login Handler
    builder
      .addCase(authLoginApi.pending, (state, action) => {
        state.isLoading = true;
        toastHandler({ pending: "loading" });
      })
      .addCase(authLoginApi.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoading = false;
        console.log(action.payload);
        toastHandler({ data: action.payload.message });
      })
      .addCase(authLoginApi.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        console.log(action);

        toastHandler({ error: action.payload.data.message });
      });
    // userData handler
    builder
      .addCase(userDataApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userDataApiHandler.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(userDataApiHandler.rejected, (state, action) => {
        state.error = action.payload.response;
        state.isLoading = false;
        console.log(action);
      });
  },
});

export const { logOuthandler, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
