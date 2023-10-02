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

const Table = () => {
  let data = useSelector((state) => state.transactions.items);
  if (!data) data = [];
  const isLoading = useSelector(selectIsLoading);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const dispatch = useDispatch();
  const isTransactionEditModalOpen = useSelector(
    selectIsEditTransactionModalOpen
  );

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  const handleDelete = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };
  const isMobile = window.innerWidth <= 768;

  const categories = [
    { _id: "6471096a9af3d469961187e6", name: "Main expenses", type: "EXPENSE" },
    { _id: "6471096a9af3d469961187e7", name: "Products", type: "EXPENSE" },
    { _id: "6471096a9af3d469961187e8", name: "Car", type: "EXPENSE" },
    { _id: "6471096a9af3d469961187e9", name: "Self care", type: "EXPENSE" },
    { _id: "6471096a9af3d469961187ea", name: "Child care", type: "EXPENSE" },
    {
      _id: "6471096a9af3d469961187eb",
      name: "Household products",
      type: "EXPENSE",
    },
    { _id: "6471096a9af3d469961187ec", name: "Education", type: "EXPENSE" },
    { _id: "6471096a9af3d469961187ed", name: "Leisure", type: "EXPENSE" },
    { _id: "6471096a9af3d469961187ef", name: "Entertainment", type: "EXPENSE" },
    { _id: "6471096a9af3d469961187f0", name: "Income", type: "INCOME" },
    {
      _id: "6473544cf09b05df28a84d32",
      name: "Other Expenses",
      type: "EXPENSE",
    },
  ];

  const getCategoryName = (id) => {
    const item = categories.find((item) => item._id === id);
    return item ? item.name : "default";
  };

  return (
    <div className={css.tableContainer}>
      {isMobile ? (
        data.length === 0 ? (
          <p className={css.noData}>No transactions found.</p>
        ) : (
          data.map((item) => (
            <table className={css.table}>
              <thead className={css.tableHeader}>
                <tr className={css.tableHeaderRow} key={item._id}>
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
                <tr className={css.tableRow} key={item._id}>
                  <td className={css.tableCell}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {new Date(item.date).toLocaleDateString("pl-PL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className={`${css.tableCell} ${css.center}}`}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {item.type === "INCOME" ? "+" : "-"}
                    </span>
                  </td>
                  <td className={css.tableCell}>
                    <span className={css.circeRegularNormalBlack16px}>
                      {item.categoryId
                        ? getCategoryName(item.categoryId)
                        : "Other"}
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
              </tbody>
            </table>
          ))
        )
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
                      {item.categoryId
                        ? getCategoryName(item.categoryId)
                        : "Other"}
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
