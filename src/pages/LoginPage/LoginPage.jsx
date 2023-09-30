import React from "react";
import Media from "react-media";
import { LoginForm } from "../../components/LoginForm/LoginForm";

import frame from "../../assets/images/LoginForm/background-img.png";

import css from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <div className={css.loginPage}>
      <Media
        query="(min-width: 767px)"
        render={() => (
          <div className={css.loginPageWrapper}>
            <img className={css.backgroundImg} src={frame} alt="" />
            <h1 className={css.title}>Finance App</h1>
          </div>
        )}
      />
      <div className={css.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
};
