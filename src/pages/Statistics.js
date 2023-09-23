import css from "./Statistics.module.css";
import { Spinner } from "../components/Spinner/Spinner";
import { DataDoughnut } from "../components/Chart/Chart";
import DiagramTab from "../components/DiagramTab/DiagramTab";

export default function Statistics() {
  return (
    <div className={css.container}>
      <h1>Statistics</h1>
      <Spinner />
      <DataDoughnut />
      <DiagramTab />
    </div>
  );
}
