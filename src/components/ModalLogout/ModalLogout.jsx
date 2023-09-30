import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { toggleModalOpen, setModalType } from "../../redux/global/global-slice";
import { logout } from "../../redux/auth/auth-operations";

import css from "./ModalLogout.module.css";

export const ModalLogout = () => {
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
      {isModalOpen && modalType === "logout" && (
        <div className={css.overlay} onClick={handleBackdropClick}>
          <div className={css.modalContainer}>
            <p className={css.text}>Are you sure you want to log out?</p>
            <div className={css.buttonContainer}>
              <button
                title="logout"
                className={css.button}
                onClick={() => {
                  dispatch(logout());
                  dispatch(toggleModalOpen());
                  dispatch(setModalType(null));
                }}
              >
                LOG ME OUT
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
