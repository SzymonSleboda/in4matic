import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://in4matic-4c2abd694526.herokuapp.com/";

const token = {
  set(accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },

  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "users/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/register", credentials);
      token.set(data.accessToken);
      toast.success("Registration is successful!");
      return data;
    } catch (error) {
      return rejectWithValue(toast.error("Email is already in use"));
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/users/login", credentials);
      token.set(data.accessToken);
      toast.success(`Welcome, ${data.user.name}!`);
      return data;
    } catch (error) {
      return rejectWithValue(toast.error("Incorrect password or email"));
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get("/users/logout");
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
  "users/refresh",
  async (_, { rejectWithValue, getState }) => {
    const tokenLS = getState().auth.accessToken;
    if (!tokenLS) {
      return rejectWithValue("No token");
    }
    token.set(tokenLS);
    try {
      const { data } = await axios.get("/users/current");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
