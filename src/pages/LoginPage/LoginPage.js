import { LoginForm } from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";
import backgroundImg from "../../images/img/background-img.png";
import ellipsePink from "../../images/img/ellipse-pink.png";
import ellipsePurple from "../../images/img/ellipse-purple.png";

export const LoginPage = () => {
  return (
    <div className={css.loginPage}>
      <div className={css.containerLoginPage}>
        <div className={css.ellipsePinkWrapper}>
          <img className={css.ellipsePink} src={ellipsePink}></img>
        </div>
        <img className={css.ellipsePurple} src={ellipsePurple}></img>
        <div className={css.loginPageWrapper}>
          <div className={css.loginPageBox}>
            <div className={css.loginPageImg}>
              <img className={css.backgroundImg} src={backgroundImg}></img>

              <h1 className={css.title}> Finance App</h1>
            </div>
          </div>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};
