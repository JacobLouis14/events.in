import { createSlice } from "@reduxjs/toolkit";
import {
  deleteEventApiHandler,
  eventAddApiHandler,
  filterEventsApiHandler,
  getAllEventsApiHandler,
} from "../../services/allapis";
import toastHandler from "../../utils/toast";

const initialData = {
  events: [],
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    // add events
    builder
      .addCase(eventAddApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(eventAddApiHandler.fulfilled, (state, action) => {
        console.log(action);

        state.events.push(action.payload.data);
        state.error = null;
        state.isLoading = false;
        toastHandler({ data: action.payload.message });
      })
      .addCase(eventAddApiHandler.rejected, (state, action) => {
        console.log(action);

        state.error = action.payload.response.data;
        state.isLoading = false;
        toastHandler({ error: action.payload.response.data.message });
      });
    //   get all events
    builder
      .addCase(getAllEventsApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllEventsApiHandler.fulfilled, (state, action) => {
        state.events = action.payload.data;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(getAllEventsApiHandler.rejected, (state, action) => {
        state.error = action.payload.response.data;
        state.isLoading = false;
        toastHandler({ error: action.payload.response.data.message });
      });
    //   delete events
    builder
      .addCase(deleteEventApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteEventApiHandler.fulfilled, (state, action) => {
        state.events = action.payload.data;
        state.error = null;
        state.isLoading = false;
        toastHandler({ data: action.payload.message });
      })
      .addCase(deleteEventApiHandler.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
        toastHandler({ error: action.payload.message });
      });
    // filtered Events
    builder
      .addCase(filterEventsApiHandler.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(filterEventsApiHandler.fulfilled, (state, action) => {
        state.events = action.payload.data;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(filterEventsApiHandler.rejected, (state, action) => {
        state.error = action.payload.response.data;
        state.isLoading = false;
        toastHandler({ error: action.payload.response.data.message });
      });
  },
});

export default eventSlice.reducer;
