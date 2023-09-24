import { useSelector } from "react-redux";
import css from "./Header.module.css";
import exitIcon from "../../assets/icons/exit-icon.svg";
import logoIcon from "../../assets/icons/logo-loginForm.svg";

const Header = () => {
  let user = useSelector(state => state.auth.user);
  const trimmedUserName = user
    ? user.name.length > 10
      ? user.name.slice(0, 10) + "..."
      : user.name
    : "";

  return (
    <header className={css.header}>
      <div className={css.containerHeader}>
        <a href='/'>
          {/* do zmiany na Link przy podłączeniu routera */}
          <img src={logoIcon} className={css.logo} alt='logo'></img>
        </a>
        <div className={css.logout}>
          <span className={css.nameText}>
            <button className={css.button} type='button'>
              {trimmedUserName}
            </button>
          </span>
          <div className={`${css.divider} ${css.button}`}></div>

          <button type='button' className={`${css.exitButton} ${css.button}`}>
            <img src={exitIcon} alt='exit-icon'></img>
            <span className={css.exitText}>Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
