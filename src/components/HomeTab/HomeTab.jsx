import { useEffect } from "react";
import { getTransactions } from "../../redux/transactions/transactions-operations";

const HomeTab = () => {
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div>
      <Table />
    </div>
  );
};

export default HomeTab;
