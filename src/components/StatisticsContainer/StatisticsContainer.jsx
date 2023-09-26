import { useEffect, useState } from "react";
//import { useDispatch, useSelector } from 'react-redux';

import axios from "axios";
import { DataDoughnut } from "./Chart/Chart";
import Calendar from "./Calendar/Calendar";
import DiagramTab from "./DiagramTab/DiagramTab";

import css from "./StatisticsContainer.module.css";

const StatisticsContainer = () => {
  //   const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [month, setMonth] = useState(1); //Daty z zrobionego datepickera, koniecznie numbery
  const [year, setYear] = useState(2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!year) {
          return;
        }
        const response = await axios
          .get
          //   `/api/transactions-summary?year=${year}&month=${month}`
          ();
        setData(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [year, month]);

  return (
    <div className={css.containerBackground}>
      <div className={css.container}>
        <div className={css.containerChart}>
          <h1>Statistics</h1>
          <DataDoughnut statistic={data} />
        </div>
        <div className={css.containerDiagramTab}>
          <Calendar setMonthAmount={setMonth} setYearAmount={setYear} />
          <DiagramTab statistic={data} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsContainer;
