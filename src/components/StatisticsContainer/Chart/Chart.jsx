import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import css from "./Chart.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const DataDoughnut = () => {
  const balance = 0;

  const optionsChart = { plugins: { tooltip: true } };
  const [options] = useState(optionsChart);
  let transactionsSummary = 0;
  console.log(transactionsSummary);

  // WYCIĄGA WARTOŚCI LICZBOWE Z BACKENDU
  // const totals = [];
  // transactionsSummary?.forEach((item) => {
  //   totals.push(item.total);
  // });

  // WYCIĄGA NAZWY Z BACKENDU
  const names = [];
  // transactionsSummary?.forEach((item) => {
  //   names.push(item.name);
  // });

  let statisticsList = useSelector((state) => state.transactions.summary);
  console.log(statisticsList);

  const getTitleColor = (title) => {
    const item = statisticsList.find((item) => item.title === title);
    return item ? item.color : "red";
  };

  const colors = [];
  names.forEach((item) => {
    const color = getTitleColor(item);
    colors.push(color);
  });

  const set = {
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "#24CCA7",
          "#808080",
          "#FED057",
          "#FFD8D0",
          "#FD9498",
          "#C5BAFF",
        ],
        borderWidth: 0,
        cutout: 90,
        hoverBorderWidth: 5,
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
