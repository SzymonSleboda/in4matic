import { useSelector } from "react-redux";
import {
  selectId,
  selectBalance,
  selectCategories,
  selectSummary,
  selectChangeTransactions,
  selectTransactions,
} from "../redux/wallet/wallet-selectors";

export const useWallet = () => {
  const id = useSelector(selectId);
  const balance = useSelector(selectBalance);
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);
  const summary = useSelector(selectSummary);
  const changeTransactions = useSelector(selectChangeTransactions);
  return {
    id,
    balance,
    transactions,
    categories,
    summary,
    changeTransactions,
  };
};
