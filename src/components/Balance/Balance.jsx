import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "../Balance/Balance.module.css";

export const Balance = () => {
  // const totalBalance = useSelector();

  return (
    <div className={s.balance}>
      <h3 className={s.balance__title}>Your Balance</h3>
      <p className={s.balance__text}>
        <span className={s.balance__currency}>₴</span>
        {/* {totalBalance} */}
      </p>
    </div>
  );
};
