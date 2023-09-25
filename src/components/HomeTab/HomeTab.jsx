import { useAuth, useWallet } from "../../hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTransactions } from "../../redux/wallet/wallet-operations";
import Table from "../Table/Table";

const HomeTab = () => {
  const { user } = useAuth();
  const { transactions, changeTransactions } = useWallet();
  const dispatch = useDispatch();

  getHeadings = () => {
    return Object.keys();
  };

  useEffect(() => {
    dispatch(getTransactions({ walletId: user.wallets[0].id }));
  }, [changeTransactions, dispatch, user.wallets]);

  return (
    <>
      <Table
        theadData={getHeadings()}
        tbodyData={transactions}
        className={""}
      />
    </>
  );
};

export default HomeTab;
