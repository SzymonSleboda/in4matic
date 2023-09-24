import { LoginForm } from "../../components/LoginForm/LoginForm";
import css from "./LoginPage.module.css";
import backgroundImg from "../../assets/images/LoginForm/background-img.png";
import ellipsePink from "../../assets/images/LoginForm/ellipse-pink.png";
import ellipsePurple from "../../assets/images/LoginForm/ellipse-purple.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const user = useSelector(state => state.auth);
  // const navigate = useNavigate();
  useEffect(() => {
    if (user.token) {
      // navigate("/");
    }
  }, [user]);

  return (
    <div className={css.loginPage}>
      <div className={css.containerLoginPage}>
        <div className={css.ellipsePinkWrapper}>
          <img
            className={css.ellipsePink}
            src={ellipsePink}
            alt='pink-ellipse'></img>
        </div>
        <img
          className={css.ellipsePurple}
          src={ellipsePurple}
          alt='purple-ellipse'></img>
        <div className={css.loginPageWrapper}>
          <div className={css.loginPageBox}>
            <div className={css.loginPageImg}>
              <img
                className={css.backgroundImg}
                src={backgroundImg}
                alt='man with phone app'></img>
              <h1 className={css.title}> Finance App</h1>
            </div>
          </div>
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};
