import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://wallet.goit.ua/";

// const token = {
//   set(token) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   unset() {
//     axios.defaults.headers.common.Authorization = "";
//   },
// };

export const addTransaction = createAsyncThunk(
  "transactions/addTransactions",
  async (newTransaction, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/transactions", newTransaction);
      toast.success("Transaction created");
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error("Validation error"));
    }
  }
);

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/transactions");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async (updatedTransaction, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `/api/transactions/${updatedTransaction.id}`,
        updatedTransaction
      );
      toast.success("Transaction updated");
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error("Transaction not updated"));
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/transactions/${transactionId}`);
      toast.succes("Transaction deleted");
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error("Transaction not deleted"));
    }
  }
);

export const getTransactionSummary = createAsyncThunk(
  "transactions/getTransactionSummary",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/transactions-summary?year=${year}&${month}`
      );
      return response.data.data.response;
    } catch (error) {
      return rejectWithValue(toast.error("An error occured"));
    }
  }
);

export const getTransactionCategories = createAsyncThunk(
  "transactions/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/transactions/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error("An error occured"));
    }
  }
);
