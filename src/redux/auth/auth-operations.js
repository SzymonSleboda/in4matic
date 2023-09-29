import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://in4matic-4c2abd694526.herokuapp.com/";

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
      const { data } = await axios.post(`/users/register`, credentials);
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
      const { data } = await axios.post(`/users/login`, credentials);
      toast.success("Login is successful!");
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`/users/logout`);
      token.unset();
      toast.success("You are logged out");
    } catch (error) {
      return rejectWithValue(
        toast.error("Something went wrong. Please, try again")
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue, getState }) => {
    const tokenLS = getState().auth.token;
    if (!tokenLS) {
      return rejectWithValue("No token");
    }
    token.set(tokenLS);
    try {
      const { data } = await axios.get(`/users/refresh`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
