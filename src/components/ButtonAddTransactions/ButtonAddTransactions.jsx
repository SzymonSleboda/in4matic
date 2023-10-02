import { AddTransaction } from "../AddTransaction/AddTransaction";
import { selectIsTransactionModalOpen } from "../../redux/global/global-selectors";
import { toggleTransactionModalOpen } from "../../redux/global/global-slice";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPlusCircleFill } from "react-icons/bs";
import css from "./ButtonAddTransactions.module.css";

export function ButtonAddTransactions() {
  const dispatch = useDispatch();
  const isTransactionModalOpen = useSelector(selectIsTransactionModalOpen);
  const closeModal = () => {
    dispatch(toggleTransactionModalOpen());
  };

  return (
    <>
      <button
        className={css.addButton}
        type="button"
        aria-label="add transaction button"
        onClick={() => {
          dispatch(toggleTransactionModalOpen());
        }}
      >
        <BsFillPlusCircleFill
          size={44}
          className={css.addTransactionIcon}
          style={{
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#fff",
          }}
        />
      </button>
      {isTransactionModalOpen && <AddTransaction closeModal={closeModal} />}
    </>
  );
}
