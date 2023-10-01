import css from "./Header.module.css";
import exitIcon from "../../assets/icons/exit-icon.svg";
import logoIcon from "../../assets/icons/logo-loginForm.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectName } from "../../redux/auth/auth-selectors";
import { toggleModalOpen, setModalType } from "../../redux/global/global-slice";
import { selectIsModalOpen } from "../../redux/global/global-selectors";
import { ModalLogout } from "../ModalLogout/ModalLogout";

const Header = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const isModalOpen = useSelector(selectIsModalOpen);

  const handleLogoutClick = () => {
    dispatch(setModalType("logout"));
    dispatch(toggleModalOpen());
  };

  return (
    <>
      <header className={css.header}>
        <div className={css.containerHeader}>
          <a href="/">
            {/* do zmiany na Link przy podłączeniu routera */}
            <img src={logoIcon} className={css.logo} alt="logo"></img>
          </a>
          <div className={css.logout}>
            <span className={css.nameText}>
              <button className={css.button} type="button">
                {name}
              </button>
            </span>
            <div className={`${css.divider} ${css.button}`}></div>

            <button
              type="button"
              className={`${css.exitButton} ${css.button}`}
              onClick={handleLogoutClick}
            >
              <img src={exitIcon} alt="exit-icon"></img>
              <span className={css.exitText}>Exit</span>
            </button>
          </div>
        </div>
      </header>
      {isModalOpen && <ModalLogout />}
    </>
  );
};

export default Header;
