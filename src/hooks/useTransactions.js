import { useSelector } from "react-redux";
import {
  selectTransactions,
  selectBalance,
  selectError,
  selectIsLoading,
} from "../redux/transactions/transactions-selectors";

export const useTransactions = () => {
  const transactions = useSelector(selectTransactions);
  const balance = useSelector(selectBalance);
  const transactionsError = useSelector(selectError);
  const isTransactionsLoading = useSelector(selectIsLoading);

  return {
    transactions,
    balance,
    transactionsError,
    isTransactionsLoading,
  };
};
