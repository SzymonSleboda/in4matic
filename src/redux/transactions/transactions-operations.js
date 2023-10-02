import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://in4matic-4c2abd694526.herokuapp.com/";

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/transactions`, payload);
      toast.success("Your transaction is added!");
      return data;
    } catch (error) {
      // console.log({ error });
      return rejectWithValue(error);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "categories/getAllTransactions",
  async ({ token }, { rejectWithValue }) => {
    try {
      console.log({ token, transAxios: axios });
      const {data} = await axios.get(`/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ id, transaction }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/transactions/${id}`, transaction);
      toast.success("Your transaction is updated!");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(`/transactions/${_id}`);
      toast.success("Your transaction is deleted!");
      return _id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTransactionsCategories = createAsyncThunk(
  "transactions/categories",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/transactions/categories/${month}/${year}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTransactionsSummary = createAsyncThunk(
  "transactions/getTransactionsSummary",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/transactions/${month}/${year}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
