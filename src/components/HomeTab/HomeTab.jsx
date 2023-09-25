import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactions,
  deleteTransaction,
} from "../../redux/transactions/transactions-operations";
import { selectIsLoading } from "../../redux/transactions/transactions-selectors";

const HomeTab = () => {
  let data = useSelector((state) => state.transactions.items.userTransactions);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  if (!data) data = [];
  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return <></>;
};

export default HomeTab;
