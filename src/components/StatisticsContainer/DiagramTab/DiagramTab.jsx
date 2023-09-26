import css from "./DiagramTab.module.css";

const statisticsList = [
  { title: "Income", value: 8700, color: "#24CCA7" },
  { title: "Default transaction", value: 8700, color: "#808080" },
  { title: "Main expenses", value: 8700, color: "#FED057" },
  { title: "Products", value: 3800, color: "#FFD8D0" },
  { title: "Car", value: 1500, color: "#FD9498" },
  { title: "Self care", value: 800, color: "#C5BAFF" },
  { title: "Child care", value: 2200, color: "#6E78E8" },
  { title: "Household products", value: 300, color: "#4A56E2" },
  { title: "Education", value: 3400, color: "#81E1FF" },
  { title: "Leisure", value: 123, color: "#8A2BE2" },
  { title: "Other expenses", value: 610, color: "#00AD84" },

  // Odpowiedź, konkretnego itemu w odpowiedzi
  // {
  //   _id: "6471096a9af3d469961187ef",
  //   title: "Entertainment",
  //   type: "EXPENSE",
  //   color: "#9AFA41",
  // },
];

const expenses = 22549.24;
const income = 27350.01;

const getNotFoundColor = (title) => {
  const item = statisticsList.find((item) => item.title === title);
  return item ? item.color : "black";
};

export default function DiagramTab() {
  return (
    <div>
      <table className={css.statisticsList}>
        <thead>
          <tr className={css.trBox}>
            <th scope="col" className={`${css.thBox} ${css.thCategory}`}>
              Category
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
              <td key={index} className={css.tdBox}>
                <div
                  className={css.colorBox}
                  style={{ backgroundColor: getNotFoundColor(item.name) }}
                ></div>
              </td>
              <td className={css.tdBox}>{item.title}</td>
              <td className={`${css.tdBox} ${css.textValue}`}>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className={css.summaryBox}>
        <tr>
          <th scope="row">Expenses:</th>

          <td className={css.tdExpenses}>{expenses}</td>
        </tr>

        <tr>
          <th scope="row">Income:</th>
          <td className={css.tdIncome}>{income}</td>
        </tr>
      </table>
    </div>
  );
}
