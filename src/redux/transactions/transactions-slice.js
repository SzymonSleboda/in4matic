import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  getTransactionSummary,
  getTransactionCategories,
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "./transactions-operations";

const initialState = {
  items: { userTransactions: [] },
  summary: [],
  isLoading: false,
  error: null,
};

const handlePendingState = (state) => {
  state.isLoading = true;
};

const handleRejection = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const isPendingAction = (action) => action.type.endsWith("pending");
const isRejectedAction = (action) => action.type.endsWith("reject");

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    });
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items.userTransactions.push(action.payload);
    });
    builder.addCase(editTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const updatedTransaction = action.payload;
      const transactionIndex = state.items.userTransactions.findIndex(
        (transaction) => transaction._id === updatedTransaction._id
      );
      if (transactionIndex !== -1) {
        state.items.userTransactions[transactionIndex] = updatedTransaction;
      }
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      const i = state.items.userTransactions.findIndex(
        (transaction) => transaction.date === action.payload.date
      );
      state.items.userTransactions.splice(i, 1);
    });
    builder.addCase(getTransactionSummary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.summary = action.payload;
    });
    builder.addCase(getTransactionCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
    });
    builder.addMatcher(isPendingAction, handlePendingState);
    builder.addMatcher(isRejectedAction, handleRejection);
    builder.addDefaultCase((state, _action) => state);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
