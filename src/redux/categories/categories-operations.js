import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://in4matic-4c2abd694526.herokuapp.com/";

export const getCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/categories/");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
