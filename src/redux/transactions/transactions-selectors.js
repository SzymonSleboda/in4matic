// export const selectId = (state) => state.wallet.id;
// export const selectBalance = (state) => state.wallet.balance;
// export const selectTransactions = (state) => state.wallet.transactions;
// export const selectCategories = (state) => state.wallet.categories;
// export const selectSummary = (state) => state.wallet.summary;
// export const selectChangeTransactions = (state) =>
//   state.wallet.changeTransactions;

export const selectTransactions = (state) => state.wallet.items;
export const selectIsLoading = (state) => state.wallet.isLoading;
export const selectCategories = (state) => state.wallet.categories;
export const selectTransactionSummary = (state) => state.wallet.summary;
export const selectDetailsIncome = (state) => state.wallet.incomeSummary;
export const selectDetailsExpense = (state) => state.wallet.expenseSummary;
export const selectError = (state) => state.wallet.error;
