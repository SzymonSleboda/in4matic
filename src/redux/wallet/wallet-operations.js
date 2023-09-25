import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://wallet.goit.ua/";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const addTransaction = createAsyncThunk(
  "wallet/addTransactions",
  async ({ walletId, transaction }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`wallet/${walletId}/transactions`, {
        ...transaction,
        categoryId: transaction.categoryId.toString(),
      });
      toast.success("Transaction created");
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error("Validation error"));
    }
  }
);

export const getTransactions = createAsyncThunk(
  "wallet/getTransactions",
  async ({ walletId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`wallet/${walletId}/transactions`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "wallet/editTransaction",
  async ({ walletId, transaction, transactionId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `wallet/${walletId}/transactions/${transactionId}`,
        transaction
      );
      toast.success("Transaction updated");
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error("Transaction not updated"));
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "wallet/deleteTransaction",
  async ({ walletId, transactionId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `wallet/${walletId}/transactions/${transactionId}`
      );
      toast.succes("Transaction deleted");
      return response.data;
    } catch (error) {
      return rejectWithValue(toast.error("Transaction not deleted"));
    }
  }
);
