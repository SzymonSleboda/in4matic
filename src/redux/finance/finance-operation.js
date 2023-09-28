import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://in4matic-4c2abd694526.herokuapp.com/";

export const getStatistics = createAsyncThunk(
  "finance/getStatistics",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/transactions/${month}/${year}`, {
        headers: {
          bearerAuth:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTU4OWUyZjU4MWY5NWUwNmY2ZGZlZSIsImlhdCI6MTY5NTkxNjA5OCwiZXhwIjoxNjk1OTE3ODk4fQ.8DYKaSHGCSmr4e0HDmbCvOs5wz4jLlU1AhPmoG8E38A",
        },
      });
      // console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
