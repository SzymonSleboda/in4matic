import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://wallet.goit.ua/";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/users", credentials);
      toast.success("Registration is successful!");
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(toast.error("Email is already in use"));
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/auth/sign-in", credentials);
      toast.success("Login is successful!");
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(toast.error(error.response.data.message));
    }
  }
);
