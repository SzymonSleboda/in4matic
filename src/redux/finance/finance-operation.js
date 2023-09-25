import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "http://localhost:3000";

export const getStatistics = createAsyncThunk(
  "finance/getStatistics",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/statistics?year=${year}&month=${month}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
