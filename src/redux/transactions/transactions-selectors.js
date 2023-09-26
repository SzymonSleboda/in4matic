export const selectTransactions = (state) =>
  state.transactions.transactions || [];
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectError = (state) => state.transactions.error;
export const selectBalance = (state) => state.transactions.balance;
export const selectTransactionSummary = (state) => state.transactions.summary;
export const selectCategories = (state) => state.transactions.categories;
export const selectDetailsIncome = (state) => state.transactions.incomeSummary;
export const selectDetailsExpense = (state) =>
  state.transactions.expenseSummary;
