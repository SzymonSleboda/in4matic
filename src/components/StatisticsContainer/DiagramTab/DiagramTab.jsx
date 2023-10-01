import css from "./DiagramTab.module.css";
import { useSelector } from "react-redux";

// import { useState } from "react";
// import { getStatistics } from "../../../redux/finance/finance-operation";
// import { useEffect } from "react";

// const expenses = 22549.24;
// const income = 27350.01;

export default function DiagramTab() {
  // const dispatch = useDispatch();
  const income = useSelector((state) => state.transactions.incomeSummary);
  console.log(income);
  const expenses = useSelector((state) => state.transactions.expenseSummary);
  console.log(expenses);

  let statisticsList = useSelector((state) => state.transactions.summary);
  console.log(statisticsList);

  // // if (!transactionsSummary) transactionsSummary = [];
  // // useEffect(() => {
  // //   dispatch(getStatistics({ year: 2023, month: "9" }));
  // // }, [dispatch]);

  // const getNotFoundColor = (title) => {
  //   const item = statisticsList.find((item) => item.title === title);
  //   return item ? item.color : "black";
  // };

  return (
    <div>
      <table className={css.statisticsList}>
        <thead>
          <tr className={css.trBox}>
            <th scope="col" className={`${css.thBox} ${css.thCategory}`}>
              <p>Category</p>
            </th>

            <th scope="col" className={css.thBox}></th>
            <th scope="col" className={`${css.thBox} ${css.thSum}`}>
              Sum
            </th>
          </tr>
        </thead>

        <tbody>
          {statisticsList.map((item, index) => (
            <tr>
              <td key={index} className={`${css.tdBox} ${css.textValue}`}>
                <div
                  className={css.colorBox}
                  style={{ backgroundColor: item.color }}
                >
                  <div className={css.m}>{item.title}</div>
                </div>
              </td>
              <td className={css.tdBox}></td>
              <td className={`${css.tdBox} ${css.textValue}`}>{item.value}</td>
            </tr>
          ))}

          <tr className={css.trBox}>
            <td className={css.summaryBox}>
              <p className={css.summaryText}>Expenses:</p>
            </td>
            <td></td>
            <td className={css.summaryBox}>
              <div className={css.textVe}>
                <p className={css.valueExpenses}>{expenses}</p>
              </div>
            </td>
          </tr>

          <tr className={css.trBox}>
            <td className={css.summaryBox}>
              <p className={css.summaryText}>Income:</p>
            </td>
            <td></td>
            <td className={css.summaryBox}>
              <div className={css.textVi}>
                <p className={css.valueIncome}>{income}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
