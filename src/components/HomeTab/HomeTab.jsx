import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactions,
  deleteTransaction,
} from "../../redux/transactions/transactions-operations";
import { selectIsLoading } from "../../redux/transactions/transactions-selectors";
import { selectIsEditTransactionModalOpen } from "../../redux/global/global-selectors";

const HomeTab = () => {
  let data = useSelector((state) => state.transactions.items.transactions);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  if (!data) data = [];
  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };
  const isTransactionEditModalOpen = useSelector(
    selectIsEditTransactionModalOpen
  );
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return <></>;
};

export default HomeTab;
