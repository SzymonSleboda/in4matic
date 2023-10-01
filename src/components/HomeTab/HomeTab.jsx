import { useEffect } from "react";
import { getTransactions } from "../../redux/transactions/transactions-operations";
import css from "./HomeTab.module.css";
import Table from "../Table/Table";
import { useDispatch } from "react-redux";


const HomeTab = () => {
  const dispatch = useDispatch();
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
