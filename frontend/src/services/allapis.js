import { createAsyncThunk } from "@reduxjs/toolkit";
import serverApiInstance, { privateApiInstance } from "./apiInstances";

//////////////////////////////////////////////private Instances

// userData api
export const userDataApiHandler = createAsyncThunk(
  "auth/userDataApiHandler",
  async (_, { rejectWithValue }) => {
    try {
      const res = await privateApiInstance.get("/auth/user-data");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// category Add Api
export const categoryAddApiHandler = createAsyncThunk(
  "category/categoryAddApiHandler",
  async (categoryValue, { rejectWithValue }) => {
    try {
      const res = await privateApiInstance.post(
        "/categories/addcategory",
        categoryValue
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//  category delete Api
export const categoryDeleteApiHandler = createAsyncThunk(
  "category/categoryDeleteApiHandler",
  async (id, { rejectWithValue }) => {
    try {
      const res = await privateApiInstance.delete(
        `/categories/deleteCategory/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//event add Api
export const eventAddApiHandler = createAsyncThunk(
  "events/eventAddApiHandler",
  async (eventFormData, { rejectWithValue }) => {
    try {
      const res = await privateApiInstance.post(
        "/events/add-event",
        eventFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete event api
export const deleteEventApiHandler = createAsyncThunk(
  "events/deleteEventApiHandler",
  async (id, { rejectWithValue }) => {
    try {
      const res = await privateApiInstance.delete(`/events/delete-event/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//////////////////////////////////////////////normal insatance

// login api
export const loginApiHandler = async (loginData) => {
  try {
    return await privateApiInstance.post("/auth/login", loginData);
  } catch (error) {
    throw error;
  }
};

// get category api
export const getCategoriesApiHandler = createAsyncThunk(
  "category/getCategoriesApiHandler",
  async (_, { rejectWithValue }) => {
    try {
      const res = await serverApiInstance.get("/categories/getallcategory");
      return res;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// get all events api
export const getAllEventsApiHandler = createAsyncThunk(
  "events/getAllEventsApiHandler",
  async (_, { rejectWithValue }) => {
    try {
      const res = await serverApiInstance.get("/events/get-allevents");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// get specific event data
export const getSpecificEventData = async (id) => {
  try {
    const res = await serverApiInstance.get(`/events/getspecific-event/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};
