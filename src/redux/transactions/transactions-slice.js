import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTransaction,
  addTransaction,
  getTransactions,
  editTransaction,
  getTransactionsCategories,
  getTransactionsSummary,
} from "./transactions-operations";

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [],
    balance: -333,
    incomeSummary: 666,
    expenseSummary: 999,
    isLoading: false,
    error: null,
    summary: [
      { title: "Income", value: 8700, color: "#24CCA7" },
      { title: "Default transaction", value: 8700, color: "#808080" },
      { title: "Main expenses", value: 8700, color: "#FED057" },
      { title: "Products", value: 3800, color: "#FFD8D0" },
      { title: "Car", value: 1500, color: "#FD9498" },
      { title: "Self care", value: 800, color: "#C5BAFF" },
      { title: "Child care", value: 2200, color: "#6E78E8" },
      { title: "Household products", value: 300, color: "#4A56E2" },
      { title: "Education", value: 3400, color: "#81E1FF" },
      { title: "Leisure", value: 123, color: "#8A2BE2" },
      { title: "Other expenses", value: 610, color: "#00AD84" },
    ],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.transactions = [...state.transactions, payload].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      })
      .addCase(addTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.transactions = payload.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTransactions.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editTransaction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.transactions.findIndex(
          (transaction) => transaction._id === payload._id
        );
        state.transactions[index] = payload;
        state.transactions = state.transactions.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      })
      // .addCase(editTransaction.rejected, (state, { payload }) => {
      //   state.isLoading = false;
      //   state.error = payload;
      // })
      .addCase(getTransactionsCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getTransactionsSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionsSummary.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.summary = payload;
      })
      .addCase(editTransaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getTransactionsCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionsCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.categories = payload;
      }),
  // .addCase(getTransactionsCategories.rejected, (state, { payload }) => {
  //   state.isLoading = false;
  //   state.error = payload;
  // }),
});

export default transactionsSlice.reducer;
