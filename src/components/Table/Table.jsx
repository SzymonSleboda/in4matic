import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../redux/wallet/wallet-operations";
import { useAuth, useWallet } from "../../hooks";
import { refreshTokens } from "../../redux/auth/auth-operations";

const Table = ({ theadData, tbodyData, className }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { transactions } = useWallet();

  // const handleEdit = e => {
  //     const id = e.currentTarget.getAttribute('data-id');
  //     const transaction = transactions.filter(e => e._id === id);
  // }

  const handleDelete = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    dispatch(
      deleteTransaction({ walletId: user.wallets[0].id, transactionId: id })
    ).catch(
      dispatch(refreshTokens()).then(
        dispatch(
          deleteTransaction({
            walletId: user.wallets[0],
            id,
            transactionId: id,
          })
        )
      )
    );
  };

  return (
    <table>
      <thead>
        <tr>
          {theadData.map((heading, i) => {
            return <th key={i}>{heading}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map((row, index) => {
          return (
            <tr key={row._id}>
              <td>{new Date(row.date).toLocaleDateString()}</td>
              <td>{row.type}</td>
              <td>{row.categoryId}</td>
              <td>{row.comment}</td>
              <td>{row.sum}</td>
              <td>
                <ul>
                  <li>
                    <button data-id={row._id} onClick={handleDelete}>
                      Delete
                    </button>
                  </li>
                </ul>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
