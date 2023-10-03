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

const Table = () => {
  let data = useSelector((state) => {
    // console.log({ state });
    console.log(state.categories);
    return state.transactions.transactions;
  });
  if (!data) data = [];
  const isLoading = useSelector(selectIsLoading);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const dispatch = useDispatch();
  const isTransactionEditModalOpen = useSelector(
    selectIsEditTransactionModalOpen
  );

  console.log({ data });

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };
  const isMobile = window.innerWidth <= 768;

  console.log(data);

  return (
    <div className={css.tableContainer}>
      {isMobile ? (
        <>
          {data.length ? (
            <div className={css.wrapper}>
              {data.map((item) => (
                <div key={item._id || nanoid()} className={css.element}>
                  <ul
                    key={nanoid()}
                    className={
                      item.type === "+"
                        ? css.greenElementList
                        : css.redElementList
                    }
                  >
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Date</span>
                      <span>
                        {new Date(item.date)
                          .toLocaleDateString("pl-PL", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replace(/\//g, "-")}{" "}
                      </span>
                    </li>
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Type</span>
                      <span> {item.type === "INCOME" ? "+" : "-"}</span>
                    </li>
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Category</span>
                      <span>{item.category ? item.category : "Other"}</span>
                    </li>
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Comment</span>
                      <span>{item.comment ? item.comment : "No comment"}</span>
                    </li>
                    <li className={css.listElement}>
                      <span className={css.listElementTitle}>Sum</span>
                      <span
                        className={
                          item.type === "INCOME"
                            ? `${css.circeBoldGreen16px}`
                            : `${css.circeBoldRed16px}`
                        }
                      >
                        {item.amount
                          .toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                          .replace(/,/g, "\u00A0")}
                      </span>
                    </li>
                    <li className={css.listElement}>
                      <div
                        className={css.btn}
                        onClick={() => handleDelete(item._id)}
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
                          <div
                            className={css.edit}
                            type="button"
                            id={item._id}
                            onClick={(e) => {
                              setSelectedTransactionId(e.target.id);
                              dispatch(toggleEditTransactionModalOpen());
                            }}
                          >
                            {isTransactionEditModalOpen &&
                              selectedTransactionId === item._id && (
                                <EditTransaction id={selectedTransactionId} />
                              )}
                            Edit
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : !isLoading ? (
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
              data.map((item) => (
                <tr className={css.tableRow} key={item._id}>
                  <td className={css.tableCell}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {new Date(item.date)
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
                      {item.type === "INCOME" ? "+" : "-"}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {item.category ? item.category : "Other"}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {item.comment ? item.comment : "No comment"}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    <span
                      className={
                        item.type === "INCOME"
                          ? `${css.circeBoldGreen16px}`
                          : `${css.circeBoldRed16px}`
                      }
                    >
                      {item.amount
                        .toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                        .replace(/,/g, "\u00A0")}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    <div className={css.editionsGroup}>
                      <img
                        className={css.edit}
                        id={item._id}
                        onClick={(e) => {
                          setSelectedTransactionId(e.target.id);
                          dispatch(toggleEditTransactionModalOpen());
                        }}
                        src={editIcon}
                        alt="Vector 18"
                      />
                      {isTransactionEditModalOpen &&
                        selectedTransactionId === item._id && (
                          <EditTransaction id={selectedTransactionId} />
                        )}
                      <div
                        className={css.btn}
                        onClick={() => handleDelete(item._id)}
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
