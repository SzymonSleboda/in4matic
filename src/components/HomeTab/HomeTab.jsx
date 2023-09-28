import { useEffect } from "react";
import { getTransactions } from "../../redux/transactions/transactions-operations";
import css from "./HomeTab.module.css";

const HomeTab = () => {
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div className={css.group306}>
      <Table />
    </div>
  );
};

export default HomeTab;
