import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading } from "../../redux/transactions/transactions-selectors";
import { selectIsEditTransactionModalOpen } from "../../redux/global/global-selectors";
import { toggleEditTransactionModalOpen } from "../../redux/global/global-slice";
import { EditTransaction } from "../EditTransaction/EditTransaction";
import { deleteTransaction } from "../../redux/transactions/transactions-operations";
import SpinnerComponent from "../Spinner/Spinner";
import css from "./Table.module.css";
import editIcon from "./EditIcon.png";
import { useState, useEffect } from "react";
import { getTransactions } from "../../redux/transactions/transactions-operations";
import { nanoid } from "nanoid";
import { useTransactions } from "../../hooks/useTransactions";

const Table = () => {
  const isLoading = useSelector(selectIsLoading);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const dispatch = useDispatch();
  const isTransactionEditModalOpen = useSelector(
    selectIsEditTransactionModalOpen
  );

  const [data, setData] = useState([]);
  const { transactions, isTransactionsLoading } = useTransactions();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactions) {
      setData(transactions);
    }
  }, [transactions]);

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const formatSum = (data) => {
    const numericValue = typeof data === "number" ? data : parseFloat(data);
    const options = {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    const formattedValue = numericValue
      .toLocaleString("pl-PL", options)
      .replace(/,/g, ".");

    return formattedValue;
  };

  const isMobile = window.innerWidth <= 768;

  const getDay = () => {
    const day = new Date().getDate();
    if (day < 10) {
      return `0${day}`;
    }
    return day;
  };

  const getMonth = () => {
    const month = new Date().getMonth() + 1;
    if (month < 10) {
      return `0${month}`;
    }
    return month;
  };

  const getYear = () => {
    const trim = (number) => {
      if (number < 10) {
        return `0${number}`;
      }
      return number;
    };
    const year = new Date().getYear();
    if (year < 100) {
      return trim(year);
    }
    return trim(year - 100);
  };

  return (
    <div>
      {isMobile ? (
        <>
          {data.length ? (
            <div className={css.wrapper}>
              {data.map(({ _id, date, type, category, comment, sum }) => (
                <div key={_id || nanoid()} className={css.element}>
                  <ul
                    key={nanoid()}
                    className={
                      type === "+" ? css.greenElementList : css.redElementList
                    }
                  >
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Date</span>
                      <span>
                        {getDay(date)}.{getMonth(date)}.{getYear(date)}
                      </span>
                    </li>
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Type</span>
                      <span>{type}</span>
                    </li>
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Category</span>
                      <span>{category}</span>
                    </li>
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Comment</span>
                      <span>
                        {comment && comment.length > 15
                          ? comment.substr(0, 15) + "..."
                          : comment || "No comment"}
                      </span>
                    </li>
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Sum</span>
                      <span className={type === "+" ? css.green : css.red}>
                        {formatSum(sum)}
                      </span>
                    </li>
                    <li className={css.listElement}>
                      <div
                        className={css.btn}
                        onClick={() => handleDelete(_id)}
                      >
                        <div
                          className={`${css.delete} ${css.circeRegularNormalWhite14px}`}
                        >
                          <span className={css.circeRegularNormalWhite14px}>
                            Delete
                          </span>
                        </div>
                      </div>
                      <ul key={nanoid()} className={css.editList}>
                        <li>
                          <img
                            className={css.edit}
                            id={_id}
                            onClick={(e) => {
                              setSelectedTransactionId(e.target.id);
                              dispatch(toggleEditTransactionModalOpen());
                            }}
                            alt="Edit"
                          />
                          <EditTransaction id={_id} />
                        </li>
                        <li>
                          <span>Edit</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : !isTransactionsLoading ? (
            <div>
              <h2 className={css.noData}>There are no transactions</h2>
            </div>
          ) : null}
        </>
      ) : (
        <table className={css.table}>
          <thead>
            <tr className={css.tableHeaderRow}>
              <th className={css.tableHeaderCell}>
                <span className={css.circeBoldBlack18px}>Date</span>
              </th>
              <th className={css.tableHeaderCell}>
                <span className={css.circeBoldBlack18px}>Type</span>
              </th>
              <th className={css.tableHeaderCell}>
                <span className={css.circeBoldBlack18px}>Category</span>
              </th>
              <th className={css.tableHeaderCell}>
                <span className={css.circeBoldBlack18px}>Comment</span>
              </th>
              <th className={css.tableHeaderCell}>
                <span className={css.circeBoldBlack18px}>Sum</span>
              </th>
              <th className={css.tableHeaderCell}>
                <span className={css.circeBoldBlack18pxDelete}>Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className={css.noData} colSpan="6">
                  <span className={css.noTransactionText}>
                    No transactions found.
                  </span>
                </td>
              </tr>
            ) : (
              data.map(({ _id, date, type, category, comment, sum }) => (
                <tr className={css.tableRow} key={_id}>
                  <td className={css.tableCell}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {new Date(date)
                        .toLocaleDateString("pl-PL", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "-")}
                    </span>
                  </td>
                  <td className={`${css.tableCell} ${css.center}`}>
                    <span className={`${css.circeRegularNormalBlack16px} `}>
                      {type === "INCOME" ? "+" : "-"}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {category}
                      {/* {item.categoryId
                        ? getCategoryName(item.categoryId)
                        : "Other"} */}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {comment ? comment : "No comment"}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    {/* <span
                      className={
                        type === "INCOME"
                          ? `${css.circeBoldGreen16px}`
                          : `${css.circeBoldRed16px}`
                      }
                    >
                      {sum
                        .toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(/,/g, "\u00A0")}
                    </span> */}
                    <span className={type === "+" ? css.green : css.red}>
                      {formatSum(sum)}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    <div className={css.editionsGroup}>
                      <img
                        className={css.edit}
                        id={_id}
                        onClick={(e) => {
                          setSelectedTransactionId(e.target.id);
                          dispatch(toggleEditTransactionModalOpen());
                        }}
                        src={editIcon}
                        alt="Vector 18"
                      />
                      {isTransactionEditModalOpen &&
                        selectedTransactionId === _id && (
                          <EditTransaction id={selectedTransactionId} />
                        )}
                      <div
                        className={css.btn}
                        onClick={() => handleDelete(_id)}
                      >
                        <div
                          className={`${css.delete} ${css.circeRegularNormalWhite14px}`}
                        >
                          <span className={css.circeRegularNormalWhite14px}>
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      {isLoading && <SpinnerComponent />}
    </div>
  );
};

export default Table;
