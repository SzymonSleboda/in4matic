import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://in4matic-4c2abd694526.herokuapp.com/";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async ({ accessToken }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/users/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
