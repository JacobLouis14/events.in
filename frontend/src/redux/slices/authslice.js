import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  bookEventsApiHandler,
  cancelBookedTicketApiHandler,
  loginApiHandler,
  userDataApiHandler,
} from "../../services/allapis";
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

        toastHandler({ error: action.payload.response.data.message });
      });
    // userData handler
    builder
      .addCase(userDataApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userDataApiHandler.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(userDataApiHandler.rejected, (state, action) => {
        state.error = action.payload.response;
        state.isLoading = false;
      });
    // book event data handling
    builder
      .addCase(bookEventsApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(bookEventsApiHandler.fulfilled, (state, action) => {
        state.user = action.payload.data;
        console.log(action.payload.data);

        state.error = null;
        state.isLoading = false;
        toastHandler({ data: action.payload.message });
      })
      .addCase(bookEventsApiHandler.rejected, (state, action) => {
        state.error = action.payload.response.data;
        state.isLoading = false;
        if (action.payload.response.status === 401) {
          toastHandler({
            alert: action.payload.response.data.message + ", please login",
          });
        } else {
          toastHandler({ error: action.payload.response.data.message });
        }
      });
    // cancel booked events
    builder
      .addCase(cancelBookedTicketApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(cancelBookedTicketApiHandler.fulfilled, (state, action) => {
        state.user = action.payload.data;
        console.log(action.payload.data);

        state.error = null;
        state.isLoading = false;
        toastHandler({ data: action.payload.message });
      })
      .addCase(cancelBookedTicketApiHandler.rejected, (state, action) => {
        state.error = action.payload.response.data;
        state.isLoading = false;
        if (action.payload.response.status === 401) {
          toastHandler({
            alert: action.payload.response.data.message + ", please login",
          });
        } else {
          toastHandler({ error: action.payload.response.data.message });
        }
      });
  },
});

export const { logOuthandler, updateAccessToken } = authSlice.actions;

export default authSlice.reducer;
