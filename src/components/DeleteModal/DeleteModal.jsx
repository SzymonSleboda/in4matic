import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { toggleModalOpen, setModalType } from "../../redux/global/global-slice";
import { selectToken } from "../../redux/auth/auth-selectors";
import { getTransactions } from "../../redux/transactions/transactions-operations";
import { deleteTransaction } from "../../redux/transactions/transactions-operations";
import { getCurrentUser } from "../../redux/user/user-operations";

import css from "../ModalLogout/ModalLogout.module.css";

export const ModalDelete = ({ id }) => {
  const token = useSelector(selectToken);
  const isModalOpen = useSelector((state) => state.global.isModalOpen);
  const modalType = useSelector((state) => state.global.modalType);
  const dispatch = useDispatch();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleModalOpen());
      dispatch(setModalType(null));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        dispatch(toggleModalOpen());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <>
      {isModalOpen && modalType === "delete" && (
        <div className={css.overlay} onClick={handleBackdropClick}>
          <div className={css.modal__container}>
            <p className={css.text}>
              Are you sure you want to delete this transaction?
            </p>
            <div className={css.button__container}>
              <button
                title="delete"
                className={css.button}
                onClick={async () => {
                  await dispatch(deleteTransaction(id));
                  await dispatch(getTransactions({ token }));
                  dispatch(toggleModalOpen());
                  dispatch(setModalType(null));
                  dispatch(getCurrentUser({ token }));
                }}
              >
                DELETE
              </button>
              <button
                title="cancel"
                className={css.button}
                onClick={() => {
                  dispatch(toggleModalOpen());
                  dispatch(setModalType(null));
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
