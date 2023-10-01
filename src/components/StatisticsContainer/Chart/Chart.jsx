import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import css from "./Chart.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const DataDoughnut = () => {
  const balance = useSelector((state) => state.transactions.balance);
  console.log(balance);

  const optionsChart = { plugins: { tooltip: true } };
  const [options] = useState(optionsChart);
  let transactionsSummary = 0;
  console.log(transactionsSummary);

  let statisticsList = useSelector((state) => state.transactions.summary);
  console.log(statisticsList);

  // WYCIĄGA NAZWY Z BACKENDU
  const colors = statisticsList?.map((color) => color.color);

  // WYCIĄGA WARTOŚCI LICZBOWE Z BACKENDU
  const values = statisticsList?.map((total) => total.value);

  // const labels = statisticsList?.map((label) => label.title);
  // console.log(labels)

  // const getTitleColor = (title) => {
  //   const item = statisticsList.find((item) => item.title === title);
  //   return item ? item.color : "red";
  // };

  const set = {
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
        cutout: 90,
        hoverBorderWidth: 5,
        // label: labels,
      },
    ],
  };

  const newData = {
    datasets: [
      {
        label: "You have no expenses in the current period",
        data: [0.01],
        backgroundColor: ["#C5BAFF"],
        borderColor: ["#C5BAFF"],
        cutout: 90,
        hoverBorderWidth: 5,
        labelTextColors: "#00AD84",
      },
    ],
    labelTextColors: "#00AD84",
  };

  return (
    <div className={css.doughnut}>
      <Doughnut
        data={transactionsSummary?.length === 0 ? newData : set}
        options={options}
      />
      <p className={css.doughnutSumExpenses}>
        €{" "}
        {balance.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

export default DataDoughnut;
